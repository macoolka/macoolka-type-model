/**
 * @file
 */
import { MField, MInterface, MTypeAlias, MMethod, MModule, MValueable, MVariable } from '../models/Module'
import { formatCode } from './utils'
import { TSBuild, TSOptions } from './types'
import { headerTS, importsTS } from '../constant'
import { isString, isMaybe } from 'macoolka-predicate'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as MN from 'macoolka-app/lib/MonadNodeSync'
import { format } from 'macoolka-prettier'
type BuildOption = TSOptions & { indent: number }
const { formatBlock, formatItem, fold } = formatCode({})

function intersection({ indent }: BuildOption) {
    return (content: Array<string>) => {
        return formatBlock({
            begin: ``,
            end: '',
            indent: indent,
            split: '&',
            content
        })
    }
}
function union(_: number) {
    return (content: Array<string>) => {
        return content.length === 0 ? 'never' : content.join(' | ')

    }
}
/**
 * Get a typesciprt type name with model type
 */
const getTypeName = (option: BuildOption) => (a: MField['type']) => {
    const { indent, isInput } = option
    if (isString(a)) {
        switch (a) {
            case 'int':
                return 'number'
            case 'datetime':
                return isInput ? 'string' : 'Date'
            case 'json':
                return 'Record<string,any>'
            default:
                return a
        }
    }
    let typename: string
    switch (a._kind) {
        case 'kind': {
            typename = `'${a.value}'`
            break
        }
        case 'type':
            typename = a.value
            break
        case 'datetime':
            typename = isInput ? 'string' : 'Date'
            break
        case 'int':
            typename = 'number'
            break
        case 'json':
            typename = 'Record<string,any>'
            break
        case 'typeUnion':
            typename = union(indent)(a.values.map(value => `${value}`))// .join(' | ')
            break
        case 'typeIntersection':
            typename = intersection(option)(a.values.map(value => `${value}`))// .join(' | ')
            break
        case 'enum':
            typename = union(indent)(a.values.map(value => `'${value}'`))// .join(' | ')
            break
        default:
            typename = a._kind
    }
    const { maybe, isArray, isArrayRequired, maybeArray } = a

    const arrayname = isArrayRequired === true
        ? getNotEmptyArrayName(typename)
        : isArray === true
            ? getArrayName(typename)
            : maybeArray === true
                ? getMaybeArrayName(typename)
                : typename

    //  getMaybeArrayName
    return maybe ? arrayname : getNotRequiredName(arrayname)

}
function printTypeReference(option: BuildOption) {
    return ({ required, type }: MValueable) => {
        const { isInput } = option

        required = isInput && ((!isString(type)) && (!isMaybe(type.defaultValue)
            || (type.isArray === true && type.defaultEmptyArray === true))) ? false : required
        const typename = getTypeName(option)(type)
        return {
            required,
            content: typename
        }
    }
}
/**
 * Get typescript's statement with model field
 *
 */
function printField(option: BuildOption & { end?: string }) {
    return (field: MVariable) => {
        const { end = '', indent, showDesc } = option
        const { name, } = field

        const { required, content } = printTypeReference(option)(field)

        const body = printNameBody({ name, required, content, end })
        return formatItem(indent, showDesc)({
            content: body,
            docs: field
        })
    }
}
const printNameBody = ({ required, content, name, end }: { required: boolean, content: string, name: string, end: string }) => {
    const split = (required)
        ? ': '
        : '?: '

    return `${name}${split}${content}${end}`
}
const printNameBodyType = ({ content, name, end }: { required: boolean, content: string, name: string, end: string }) => {

    return `${name} = ${content}${end}`
}

const getArrayName = (name: string) => `Array<${name}>`
const getNotRequiredName = (name: string) => `${name}`
const getNotEmptyArrayName = (name: string) => `NonEmptyArray<${name}>`
export const getMaybeArrayName = (name: string) => `MaybeArray<${name}>`

/**
 * @since 0.2.0
 */
export function printMethod(option: BuildOption) {
    return (input: MMethod) => {
        const { indent, showDesc } = option
        const { type, name, params = [], returnVoid } = input
        const typename = getTypeName(option)(type)

        const _type = returnVoid === true ? `void` : typename
        return formatBlock({
            begin: formatItem(0, showDesc)({
                content: `${name}:(`,
                docs: input
            }),
            end: `) => ${_type}`,
            indent: indent,
            content: params.map(printField({ indent: indent + 1, ...option, end: ',' }))
        })
    }
}
/**
 * get interface implement statement
 * @example
 * const a=['A','B']
 * expect(getImplementsName(a)).toEquals(' extends A,B')
 *
 * @since 0.2.0
 */
const getImplementsName = (as: Array<string>): string => {
    return as.length === 0 ?
        '' :
        `extends ${as.join(', ')} `
}
/**
 * @since 0.2.0
 */
export function printInterface(option: BuildOption) {
    return (param: MInterface) => {
        const { indent, showDesc } = option
        const { fields = [], methods = [], name, implements: impl = [] } = param

        // required is ture when id is ture
        const rfields = fields.map(a => ({
            ...a,
            required: a.id ? a.id : a.required
        }))

        return formatBlock({
            begin: formatItem(indent, showDesc)({
                content: `export interface ${name} ${getImplementsName(impl)}{`,
                docs: param
            }),
            end: '}',
            indent: indent,
            content: rfields.map(printField({ indent: indent + 1, ...option })).concat(
                methods.map(printMethod({ indent: indent + 1, ...option })))
        })
    }
}
/**
 * @since 0.2.0
 */
export function printTypeAlias(option: BuildOption) {
    return (typeAlias: MTypeAlias) => {
        const { indent, showDesc } = option
        const { fields = [], methods = [], name } = typeAlias
        const { required, content } = printTypeReference(option)(typeAlias)
        const fieldContent = fields.map(printField({ indent: indent + 1, ...option }))
        const methodContent = methods.map(printMethod({ indent: indent + 1, ...option }))

        const body = (fields.length > 0 || methodContent.length > 0)
            ? O.some(formatBlock({
                begin: '{',
                end: '}',
                indent: indent,
                content: fieldContent.concat(methodContent)
            }))
            : O.none
        const pcontent = pipe(
            body,
            O.map(a => intersection(option)([a, content])),
            O.getOrElse(() => content)
        )
        // const pcontent = intersection(indent)([body, content])
        return formatItem(indent, showDesc)({
            content: `export type ${printNameBodyType({ name, required, content: pcontent, end: '' })}`,
            docs: typeAlias
        })

    }
}

/**
 * @since 0.2.0
 */
export function printSchema(option: BuildOption) {
    return (input: MModule) => {
        const { indent, showDesc } = option
        const { interfaces, typealiases } = input
        return formatBlock({
            begin: formatItem(indent, showDesc)({
                content: ``,
                docs: input
            }),

            end: '',
            indent: indent,
            content: [

                ...typealiases.map(printTypeAlias(option)),
                ...interfaces.map(printInterface(option))
            ]

        })
    }
}

/**
 * TSBuild instance
 * @since 0.2.0
 */
export const buildTs: TSBuild = (option = {}) => (schema) => {
    const { header = headerTS, imports = importsTS, showDesc } = option

    const indent = 0
    const content = formatBlock({
        begin: formatItem(indent, showDesc)({
            content: fold(imports),
            docs: {
                description: header,
                deprecated: false,
                ignore: false,
                examples: [],
                reason: [],
                path: []

            }
        }),
        end: '',
        indent,
        content: [printSchema({ indent, ...option })(schema)]
    })
    return MN.right(format({parser:'typescript',content}))
}
export default buildTs

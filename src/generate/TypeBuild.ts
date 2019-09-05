/**
 * @file
 */
import { MField, MInterface, MTypeAlias, MMethod, MModule, MValueable, MVariable } from '../models/Module'
import { formatCode } from './utils'
import { TSBuild } from './types'
import { headerTS } from '../constant'
import { importsTS } from '../constant'
import { isString, isMaybe } from 'macoolka-predicate'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable';
const { formatBlock, formatItem, fold } = formatCode({})

function intersection(indent: number) {
    return (content: string[]) => {
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
    return (content: string[]) => {
        return content.length === 0 ? 'never' : content.join(' | ')

    }
}
/**
 * Get a typesciprt type name with model type
 */
const getTypeName = (indent: number, isInput: boolean) => (a: MField['type']) => {
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
    let typename: string;
    switch (a._kind) {
        case "kind": {
            typename = `'${a.value}'`
            break;
        }
        case 'type':
            typename = a.value
            break;
        case 'datetime':
            typename = isInput ? 'string' : 'Date'
            break;
        case 'int':
            typename = 'number'
            break;
        case 'json':
            typename = 'Record<string,any>'
            break;
        case 'typeUnion':
            typename = union(indent)(a.values.map(value => `${value}`))//.join(' | ')
            break;
        case 'typeIntersection':
            typename = intersection(indent)(a.values.map(value => `${value}`))//.join(' | ')
            break;
        case 'enum':
            typename = union(indent)(a.values.map(value => `'${value}'`))//.join(' | ')
            break;
        default:
            typename = a._kind
    }
    const { maybe, isArray, isArrayRequired } = a

    const arrayname = isArrayRequired === true ?
        getNotEmptyArrayName(typename)
        : isArray === true ?
            getArrayName(typename)
            : typename

          //  getMaybeArrayName
    return maybe ? arrayname : getNotRequiredName(arrayname)

}
function printTypeReference(indent: number, isInput: boolean) {
    return ({ required, type, }: MValueable) => {

        required = isInput && ((!isString(type)) && (!isMaybe(type.defaultValue)
            || (type.isArray === true && type.defaultEmptyArray === true))) ? false : required
        const typename = getTypeName(indent, isInput)(type);
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
function printField(indent: number, isInput: boolean, end: string = '') {
    return (field: MVariable) => {
        const { name, } = field

        const { required, content } = printTypeReference(indent, isInput)(field)

        const body = printNameBody({ name, required, content, end });
        return formatItem(indent)({
            content: body,
            docs:field
        })
    }
}
const printNameBody = ({ required, content, name, end }: { required: boolean, content: string, name: string, end: string }) => {
    const split = (required)
        ? ': '
        : '?: '

    return `${name}${split}${content}${end}`;
}
const printNameBodyType = ({ content, name, end }: { required: boolean, content: string, name: string, end: string }) => {

    return `${name} = ${content}${end}`;
}

const getArrayName = (name: string) => `Array<${name}>`
const getNotRequiredName = (name: string) => `${name}`
const getNotEmptyArrayName = (name: string) => `NonEmptyArray<${name}>`
export const getMaybeArrayName = (name: string) => `MaybeArray<${name}>`

/**
 * @since 0.2.0 
 */
export function printMethod(indent: number, isInput: boolean) {
    return (input: MMethod) => {
        const { type, name,  params=[], returnVoid }=input;
        const typename = getTypeName(indent, isInput)(type);
    
        const _type = returnVoid === true ? `void` : typename;
        return formatBlock({
            begin: formatItem(0)({
                content: `${name}:(`,
                docs:input
            }),
            end: `) => ${_type}`,
            indent: indent,
            content: params.map(printField(indent + 1, isInput, ','))
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
const getImplementsName = (as: string[]): string => {
    return as.length === 0 ?
        '' :
        `extends ${as.join(', ')} `
}
/**
 * @since 0.2.0 
 */
export function printInterface(indent: number, isInput: boolean) {
    return (param: MInterface) => {
        const { fields = [], methods = [], name,  implements: impl = [] }=param
    
        //required is ture when id is ture
        const rfields = fields.map(a => ({
            ...a,
            required: a.id ? a.id : a.required
        }))

        return formatBlock({
            begin: formatItem(indent)({
                content: `export interface ${name} ${getImplementsName(impl)}{`,
                docs:param,
            }),
            end: '}',
            indent: indent,
            content: rfields.map(printField(indent + 1, isInput)).concat(methods.map(printMethod(indent + 1, isInput)))
        })
    }
}
/**
 * @since 0.2.0 
 */
export function printTypeAlias(indent: number, isInput: boolean) {
    return (typeAlias: MTypeAlias) => {
        const { fields = [], methods = [], name,  } = typeAlias
        const { required, content } = printTypeReference(indent, isInput)(typeAlias)
        const fieldContent = fields.map(printField(indent + 1, isInput));
        const methodContent = methods.map(printMethod(indent + 1, isInput))


        const body = (fields.length > 0 || methodContent.length > 0)
            ? O.some(formatBlock({
                begin: '{',
                end: '}',
                indent: indent,
                content: fieldContent.concat(methodContent)
            }))
            : O.none;
        const pcontent = pipe(
            body,
            O.map(a => intersection(indent)([a, content])),
            O.getOrElse(() => content)
        )
        // const pcontent = intersection(indent)([body, content])
        return formatItem(indent)({
            content: `export type ${printNameBodyType({ name, required, content: pcontent, end: '' })}`,
            docs:typeAlias
        })

    }
}

/**
 * @since 0.2.0 
 */
export function printSchema(indent: number, isInput: boolean) {
    return (input: MModule) => {
      const  {  interfaces, typealiases }=input;
        return formatBlock({
            begin: formatItem(indent)({
                content: ``,
                docs:input
            }),

            end: '',
            indent: indent,
            content: [

                ...typealiases.map(printTypeAlias(indent, isInput)),
                ...interfaces.map(printInterface(indent, isInput)),
            ]

        })
    }
}


/**
 * TSBuild instance
 * @since 0.2.0 
 */
export const buildTs: TSBuild = (option = {}) => (schema) => {
    const { header = headerTS, imports = importsTS, isInput = false } = option



    const indent = 0
    return formatBlock({
        begin: formatItem(indent)({
            content: fold(imports),
            docs: {
                description:header,
                deprecated:false,
                ignore:false,
                examples:[],
                reason:[],
                path:[]

            }
        }),
        end: '',
        indent,
        content: [printSchema(indent, isInput)(schema)]
    })
}
export default buildTs
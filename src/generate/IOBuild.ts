/**
 * @file
 */
import {
    MField, MModule, MInterface, MTypeAlias,
    MStringScalar, MNumberScalar, MIntScalar, MValueable
} from '../models/Module'
import { pipe } from 'fp-ts/lib/pipeable'
import * as  array from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { formatCode } from './utils'
import { TSBuild } from './types'
import { headerTS, importsIO } from '../constant'
import { Maybe } from 'macoolka-typescript'
import { isString, isMaybe } from 'macoolka-predicate'
import { topologicalSort } from '../graph'
const { formatBlock, formatItem, fold } = formatCode({})

/**
 * String scalar  map to io name
 */
const stringRulesToTypeName = {
    maxLength: (a?: Maybe<number>) => pipe(
        O.fromNullable(a),
        O.map(a => `t.stringMaxLength(${a})`)
    ),
    minLength: (a?: Maybe<number>) => pipe(
        O.fromNullable(a),
        O.map(a => `t.stringMinLength(${a})`)
    ),
    match: (a?: Maybe<string>) => pipe(
        O.fromNullable(a),
        O.map(a => `t.stringMatch(${new RegExp(a)})`)
    ),
}
/**
 * number scalar  map to io name
 */
const numberRules = {
    maximum: (a?: Maybe<number>) => pipe(
        O.fromNullable(a),
        O.map(a => `t.numberMaxValue(${a})`)
    ),
    minimum: (a?: Maybe<number>) => pipe(
        O.fromNullable(a),
        O.map(a => `t.numberMinValue(${a})`)
    ),

}
/**
 * Scalar to io name
 */
const rule = {
    number: (numberScale: MNumberScalar) => {
        return pipe(
            [
                numberRules.maximum(numberScale.maximum),
                numberRules.minimum(numberScale.minimum)
            ],
            array.compact,
            concat('intersection', 't.string')
        )
    },
    int: (intScale: MIntScalar) => {
        return pipe(
            [
                numberRules.maximum(intScale.maximum),
                numberRules.minimum(intScale.minimum)
            ],
            array.compact,
            concat('intersection', 't.int')
        )
    },
    string: (stringScale: MStringScalar) => {
        return pipe(
            [
                stringRulesToTypeName.maxLength(stringScale.maxLength),
                stringRulesToTypeName.minLength(stringScale.minLength),
                stringRulesToTypeName.match(stringScale.pattern)
            ],
            array.compact,
            concat('intersection', 't.string')
        )

    }
}
/**
 * Connect type with union or intersection
 * @param mode 
 * @param empty 
 */
const concat = (mode: 'union' | 'intersection', empty: string) => (as: string[]) => {
    if (as.length === 0)
        return empty;
    else if (as.length === 1) {
        return as[0]
    } else {
        return `t.${mode}([${as.join(',')}])`
    }
}
/**
 * Convert string[] to enum format
 * @param values 
 */
const getEnumValues = (values: string[]) => {
    const keys = values.reduce((b, a) => ({
        ...b, [a]: ''
    }), {} as any)
    return values.length === 0
        ? `t.never`
        : values.length === 1
            ? `t.literal('${values[0]}')`
            : `t.keyof(${JSON.stringify(keys)})`
    //  : `t.union([${values.map(value => `t.literal('${value}')`).join(' , ')}])`

}
function intersection(indent: number, name?: string) {
    return (content: string[]) => {
        return content.length > 1
            ? formatBlock({
                begin: `t.intersection([`,
                end: name ? `],'${name}')` : '])',
                indent: indent,
                split: ',',
                content
            })
            : content.length === 1
                ? content[0]
                : 'never'
    }
}
function union(indent: number, name?: string) {
    return (content: string[]) => {
        return formatBlock({
            begin: `t.union([`,
            end: name ? `],'${name}')` : '])',
            indent: indent,
            content,
            split: ','
        })
    }
}
/**
 * Get io type name with field
 * @param a 
 */
const getTypeName = (a: MField['type']) => {

    if (isString(a)) {
        switch (a) {
            case 'int':
                return 't.int'
            case 'datetime':
                return 't.dateFromISOString'
            case 'json':
                return 't.record(t.string,t.any)'
            default:
                return `t.${a}`
        }
    }
    let typename: string;

    switch (a._kind) {
        case "kind": {
            typename = `t.literal('${a.value}')`
            break;
        }
        case 'json':
            typename = 't.record(t.string,t.any)'
            break;
        case 'type':
            typename = a.value
            break;
        case 'datetime':
            typename = 't.dateFromISOString'
            break;
        case 'int':
            typename = 't.int'
            break;
        case 'typeUnion':
            const types = a.values.map(value => `${value}`)
            typename = union(0)(types)//`t.union([${types}])`
            break;
        case 'typeIntersection':
            //const types = a.values.map(value => `${value}`)
            typename = intersection(0)(a.values.map(value => `${value}`))//`t.union([${types}])`
            break;
        case 'enum':
            typename = getEnumValues(a.values)
            break;
        case 'string':
            typename = rule.string(a)
            break;
        case 'int':
            typename = rule.int(a)
            break;
        case 'number':
            typename = rule.number(a)
            break;
        default:
            typename = `t.${a._kind}`
    }
    const { isArray: _isArray, isArrayRequired, defaultEmptyArray } = a

    const isArray = _isArray || isArrayRequired

    const _type = isArray ? `t.array(${typename})` : typename;
    const body = pipe(
        (!isString(a)) && !isMaybe(a.defaultValue) ? O.some(a.defaultValue) : O.none,
        O.map(value => (defaultEmptyArray == true && (isArray === true)) ? O.some([value]) : O.some(value)),
        O.getOrElse<O.Option<any>>(() => (defaultEmptyArray == true && (isArray === true)) ? O.some([]) : O.none),
        O.map(value => JSON.stringify(value)),
        O.map(value => `t.withDefault(${_type},${value})`),
        O.getOrElse(() => _type)
    )
    return body;


}

/**
 * TSBuild instance with IO
 * @since 0.2.0
 */
export const buildTs: TSBuild = (option = {}) => (schema) => {
    const { header = headerTS, imports = importsIO, showDesc = true } = option;
    const _list = topologicalSort(schema)
    if (E.isLeft(_list)) {
        throw new Error(_list.left.join('\n'))
    }
    const list = _list.right
    function printTypeReference(i: number) {
        return ({ type }: MValueable) => {
            return getTypeName(type);
        }
    }
    /**
     * Get field Statement
     * @param i 
     */
    function printField(i: number) {
        return (field: MField) => {
            const { name } = field;
            const content = `${name}:${printTypeReference(i)(field)},`
            return formatItem(i, showDesc)({
                content,
                docs: field,
            })
        }
    }
    /**
     * Get t.type or t.partial Statement
     * @param indent 
     */
    const printType = (indent: number, typename?: string) => (input: MInterface) => {
        const { fields, name } = input
        return formatBlock({
            begin: formatItem(0, showDesc)({
                content: `t.${name}({`,
                docs: input,
            }),
            end: typename ? `},'${typename}')` : '})',
            indent: indent,
            content: fields.map(printField(indent + 1))
        })
    }

    /**
  * Get t.intersection(t.type,t.partial) Statement
  * @param indent 
  */
    function printFields(indent: number) {
        return (fields: MField[]) => {
            return pipe(
                fields,
                array.partition(a => a.required === true || a.id === true),
                ({ left, right }) => {
                    if (left.length > 0 && right.length > 0) {
                        const partial = printType(indent + 1)({
                            name: 'partial', fields: left, methods: [], implements: [], isExported: false,
                            description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface',
                        })
                        const type = printType(indent + 1)({
                            name: 'type', fields: right, methods: [], implements: [], isExported: false,
                            description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface',
                        })

                        return intersection(0)([type, partial])
                    } else if (left.length > 0) {
                        const partial = printType(indent)({
                            name: 'partial', fields: left, methods: [], implements: [], isExported: false,
                            description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface',
                        })
                        return `${partial} `
                    } else if (right.length > 0) {
                        const type = printType(indent)({
                            _kind: 'interface',
                            name: 'type', fields: right,
                            methods: [], implements: [],
                            isExported: false, description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: []
                        })
                        return `${type} `
                    } else {
                        const type = printType(indent)({
                            name: 'type', fields: right, methods: [], implements: [], isExported: false,
                            description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface',
                        })
                        return `${type} `
                    }
                }
            )
        }
    }

    function printTypeAlias(indent: number) {
        return (typealias: MTypeAlias) => {
            const { fields = [], name } = typealias

            const body = printTypeReference(indent)(typealias);
            const content = fields.length === 0
                ? body
                : intersection(0, name)([body, printFields(indent)(fields)])
            return formatItem(0, showDesc)({
                content: `export const ${name} = ${content}`,
                docs: typealias
            })
        }
    }

    /**
     * Get t.intersection(t.type,t.partial) Statement
     * @param indent 
     */
    function printInterface(indent: number) {
        return (input: MInterface) => {
            const { fields = [], name, implements: impl = [] } = input
            const fieldsContent = printFields(indent)(fields);
            return formatItem(0, showDesc)({
                content: `export const ${name} =${intersection(0, name)([...impl, fieldsContent])}`,
                docs: input
            })
        }
    }

    const printModule = (indent: number) => ({ interfaces, typealiases }: MModule) => {
        const content = list.map(a => {
            return a._kind === 'interface'
                ? printInterface(indent)(a)
                : printTypeAlias(indent)(a)
        })
        return formatBlock({
            begin: '',
            end: '',
            indent,
            content
        })
    }
    const indent = 0
    return formatBlock({
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
        content: [printModule(indent)(schema)]
    })
}
export default buildTs
/**
 * @file
 */
import {
    MField, MModule, MInterface, MTypeAlias,
    MStringScalar, MNumberScalar, MIntScalar, MValueable
} from '../models/Module'
import { pipe } from 'fp-ts/lib/pipeable'
import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { formatCode } from './utils'
import { TSBuild } from './types'
import { headerTS, importsIO } from '../constant'
import { Maybe } from 'macoolka-typescript'
import { isString, isMaybe, notMaybe } from 'macoolka-predicate'
import * as Ord from 'fp-ts/lib/Ord'
import { typeNotFound, foldI18N } from '../i18n'
import { fold as _fold } from 'fp-ts/lib/Monoid'
import * as MF from 'macoolka-app/lib/MonadFunctionSync'
import * as MN from 'macoolka-app/lib/MonadNodeSync'
import _topologicalSort from 'macoolka-algorithms/lib/topologicalSort'
import { buildGraph } from '../graph'
import { format } from 'macoolka-prettier'
export type IOType = MInterface | MTypeAlias
/**
 * topological sort IOType in MModule
 * @desczh
 * IOType 拓扑排序
 * @since 0.2.0
 */
export const topologicalSort = (ignoreNames: Array<string>): MF.MonadFunctionSync<MModule, Array<IOType>> => (a) => {

    let orders: Array<IOType> = []

    orders = orders.concat(a.interfaces)
    orders = orders.concat(a.typealiases)

    const ordMoudle = (names: Array<string>): Ord.Ord<IOType> => ({
        equals: (a, b) => a.name === b.name,
        compare: (a, b) => {
            const aIndex = pipe(
                names,
                A.findIndex(name => name === a.name),
                O.getOrElse(() => -1)
            )
            const bIndex = pipe(
                names,
                A.findIndex(name => name === b.name),
                O.getOrElse(() => -1)
            )
            return Ord.ordNumber.compare(bIndex, aIndex)
        }
    })
    const valid: MF.MonadFunctionSync<Array<string>, Array<string>> = (names) => pipe(
        orders,
        A.map(b => {
            return pipe(
                names,
                A.findIndex(name => name === b.name),
                E.fromOption(() => typeNotFound({ model: a.name, name: b.name }))
            )
        }),
        A.lefts,
        a => a.length > 0 ? E.left(foldI18N(a)) : E.right(names)

    )
    return pipe(
        a,
        buildGraph(ignoreNames),
        MN.map(_topologicalSort),
        MN.chain(a =>
            pipe(
                a.map(value => value.value),
                valid,
                MN.map(names => pipe(
                    names,
                    ordMoudle,
                    A.sort,
                    b => b(orders)
                ))

            )
        )
    )
}
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
    )
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
    )

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
            A.compact,
            concat('intersection', 't.string')
        )
    },
    int: (intScale: MIntScalar) => {
        return pipe(
            [
                numberRules.maximum(intScale.maximum),
                numberRules.minimum(intScale.minimum)
            ],
            A.compact,
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
            A.compact,
            concat('intersection', 't.string')
        )

    }
}
/**
 * Connect type with union or intersection
 * @param mode
 * @param empty
 */
const concat = (mode: 'union' | 'intersection', empty: string) => (as: Array<string>) => {
    if (as.length === 0) {
        return empty
    } else if (as.length === 1) {
        return as[0]
    } else {
        return `t.${mode}([${as.join(',')}])`
    }
}
/**
 * Convert string[] to enum format
 * @param values
 */
const getEnumValues = (values: Array<string>) => {
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
    return (content: Array<string>) => {
        return content.length > 1
            ? formatBlock({
                begin: `t.intersection([`,
                end: notMaybe(name) ? `],'${name}')` : '])',
                indent,
                split: ',',
                content
            })
            : content.length === 1
                ? content[0]
                : 'never'
    }
}
function union(indent: number, name?: string) {
    return (content: Array<string>) => {
        return formatBlock({
            begin: `t.union([`,
            end: notMaybe(name) ? `],'${name}')` : '])',
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
    let typename: string

    switch (a._kind) {
        case 'kind': {
            typename = `t.literal('${a.value}')`
            break
        }
        case 'json':
            typename = 't.record(t.string,t.any)'
            break
        case 'type':
            typename = a.value
            break
        case 'datetime':
            typename = 't.dateFromISOString'
            break
        case 'int':
            typename = 't.int'
            break
        case 'typeUnion':
            const types = a.values.map(value => `${value}`)
            typename = union(0)(types)// `t.union([${types}])`
            break
        case 'typeIntersection':
            // const types = a.values.map(value => `${value}`)
            typename = intersection(0)(a.values.map(value => `${value}`))// `t.union([${types}])`
            break
        case 'enum':
            typename = getEnumValues(a.values)
            break
        case 'string':
            typename = rule.string(a)
            break
        case 'int':
            typename = rule.int(a)
            break
        case 'number':
            typename = rule.number(a)
            break
        default:
            typename = `t.${a._kind}`
    }
    const { isArray: _isArray, isArrayRequired, defaultEmptyArray } = a

    const isArray = _isArray || isArrayRequired

    const _type = isArray ? `t.array(${typename})` : typename
    const body = pipe(
        (!isString(a)) && !isMaybe(a.defaultValue) ? O.some(a.defaultValue) : O.none,
        O.map(value => (defaultEmptyArray === true && (isArray === true)) ? O.some([value]) : O.some(value)),
        O.getOrElse<O.Option<any>>(() => (defaultEmptyArray === true && (isArray === true)) ? O.some([]) : O.none),
        O.map(value => JSON.stringify(value)),
        O.map(value => `t.withDefault(${_type},${value})`),
        O.getOrElse(() => _type)
    )
    return body

}

/**
 * TSBuild instance with IO
 * @since 0.2.0
 */
export const buildTs: TSBuild = (option = {}) => (schema) => {
    const { header = headerTS, imports = importsIO, showDesc = true, ignoreTypeNames = [] } = option

    function printTypeReference(i: number) {
        return ({ type }: MValueable) => {
            return getTypeName(type)
        }
    }
    /**
     * Get field Statement
     * @param i
     */
    function printField(i: number) {
        return (field: MField) => {
            const { name } = field
            const content = `${name}:${printTypeReference(i)(field)},`
            return formatItem(i, showDesc)({
                content,
                docs: field
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
                docs: input
            }),
            end: notMaybe(typename) ? `},'${typename}')` : '})',
            indent: indent,
            content: fields.map(printField(indent + 1))
        })
    }

    /**
     * Get t.intersection(t.type,t.partial) Statement
     * @param indent
     */
    function printFields(indent: number) {
        return (fields: Array<MField>) => {
            return pipe(
                fields,
                A.partition(a => a.required === true || a.id === true),
                ({ left, right }) => {
                    if (left.length > 0 && right.length > 0) {
                        const partial = printType(indent + 1)({
                            name: 'partial', fields: left, methods: [], implements: [], isExported: false,
                            description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface'
                        })
                        const type = printType(indent + 1)({
                            name: 'type', fields: right, methods: [], implements: [], isExported: false,
                            description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface'
                        })

                        return intersection(0)([type, partial])
                    } else if (left.length > 0) {
                        const partial = printType(indent)({
                            name: 'partial', fields: left, methods: [], implements: [], isExported: false,
                            description: [], deprecated: false,
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface'
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
                            ignore: false, examples: [], reason: [], path: [], _kind: 'interface'
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

            const body = printTypeReference(indent)(typealias)
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
            const fieldsContent = printFields(indent)(fields)
            return formatItem(0, showDesc)({
                content: `export const ${name} =${intersection(0, name)([...impl, fieldsContent])}`,
                docs: input
            })
        }
    }

    const printModule = (indent: number) => (list: Array<IOType>) => {
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
    const _list = topologicalSort(ignoreTypeNames)(schema)
    return pipe(
        _list,
        MN.map(a => {
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
                content: [printModule(indent)(a)]
            })
        }),
        MN.map(content => format({ parser:'typescript',content }))
    )

}
export default buildTs

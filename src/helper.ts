/**
 * Type Model helper
 * @desczh
 * Type Model帮助函数
 * @file
 */
import { pipe } from 'fp-ts/lib/pipeable'
import { array } from 'macoolka-collection'
import { BasicCompareType } from 'macoolka-compare'
import { MModule, MField,MInterface,  MMethod, MParam,MTypeAlias } from './models/Module'
import { isString } from 'macoolka-predicate'
import * as O from 'fp-ts/lib/Option'
/**
 * Foreach on MModule
 * @desczh
 * 遍历MModule
 * @since 0.2.0
 */
export const foreach = (schema: MModule, option: {
    schema?: (schema: MModule) => void,
    model?: (model: MInterface, schema: MModule) => void,
    field?: (field: MField, model: MInterface, schema: MModule) => void,
    type?: (type: MField['type'], field: MField, model: MInterface, schema: MModule) => void,
    typealiases?: (e: MTypeAlias, schema: MModule) => void,
    method?: (method: MMethod, model: MInterface, schema: MModule) => void,
    param?: (param: MParam, method: MMethod, model: MInterface, schema: MModule) => void,
    implement?: (name: string, model: MInterface, schema: MModule) => void,
}) => {

    pipe(
        option.schema,
        O.fromNullable,
        O.map(f => f(schema))
    )

    pipe(
        schema.interfaces,
        array.map(model => {
            pipe(
                option.model,
                O.fromNullable,
                O.map(f => f(model, schema))
            )
            pipe(
                model.fields,
                array.map(field => {
                    pipe(
                        option.field,
                        O.fromNullable,
                        O.map(f => f(field, model, schema))
                    )
                    pipe(
                        option.type,
                        O.fromNullable,
                        O.map(f => f(field.type, field, model, schema))
                    )
                })
            )
            pipe(
                model.implements,
                O.fromNullable,
                O.map(names =>
                    pipe(
                        names,
                        array.map(name => {
                            pipe(
                                option.implement,
                                O.fromNullable,
                                O.map(f => f(name, model, schema))
                            )

                        })
                    )

                )

            )
            pipe(
                model.methods,
                O.fromNullable,
                O.map(methods => {
                    pipe(
                        methods,
                        array.map(method => {
                            pipe(
                                option.method,
                                O.fromNullable,
                                O.map(f => f(method, model, schema))
                            )

                            pipe(
                                method.params,
                                O.fromNullable,
                                O.map(params =>
                                    pipe(
                                        params,
                                        array.map(param => {
                                            pipe(
                                                option.param,
                                                O.fromNullable,
                                                O.map(f => f(param, method, model, schema))
                                            )
                                        })
                                    )

                                )
                            )
                        })
                    )
                })

            )
        })
    )

    pipe(
        schema.typealiases,
        O.fromNullable,
        O.map(types => {
            pipe(
                types,
                array.map(a => {
                    pipe(
                        option.typealiases,
                        O.fromNullable,
                        O.map(f => f(a, schema))
                    )
                })
            )

        })

    )



}
export type ScalarType = 'string' | 'number' | 'boolean' | 'enum' |
 'int' | 'datetime' | 'kind' | 'type' | 'typeUnion' | 'json'|'typeIntersection'
const getScalarType = (type: MField['type']): ScalarType => {
    return isString(type) ? type : type._kind
}

/**
 * Map table about Modle Type and Compare Type
 * @since 0.2.0
 */
const TypeMap: Record<ScalarType, BasicCompareType|'unknow'> = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    enum: 'enum',
    int: 'number',
    datetime: 'date',
    kind: 'unknow',
    type: 'boolean',
    typeUnion: 'unknow',
    typeIntersection:'unknow',
    json: 'unknow'
}
export const getCompareModelDefinition = (a: MInterface) => {
    const definition: Record<BasicCompareType, string[]> = {
        string: [],
        number: [],
        enum: [],
        date: [],
        boolean: []
    }
    pipe(
        a.fields,
        array.map(a => {
            const scalarType = TypeMap[getScalarType(a.type)];
            if(scalarType!=='unknow')
            definition[scalarType].push(a.name)
        })
    )
    return definition;
}
export const getFieldWithID = (a: MInterface) => {
    return pipe(
        a.fields,
        array.findFirst(field => field.id === true),
    )
}
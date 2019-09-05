/**
 * Runtime type system for IO decoding/encoding
 * @desczh
 * 运行时解码/编码系统
 * @file
 */
import { MModule as InputModule } from './models/io'
import * as t from 'macoolka-io'
import { validateFieldName, validateModelName, validateId } from './generate/validation'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { foreach } from './helper'
export * from 'macoolka-io'
import { MModule as IModule } from './models/Module'
export * from './models/io'
import { I18NOption, MonidI18N } from 'macoolka-i18n'
import { defaultOption, foldI18N } from './i18n'
import { merge } from 'macoolka-object'
import * as E from 'fp-ts/lib/Either'
import * as MN from 'macoolka-app/lib/MonadNodeSync'

/**
 * Module IO
 * @since 0.2.0
 *
 */
export const Module = (ignoreNames: Array<string>) => new t.Type<IModule, IModule, unknown>(
    'Module',
    (a): a is IModule => InputModule.is(a),
    (b: any, c) => pipe(
        InputModule.validate(b, c),
        E.chain((u: any) => {
            const result: Array<MN.MonadNodeSync<any>> = []

            foreach(u, {
                model: (model) => {
                    if (u.idUnique === true) {
                        result.push(validateId(model))
                    }
                    result.push(validateFieldName(model))
                },
                schema: (schema) => {

                    result.push(validateModelName(ignoreNames)(schema))

                }
            })

            return pipe(
                result,
                A.lefts,

                as => as.length === 0
                    ? t.success(u)
                    : t.failMessage(foldI18N(as), c)
            )
        })
    )
    ,
    a => a
)
/**
 * Module IO
 * @since 0.2.0
 *
 */
export const NoValidNameModule = new t.Type<IModule, IModule, unknown>(
    'Module',
    (a): a is IModule => InputModule.is(a),
    (b: any, c) => pipe(
        InputModule.validate(b, c),
        E.chain((u: any) => {
            const result: Array<MN.MonadNodeSync<any>> = []

            foreach(u, {
                model: (model) => {
                    if (u.idUnique === true) {
                        result.push(validateId(model))
                    }
                    result.push(validateFieldName(model))
                }

            })

            return pipe(
                result,
                A.lefts,

                as => as.length === 0
                    ? t.success(u)
                    : t.failMessage(foldI18N(as), c)
            )
        })
    )
    ,
    a => a
)
const show = (errors: t.Errors) => (o?: I18NOption) => {
    return t.show(errors)({ i18n: merge(defaultOption, o) })
}
/**
 * Convart Validation to MonadNodeSync
 * @since 0.2.0
 */
export const mapI18N = <A>(value: t.Validation<A>): MN.MonadNodeSync<A> => {
    return pipe(
        value,
        E.mapLeft(a => {
            const m: MonidI18N = (o) => {
                return show(a)(o.i18n)
            }
            return m
        })
    )
}

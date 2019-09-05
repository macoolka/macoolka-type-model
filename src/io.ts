import { MModule as InputModule } from './models/io'
import * as t from 'macoolka-io'
import { validateFieldName, validateModelName, ValidationResult, validateId } from './generate/validation'
import { array } from 'macoolka-collection'
import { pipe } from 'fp-ts/lib/pipeable'
import { foreach } from './helper'
export * from 'macoolka-io'
import { MModule as IModule } from './models/Module'
export * from './models/io'
import { I18NOption } from 'macoolka-i18n'
import { defaultOption } from './i18n'
import { merge } from 'macoolka-functions'
import * as E from 'fp-ts/lib/Either'

export const Module = new t.Type<IModule, IModule, unknown>(
    'Module',
    (a): a is IModule => InputModule.is(a),
    (b: any, c) => pipe(
        InputModule.validate(b, c),
        E.chain((u: any) => {
            const result: ValidationResult<any>[] = []

            foreach(u, {
                model: (model) => {
                    if (u.idUnique === true) {
                        result.push(validateId(model))
                    }
                    result.push(validateFieldName(model))
                },
                schema: (schema) => {
                    if (1 != 1)
                        result.push(validateModelName(schema))
                }
            })

            return pipe(
                result,
                array.lefts,
                array.flatten,
                as => as.length === 0
                    ? t.success(u)
                    : t.failMessage(as, c)
            )
        })
    )
    ,
    a => a
)

export const show = (errors: t.Errors) => (o?: I18NOption) => {
    return t.show(errors)({i18n:merge(defaultOption, o)})
}

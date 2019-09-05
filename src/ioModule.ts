import { MModule as InputModule } from './models/io'
import { Type, TypeOf, success, failure } from 'macoolka-io'
import { validateFieldName, validateModelName, ValidationResult, validateId } from './generate/validation'
import { array } from 'macoolka-collection'
import { pipe } from 'fp-ts/lib/pipeable'
import { foreach } from './helper'
export * from './models/io'
type IModule = TypeOf<typeof InputModule>
export const Module = new Type<IModule, IModule, IModule>(
    'Module',
    InputModule.is,
    (u: any, c) => {
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
                ? success(u)
                : failure(as, c)
        )
    },
    a => a
)

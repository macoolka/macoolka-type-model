import { pipe } from 'fp-ts/lib/pipeable'
import { array } from 'macoolka-collection'
import { MInterface, MModule } from '../models/Module'
import * as E from 'fp-ts/lib/Either'
import { showString } from 'fp-ts/lib/Show'
import { Message } from '../i18n'
import { buildGraph } from '../graph'
import { of, Validate,Parser } from 'macoolka-fp/lib/Parser'
const parseInterface = of<MInterface, Message>()
/**
 * @since 1.0.0
 */
export type Validation<A> = Validate<A, Message>
export type ValidationResult<A>=Parser<A,Message>

/**
 * @since 1.0.0
 */

export const validateId: Validate<MInterface, Message> = (a) => {
    const idNames = pipe(
        a.fields,
        array.filter(a => a.id === true),
        array.map(a => a.name)
    )
    return idNames.length === 0
        ? parseInterface.ko({
            id: 'macoolka.data-model.idNotFound',
            value: { model: a.name, name: '' }
        })
        : idNames.length > 1
            ? parseInterface.ko({
                id: 'macoolka.data-model.idRepeat',
                value: { model: a.name, name: idNames.join(',') }
            })
            : parseInterface.ok(a)

}
export const validateFieldName: Validate<MInterface, Message> = (a) => {
    const fieldNames = pipe(
        a.fields,
        array.groupBy({
            getValue: a => a.name,
            show: showString
        }),
        Object.entries,
        array.filter(([_, values]) => values.length > 1),
        array.map(([key]) => key)
    )
    return fieldNames.length > 0
        ? parseInterface.ko(
            {
                id: 'macoolka.data-model.fieldNameRepeat',
                value: { model: a.name, name: fieldNames.map(showString.show).join(',') }
            })
        : parseInterface.ok(a)

}
export const validateModelName: Validate<MModule, Message> = (a) => {
    return pipe(
        a,
        buildGraph,
        E.map(() => {
            return a
        })
    )


}
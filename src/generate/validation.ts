/**
 * Validate Module
 * @desczh
 * 校验Module
 * @file
 */
import { pipe } from 'fp-ts/lib/pipeable'
import { array as A } from 'macoolka-collection'
import { MInterface, MModule } from '../models/Module'
import { showString } from 'fp-ts/lib/Show'
import { idNotFound, idRepeat, fieldNameRepeat } from '../i18n'
import { buildGraph } from '../graph'

import * as MF from 'macoolka-app/lib/MonadFunctionSync'
import * as MN from 'macoolka-app/lib/MonadNodeSync'

/**
 * Validate field id in interface
 * @desczh
 * 校验interface中id的规则
 * @since 0.2.0
 */

export const validateId: MF.MonadFunctionSync<MInterface, MInterface> = (a) => {
    const idNames = pipe(
        a.fields,
        A.filter(a => a.id === true),
        A.map(a => a.name)
    )

    return idNames.length === 0
        ? MN.left(idNotFound({ model: a.name, name: '' }))
        : idNames.length > 1
            ? MN.left(idRepeat({ model: a.name, name: idNames.join(',') }))
            : MN.right(a)

}
/**
 * Validate field id in interface
 * @desczh
 * 校验interface中字段名称的规则
 * @since 0.2.0
 */
export const validateFieldName: MF.MonadFunctionSync<MInterface, MInterface> = (a) => {
    const fieldNames = pipe(
        a.fields,
        A.groupBy({
            getValue: a => a.name,
            show: showString
        }),
        Object.entries,
        A.filter(([_, values]) => values.length > 1),
        A.map(([key]) => key)
    )
    return fieldNames.length > 0
        ? MN.left(fieldNameRepeat({ model: a.name, name: fieldNames.map(showString.show).join(',') }))
        : MN.right(a)

}
/**
 * Validate name rule in module
 * @desczh
 * 校验Module中名称的规则
 * @since 0.2.0
 */
export const validateModelName = (ignoreNames: Array<string>): MF.MonadFunctionSync<MModule, MModule> => (a) => {
    return pipe(
        a,
        buildGraph(ignoreNames),
        MN.map(_ => {
            return a
        })
    )
}

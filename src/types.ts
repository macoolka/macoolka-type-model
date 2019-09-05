/**
 * Monoid Ord
 * @file
 */
import { Monoid, fold } from 'fp-ts/lib/Monoid'
import { Ord, contramap, ordString } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { MModule, MField, MInterface, MClass, MTypeAlias, MFunction, MConstant, MExport, MMethod, MParam } from './models/Module'

import * as Module from './models/Module'
import * as InputModule from './models/InputModule'
export {
    Module,
    InputModule
}
/**
 * @since 0.2.0
 */
export const MMoudleMonoid: Monoid<MModule> = {
    concat: (x, y) => ({
        ...y,
        interfaces: [
            ...x.interfaces ? x.interfaces : [],
            ...y.interfaces ? y.interfaces : []
        ],
        typealiases: [
            ...x.typealiases ? x.typealiases : [],
            ...y.typealiases ? y.typealiases : []
        ],
        classes: [
            ...x.classes ? x.classes : [],
            ...y.classes ? y.classes : []
        ],
        functions: [
            ...x.functions ? x.functions : [],
            ...y.functions ? y.functions : []
        ],
        constants: [
            ...x.constants ? x.constants : [],
            ...y.constants ? y.constants : []
        ],
        exports: [
            ...x.exports ? x.exports : [],
            ...y.exports ? y.exports : []
        ],
    }),
    empty: {
        _kind:'module',
        name: 'macoolka',
        examples: [],
        deprecated: false,
        ignore: false,
        reason: [],
        description: [],
        file: false,
        path: [],
        interfaces: [],
        classes: [],
        typealiases: [],
        functions: [],
        constants: [],
        exports: [],
        idUnique: false,
    }
}
/**
 * @since 0.2.0
 */
export const foldSchema = fold(MMoudleMonoid)


const ordByName = <A extends { name: string }>(): Ord<A> => pipe(
    ordString,
    contramap((value: A) => (value.name))
)
/**
 * @since 0.2.0
 */
export const ordModule = ordByName<MModule>();
/**
 * @since 0.2.0
 */
export const ordField = ordByName<MField>();
/**
 * @since 0.2.0
 */
export const ordInterface = ordByName<MInterface>();
/**
 * @since 0.2.0
 */
export const ordClass = ordByName<MClass>();
/**
 * @since 0.2.0
 */
export const ordFunction = ordByName<MFunction>();
/**
 * @since 0.2.0
 */
export const ordConstant = ordByName<MConstant>();
/**
 * @since 0.2.0
 */
export const ordExport = ordByName<MExport>();
/**
 * @since 0.2.0
 */
export const ordTypeAlias = ordByName<MTypeAlias>();
/**
 * @since 0.2.0
 */
export const ordMethod = ordByName<MMethod>();
/**
 * @since 0.2.0
 */
export const ordParam = ordByName<MParam>();

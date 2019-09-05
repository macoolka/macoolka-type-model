/**
 * Predicate
 * @desczh
 * 断言
 * @file
 */
import {
    MField, MTypeScalar, MTypeUnionScalar
    , MKindScalar, MEnumScalar, MDateTimeScalar, MIntScalar, MNumberScalar, MStringScalar, MBooleanScalar, MJsonScalar
} from './models/Module'
import { isString } from 'macoolka-predicate'
/**
 * @since 0.2.0
 */
export const isTypeScalar = (a: MField['type']): a is MTypeScalar => (!isString(a) && a._kind === 'type') 
/**
 * @since 0.2.0
 */
export const isTypeUnionScalar = (a: MField['type']): a is MTypeUnionScalar => !isString(a) && a._kind === 'typeUnion'
/**
 * @since 0.2.0
 */
export const isBooleanScalar = (a: MField['type']): a is MBooleanScalar => (!isString(a) && a._kind === 'boolean')||a==='boolean'
/**
 * @since 0.2.0
 */
export const isStringScalar = (a: MField['type']): a is MStringScalar => (!isString(a) && a._kind === 'string') || a==='string'
/**
 * @since 0.2.0
 */

export const isNumberScalar = (a: MField['type']): a is MNumberScalar => (!isString(a) && a._kind === 'number') || a==='number'
/**
 * @since 0.2.0
 */
export const isIntegerScalar = (a: MField['type']): a is MIntScalar => (!isString(a) && a._kind === 'int')|| a==='int'
/**
 * @since 0.2.0
 */
export const isDateScalar = (a: MField['type']): a is MDateTimeScalar => (!isString(a) && a._kind === 'datetime')|| a==='datetime'
/**
 * @since 0.2.0
 */
export const isEnumScalar = (a: MField['type']): a is MEnumScalar => !isString(a) && a._kind === 'enum'
/**
 * @since 0.2.0
 */
export const isKindScalar = (a: MField['type']): a is MKindScalar => !isString(a) && a._kind === 'kind'
/**
 * @since 0.2.0
 */
export const isJsonScalar = (a: MField['type']): a is MJsonScalar => !isString(a) && a._kind === 'json'
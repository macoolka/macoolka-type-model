/**
 * @file
 */
import { MModule } from '../models/Module'
/**
 * Provide a option at build a TS. 
 * @desczh
 * 建立TS的选项
 */
export interface TSOptions {
    /**
     * remark
     * @desczh
     * 注释
     */
    header?: string[]
    /**
     * import statement
     * @desczh
     * 导入语句
     */
    imports?: string[]
    /**
     * The field that have defaultvalue is optinal when True
     * @desczh
     * 为true时，有缺省值的字段为可选
     */
    isInput?: boolean
    /**
     * Print description when true
     * @desczh
     * 是否打印注释
     */
    showDesc?: boolean
}
/**
 * Print a Module to ts code text
 * @desczh
 * 打印Module到ts代码
 * @since 0.2.0
 */
export interface TSBuild {
    (option?: TSOptions): (schema: MModule) => string
}
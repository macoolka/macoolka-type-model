/**
 * Code generated by github.com/macoolka/macoolka-gen-model, DO NOT EDIT.
 */
export interface NonEmptyArray<A> extends Array<A> {
    0: A
}

export type MaybeArray<A> = A | Array<A>

/**
 * basic scalar
 * @desczh
 * 基本标量
 */
export type MBasicScalar = 'string' | 'number' | 'boolean' | 'int' | 'datetime' | 'json'
/**
 * Sring Format
 * @desczh
 * 文本格式
 */
export type MStringFormat = 'UUID' | 'EMail' | 'IPV4' | 'IPV6' | 'URL'
/**
 * type kind
 * @desczh
 * 类型标示
 */
export type MIdentifierKind = 'field' | 'typealias' | 'interface' | 'class' | 'export' | 'function' | 'param' | 'constant' | 'module' | 'method' | 'staticmethod'
/**
 * Scalar
 * @desczh
 * 标量
 */
export type MScalars = MEnumScalar | MStringScalar | MNumberScalar | MIntScalar | MBooleanScalar | MJsonScalar | MDateTimeScalar | MKindScalar | MTypeScalar | MTypeUnionScalar | MTypeIntersectionScalar
/**
 * Type have a name field
 * @desczh
 * 有一个name字段
 */
export interface MNameable {
  /**
   * The name is unique
   * @desczh
   * 唯一的名称
   */
  name: string
}
/**
 * Document Tags
 * @desczh
 * 语句注释
 */
export interface MDocumentable {
  /**
   * That this is no longer the preferred way.
   * @desczh
   * 过时，不再使用
   */
  deprecated?: boolean
  /**
   * description
   * @desczh
   * 注释
   */
  description?: Array<string>
  /**
   * Ignore the node when build  docs
   * @desczh
   * 是否在生成文档时跳过
   */
  ignore?: boolean
  /**
   * i18n description
   * @desczh
   * 国际化注释
   */
  descriptions?: Record<string,any>
  /**
   * When was this feature added.
   * @desczh
   * 哪一个版本加入
   */
  since?: string
  /**
   * example code
   * @desczh
   * 示例代码
   */
  examples?: Array<string>
  /**
   * signature
   * @desczh
   * 签名
   */
  signature?: string
  /**
   * That reason of deprecation.
   * @desczh
   * 废弃原因
   */
  reason?: Array<string>
  /**
   * The path on root
   * @desczh
   * 在根目录下的路径
   */
  path?: Array<string>
}
/**
 * The Node can export on module
 * @desczh
 * 节点是否在模块导出
 */
export interface MExportable {
  /**
   * This contains tag 'export'
   * @desczh
   * 是否有导出标记
   */
  isExported?: boolean
}
/**
 * The define  basic info for scalar 
 * @desczh
 * 定义一个标量的基本信息
 */
export interface MScalable {
  /**
   * The Node can be marked as undefined. 
   * @desczh
   * 可能为空
   */
  maybe?: boolean
  /**
   * The field has the many multiplicity will also be marked.
   * @desczh
   * 是否是数组
   */
  isArray?: boolean
  /**
   * The field is T | Array<T>.
   * @desczh
   * T | Array<T>
   */
  maybeArray?: boolean
  /**
   * The means that no item in the list can be null
   * @desczh
   * 非空数组
   */
  isArrayRequired?: boolean
  /**
   * The means that defaultValue is []
   * @desczh
   * 缺省值为[]
   */
  defaultEmptyArray?: boolean
}
/**
 * Like a Boolean an Enum can have one of a predefined set of values.
 * The difference is that you can define the possible values
 * (whereas for a Boolean the options are restriced to true and false).
 * For example you could specify how an article should be formatted
 * by creating an Enum with the possible values COMPACT, WIDE and COVER.
 * @desczh
 * 枚举类型
 */
export interface MEnumScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'enum'
  /**
   * The values in enum.
   * @desczh
   * 枚举值
   */
  values?: Array<string>
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: string
}
/**
 * json
 * @desczh
 * json类型
 */
export interface MJsonScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'json'
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: Record<string,any>
}
/**
 * A String holds text. This is the type you would use for a username,
 * the content of a blog post or anything else that is best represented as text.
 * @desczh
 * 文本类型
 */
export interface MStringScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'string'
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: string
  /**
   * The length of value must great than given value
   * @desczh
   * 字段的最小长度
   */
  minLength?: number
  /**
   * The length of value must less than given value
   * @desczh
   * 字段的最大长度
   */
  maxLength?: number
  /**
   * The length value must match the given pattern
   * @desczh
   * 字段必须匹配这个正则表达式
   */
  pattern?: string
  /**
   * The value must match the given format
   * @desczh
   * 字段必须匹配指定的格式
   */
  format?: MStringFormat
}
/**
 * A Number is a number that can have decimals.
 * Use this to store values such as the price of an item in a store or the result of complex calculations.
 * @desczh
 * 数值型
 */
export interface MNumberScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'number'
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: number
  /**
   * The value must less than given value
   * @desczh
   * 字段的最大值
   */
  maximum?: number
  /**
   * The value must great than given value
   * @desczh
   * 字段的最小值
   */
  minimum?: number
}
/**
 * An Int is a number that cannot have decimals. 
 * Use this to store values such as the weight of an ingredient required for a recipe or the minimum age for an event.
 * @desczh
 * 整型
 */
export interface MIntScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'int'
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: number
  /**
   * The value must less than given value
   * @desczh
   * 字段的最大值
   */
  maximum?: number
  /**
   * The value must great than given value
   * @desczh
   * 字段的最小值
   */
  minimum?: number
}
/**
 * A Boolean can have the value true or false.
 * This is useful to keep track of settings such as whether the user wants to receive an email newsletter
 * or if a recipe is appropriate for vegetarians.
 * @desczh
 * 布尔型
 */
export interface MBooleanScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'boolean'
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: boolean
}
/**
 * The DateTime type can be used to store date and/or time values.
 * A good example might be a person's date of birth or the time/data when a specific event is happening.
 * @desczh
 * 日期型
 */
export interface MDateTimeScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'datetime'
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: 'now'
}
/**
 * The _kind is a tag that check which Sclar be used.
 * @desczh
 * 标签
 */
export interface MKindScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'kind'
  /**
   * kind value
   * @desczh
   * 标签值
   */
  value: string
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: string
}
/**
 * A type give a value of model types.
 * @desczh
 * 类型
 */
export interface MTypeScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'type'
  /**
   * Model type name.
   * @desczh
   * 类型名称
   */
  value: string
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: string
}
/**
 * A union type describes a value that can be one of several types.
 * @desczh
 * 链接多个类型用OR
 */
export interface MTypeUnionScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'typeUnion'
  /**
   * Model type name.
   */
  values?: Array<string>
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: string
}
/**
 * A intersection type describes a value that can be one of several types.
 * @desczh
 * 链接多个类型用AND
 */
export interface MTypeIntersectionScalar extends MScalable {
  /**
   * The _kind is a tag that check which Scalar be used.
   * @desczh
   * 标签判断哪一个Scalar被使用
   */
  _kind: 'typeIntersection'
  /**
   * Model type name.
   */
  values?: Array<string>
  /**
   * You can set a default value for the field
   * The value will be applied to newly created records when no value was supplied during the create-operation.
   * @desczh
   * 缺省值
   */
  defaultValue?: string
}
/**
 * The define a scalar ref
 * @desczh
 * 定义一个标量的引用
 */
export interface MValueable {
  /**
   *  The type of this Node. A value of type indicates a scalar type.
   * @desczh
   * 一个节点的类型
   */
  type?: MScalars | MBasicScalar
  /**
   * The Node can be marked as required (also referred to as "non-nullable"). 
   * @desczh
   * 是否必填
   */
  required?: boolean
}
/**
 *  Represents a field in the datamodel.
 * ModelField is referenced by its name and is either scalar or a relation field.
 * @desczh
 * 表示接口有字段集合
 */
export interface MVariable extends MDocumentable, MValueable, MNameable {
}
/**
 *  Represents a field in the datamodel.
 * Field is referenced by its name and is either scalar or a relation field.
 * @desczh
 * 定义一个字段
 */
export interface MField extends MVariable {
  _kind?: 'field'
  /**
   * Setting the unique constraint makes sure that two records of the model in question cannot have the same value for a certain field. 
   * @desczh
   * 唯一.表示这个字段值在模型中不能重复
   */
  unique?: boolean
  /**
   * Id in a model"). 
   * @desczh
   * 这个字段标明模型的唯一性
   */
  id?: boolean
  /**
   * The field create by server.user can not edit
   * @desczh
   * 这个字段值有服务生成，用户不能修改
   */
  readonly?: boolean
  /**
   * The field used by order
   * @desczh
   * 可以根据这个字段排序
   */
  order?: boolean
  /**
   * That field exclusive when create model.
   * @desczh
   * 字段不在增加操作中使用
   */
  exclusiveCreate?: boolean
  /**
   * That field exclusive when update model.
   * @desczh
   * 字段不在更新操作中使用
   */
  exclusiveUpdate?: boolean
  /**
   * That field exclusive in where condition.
   * @desczh
   * 字段不在查询条件中
   */
  exclusiveWhere?: boolean
  /**
   * That field exclusive in search result.
   * @desczh
   * 字段不在查询结果中
   */
  exclusiveSearch?: boolean
  /**
   * That field exclusive in load result.
   * @desczh
   * 字段不在装载结果中
   */
  exclusiveLoad?: boolean
}
/**
 * Param is used by method.
 * @desczh
 * 函数中的参数定义
 */
export interface MParam extends MVariable {
  _kind?: 'param'
}
/**
 * The define a basic function.
 * @desczh
 * 基本函数定义
 */
export interface MFunctional extends MDocumentable, MValueable, MNameable {
  /**
   * Param Array
   * @desczh
   * 参数集合
   */
  params?: Array<MParam>
  /**
   * The means that the method return void 
   * @desczh
   * 是否返回值为void
   */
  returnVoid?: boolean
}
/**
 * The define a method.
 * @desczh
 * 定义了一个方法
 */
export interface MMethod extends MFunctional {
  _kind?: 'method'
}
/**
 * The define a static method.
 * @desczh
 * 定义了一个静态方法
 */
export interface MStaticMethod extends MFunctional {
  _kind?: 'staticmethod'
}
/**
 * The define a function.
 * @desczh
 * 定义了一个方法
 */
export interface MFunction extends MFunctional, MExportable {
  _kind?: 'function'
}
/**
 * The define a constant.
 * @desczh
 * 定义了一个常量
 */
export interface MConstant extends MVariable, MExportable {
  _kind?: 'constant'
}
/**
 * The define a export.
 * @desczh
 * 定义了一个Export
 */
export interface MExport extends MDocumentable, MNameable {
  _kind?: 'export'
}
/**
 * MTypeable consist of multiple fields and multiple methods
 * @desczh
 * 可类型化表示这个类型由多个字段和方法组成
 */
export interface MTypeable extends MDocumentable, MExportable, MNameable {
  /**
   * The define fields on the type.
   * @desczh
   * 字段集合
   */
  fields?: Array<MField>
  /**
   * The define methods on the type.
   * @desczh
   * 方法集合
   */
  methods?: Array<MMethod>
}
/**
 * The Define a interface
 * @desczh
 * 定义一个接口
 */
export interface MInterface extends MTypeable {
  /**
   * kind
   * @desczh
   * 标识
   */
  _kind?: 'interface'
  /**
   * The names be  implemented by the interface
   * @desczh
   * 实现的接口名称集合
   */
  implements?: Array<string>
}
/**
 * The Define a Class
 * @desczh
 * 定义一个类
 */
export interface MClass extends MTypeable {
  _kind?: 'class'
  /**
   * The names be  implemented by the interface
   * @desczh
   * 实现的接口名称集合
   */
  implements?: Array<string>
  /**
   * Static Method Array
   * @desczh
   * 静态方法集合
   */
  staticMethods?: Array<MStaticMethod>
}
/**
 * The Define a Type alias
 * @desczh
 * 定义一个类型别名
 */
export interface MTypeAlias extends MTypeable, MValueable {
  _kind?: 'typealias'
}
/**
 * The Define a Module
 * @desczh
 * 定义一个Module
 */
export interface MModule extends MDocumentable, MNameable {
  /**
   * True mean The module will generate doc
   * @desczh
   * 为真时表示产生文档
   */
  file?: boolean
  _kind?: 'module'
  /**
   * interfaces
   * @desczh
   * 接口集合
   */
  interfaces?: Array<MInterface>
  /**
   * type aliases
   * @desczh
   * 类型别名集合
   */
  typealiases?: Array<MTypeAlias>
  /**
   * classes
   * @desczh
   * 类集合
   */
  classes?: Array<MClass>
  /**
   * functions
   * @desczh
   * 函数集合
   */
  functions?: Array<MFunction>
  /**
   * export
   * @desczh
   * 导出
   */
  exports?: Array<MExport>
  /**
   * constants
   * @desczh
   * 常量集合
   */
  constants?: Array<MConstant>
  /**
   * Id field only one
   * @desczh
   * 是否只有一个Id字段
   */
  idUnique?: boolean
}



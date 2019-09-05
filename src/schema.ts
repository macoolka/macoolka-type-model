import { MModule } from './models/InputModule'

const schema: MModule = {
    name: 'Mocoolka Data Model ',
    idUnique: false,
    interfaces: [
        {
            name: 'MNameable',
            description: [
                'Type have a name field'
            ],
            descriptions: {
                zh: [
                    '有一个name字段'
                ]
            },
            fields: [{
                name: 'name',
                description: [
                    'The name is unique'
                ],
                descriptions: {
                    zh: [
                        '唯一的名称'
                    ]
                },
                type: {
                    _kind: 'string',
                    maxLength: 64,
                },
                required: true,
                unique: true,
                id: true,
            }

            ]
        }, {
            name: "MDocumentable",
            description: [
                'Document Tags'
            ],
            descriptions: {
                zh: [
                    '语句注释'
                ]
            },
            fields: [{
                name: 'deprecated',
                description: [
                    'That this is no longer the preferred way.'
                ],
                descriptions: {
                    zh: [
                        '过时，不再使用'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: 'description',
                description: [
                    'description'
                ],
                descriptions: {
                    zh: [
                        '注释'
                    ]
                },
                type: {
                    _kind: 'string',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true,

            }, {
                name: 'ignore',
                description: [
                    'Ignore the node when build  docs'
                ],
                descriptions: {
                    zh: [
                        '是否在生成文档时跳过'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,

            }, {
                name: 'descriptions',
                description: [
                    'i18n description'
                ],
                descriptions: {
                    zh: [
                        '国际化注释'
                    ]
                },
                type: 'json'

            }, {
                name: 'since',
                type: {
                    _kind: 'string',
                    defaultValue: '0.2.0',
                },
                description: [
                    'When was this feature added.'
                ],
                descriptions: {
                    zh: [
                        '哪一个版本加入'
                    ]
                },

            }, {
                name: 'examples',
                description: [
                    'example code'
                ],
                descriptions: {
                    zh: [
                        '示例代码'
                    ]
                },
                type: {
                    _kind: 'string',
                    isArray: true,
                    defaultEmptyArray: true,
                },
                required: true,
            }, {
                name: 'signature',
                description: [
                    'signature'
                ],
                descriptions: {
                    zh: [
                        '签名'
                    ]
                },
            }, {
                name: 'reason',

                description: [
                    'That reason of deprecation.'
                ],
                descriptions: {
                    zh: [
                        '废弃原因'
                    ]
                },
                type: {
                    _kind: 'string',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true,
            }, {
                name: 'path',
                description: [
                    'The path on root'
                ],
                descriptions: {
                    zh: [
                        '在根目录下的路径'
                    ]
                },
                type: {
                    _kind: 'string',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true,

            },]
        }, {
            name: "MExportable",
            description: [
                'The Node can export on module'
            ],
            descriptions: {
                zh: [
                    '节点是否在模块导出'
                ]
            },
            fields: [{
                name: 'isExported',
                description: [
                    `This contains tag 'export'`
                ],
                descriptions: {
                    zh: [
                        '是否有导出标记'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: true,
                },
                required: true,
            }]
        }, {
            name: 'MScalable',
            description: [
                'The define  basic info for scalar '
            ],
            descriptions: {
                zh: [
                    '定义一个标量的基本信息'
                ]
            },
            fields: [
                {
                    name: 'maybe',
                    description: [
                        'The Node can be marked as undefined. '
                    ],
                    descriptions: {
                        zh: [
                            '可能为空'
                        ]
                    },
                    type: {
                        _kind: 'boolean',
                        defaultValue: false,
                    },
                    required: true,
                }, {
                    name: 'isArray',
                    description: [
                        'The field has the many multiplicity will also be marked.'
                    ],
                    descriptions: {
                        zh: [
                            '是否是数组'
                        ]
                    },
                    type: {
                        _kind: 'boolean',
                        defaultValue: false,
                    },
                    required: true,
                }, {
                    name: 'maybeArray',
                    description: [
                        'The field is T | Array<T>.'
                    ],
                    descriptions: {
                        zh: [
                            'T | Array<T>'
                        ]
                    },
                    type: {
                        _kind: 'boolean',
                        defaultValue: false,
                    },
                    required: true,
                }, {
                    name: 'isArrayRequired',
                    description: [
                        'The means that no item in the list can be null'
                    ],
                    descriptions: {
                        zh: [
                            '非空数组'
                        ]
                    },
                    type: {
                        _kind: 'boolean',
                        defaultValue: false,
                    },
                    required: true,
                }, {
                    name: 'defaultEmptyArray',
                    description: [
                        'The means that defaultValue is []'
                    ],
                    descriptions: {
                        zh: [
                            '缺省值为[]'
                        ]
                    },
                    type: {
                        _kind: 'boolean',
                        defaultValue: true,
                    },
                    required: true,
                },
            ]
        }, {
            name: 'MEnumScalar',
            implements: ['MScalable'],
            description: [
                'Like a Boolean an Enum can have one of a predefined set of values.',
                'The difference is that you can define the possible values',
                '(whereas for a Boolean the options are restriced to true and false).',
                'For example you could specify how an article should be formatted',
                'by creating an Enum with the possible values COMPACT, WIDE and COVER.'
            ],
            descriptions: {
                zh: [
                    '枚举类型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'enum',
                },
                required: true,
            }, {
                name: 'values',
                description: [
                    'The values in enum.'
                ],
                descriptions: {
                    zh: [
                        '枚举值'
                    ]
                },
                type: {
                    _kind: 'string',
                    isArray: true,
                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
            }
            ]
        }, {
            name: 'MJsonScalar',
            implements: ['MScalable'],
            description: [
                'json'
            ],
            descriptions: {
                zh: [
                    'json类型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'json',
                },
                required: true,
            }, {
                name: 'defaultValue',
                type: 'json',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
            }
            ]
        }, {
            name: 'MStringScalar',
            implements: ['MScalable'],
            description: [
                'A String holds text. This is the type you would use for a username,',
                'the content of a blog post or anything else that is best represented as text.'
            ],
            descriptions: {
                zh: [
                    '文本类型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'string',
                },
                required: true,
            }, {
                name: 'defaultValue',

                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
            }, {
                name: 'minLength',
                type: 'int',
                description: [
                    'The length of value must great than given value',
                ],
                descriptions: {
                    zh: [
                        '字段的最小长度'
                    ]
                },
            }, {
                name: 'maxLength',
                type: 'int',
                description: [
                    'The length of value must less than given value',
                ],
                descriptions: {
                    zh: [
                        '字段的最大长度'
                    ]
                },
            }, {
                name: 'pattern',
                description: [
                    'The length value must match the given pattern',
                ],
                descriptions: {
                    zh: [
                        '字段必须匹配这个正则表达式'
                    ]
                },
            }, {
                name: 'format',
                type: {
                    _kind: 'type',
                    value: 'MStringFormat'
                },
                description: [
                    'The value must match the given format',
                ],
                descriptions: {
                    zh: [
                        '字段必须匹配指定的格式'
                    ]
                },
            }]
        }, {
            name: 'MNumberScalar',
            implements: ['MScalable'],
            description: [
                'A Number is a number that can have decimals.',
                'Use this to store values such as the price of an item in a store or the result of complex calculations.'
            ],
            descriptions: {
                zh: [
                    '数值型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'number',
                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
                type: 'number'


            }, {
                name: 'maximum',
                type: 'number',
                description: [
                    'The value must less than given value',
                ],
                descriptions: {
                    zh: [
                        '字段的最大值'
                    ]
                },
            }, {
                name: 'minimum',
                type: 'number',
                description: [
                    'The value must great than given value',
                ],
                descriptions: {
                    zh: [
                        '字段的最小值'
                    ]
                },
            }]
        }, {
            name: 'MIntScalar',
            implements: ['MScalable'],
            description: [
                'An Int is a number that cannot have decimals. ',
                'Use this to store values such as the weight of an ingredient required for a recipe or the minimum age for an event.'
            ],
            descriptions: {
                zh: [
                    '整型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'int',
                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
                type: 'number'

            }, {
                name: 'maximum',
                type: 'int',
                description: [
                    'The value must less than given value',
                ],
                descriptions: {
                    zh: [
                        '字段的最大值'
                    ]
                },

            }, {
                name: 'minimum',
                type: 'int',
                description: [
                    'The value must great than given value',
                ],
                descriptions: {
                    zh: [
                        '字段的最小值'
                    ]
                },
            }]
        }, {
            name: 'MBooleanScalar',
            implements: ['MScalable'],
            description: [
                'A Boolean can have the value true or false.',
                'This is useful to keep track of settings such as whether the user wants to receive an email newsletter',
                'or if a recipe is appropriate for vegetarians.'
            ],
            descriptions: {
                zh: [
                    '布尔型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'boolean',
                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
                type: 'boolean'
            },]
        }, {
            name: 'MDateTimeScalar',
            implements: ['MScalable'],
            description: [
                'The DateTime type can be used to store date and/or time values.',
                'A good example might be a person\'s date of birth or the time/data when a specific event is happening.'
            ],
            descriptions: {
                zh: [
                    '日期型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'datetime',
                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
                type: {
                    _kind: 'enum',
                    values: ['now']
                },

            },]
        }, {
            name: 'MKindScalar',
            implements: ['MScalable'],
            descriptions: {
                zh: [
                    '标签'
                ]
            },
            description: [
                'The _kind is a tag that check which Sclar be used.'
            ],
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'kind',
                },
                required: true,
            }, {
                name: 'value',
                required: true,
                description: [
                    'kind value',
                ],
                descriptions: {
                    zh: [
                        '标签值'
                    ]
                },
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
            }]
        }, {
            name: 'MTypeScalar',
            implements: ['MScalable'],
            description: [
                'A type give a value of model types.'
            ],
            descriptions: {
                zh: [
                    '类型'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'type',

                },
                required: true,
            }, {
                name: 'value',
                description: [
                    'Model type name.'
                ],
                descriptions: {
                    zh: [
                        '类型名称'
                    ]
                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
            }]
        }, {
            name: 'MTypeUnionScalar',
            implements: ['MScalable'],
            description: [
                'A union type describes a value that can be one of several types.'
            ],
            descriptions: {
                zh: [
                    '链接多个类型用OR'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'typeUnion',

                },
                required: true,
            }, {
                name: 'values',
                description: [
                    'Model type name.'
                ],
                type: {
                    _kind: 'string',
                    isArray: true,

                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
            },]
        }, {
            name: 'MTypeIntersectionScalar',
            implements: ['MScalable'],
            description: [
                'A intersection type describes a value that can be one of several types.'
            ],
            descriptions: {
                zh: [
                    '链接多个类型用AND'
                ]
            },
            fields: [{
                name: '_kind',
                description: [
                    'The _kind is a tag that check which Scalar be used.'
                ],
                descriptions: {
                    zh: [
                        '标签判断哪一个Scalar被使用'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'typeIntersection',

                },
                required: true,
            }, {
                name: 'values',
                description: [
                    'Model type name.'
                ],
                type: {
                    _kind: 'string',
                    isArray: true,


                },
                required: true,
            }, {
                name: 'defaultValue',
                description: [
                    'You can set a default value for the field',
                    'The value will be applied to newly created records when no value was supplied during the create-operation.'
                ],
                descriptions: {
                    zh: [
                        '缺省值'
                    ]
                },
            },]
        }, {
            name: 'MValueable',
            description: [
                'The define a scalar ref',
             ],
            descriptions: {
                zh: [
                    '定义一个标量的引用'
                ]
            },
            fields: [
                {
                    name: 'type',
                    description: [
                        ' The type of this Node. A value of type indicates a scalar type.'
                    ],
                    descriptions: {
                        zh: [
                            '一个节点的类型'
                        ]
                    },
                    type: {
                        _kind: 'typeUnion',
                        values: ['MScalars', 'MBasicScalar'],
                        defaultValue: 'string'
                    },
                    required: true
                }, {
                    name: 'required',
                    description: [
                        'The Node can be marked as required (also referred to as "non-nullable"). '
                    ],
                    descriptions: {
                        zh: [
                            '是否必填'
                        ]
                    },
                    type: {
                        _kind: 'boolean',
                        defaultValue: false,
                    },
                    required: true,
                }
            ]
        }, {
            name: 'MVariable',
            description: [
                ` Represents a field in the datamodel.`,
                'ModelField is referenced by its name and is either scalar or a relation field.',
            ],
            descriptions: {
                zh: [
                    '表示接口有字段集合'
                ]
            },
            implements: ['MDocumentable', 'MValueable', 'MNameable'],
            fields: []
        }, {
            name: 'MField',
            description: [
                ` Represents a field in the datamodel.`,
                'Field is referenced by its name and is either scalar or a relation field.',
            ],
            descriptions: {
                zh: [
                    '定义一个字段'
                ]
            },
            implements: ['MVariable'],
            fields: [{
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'field',
                    defaultValue: 'field'
                },
                required: true,
            }, {
                name: 'unique',

                description: [
                    'Setting the unique constraint makes sure that two records of the model in question cannot have the same value for a certain field. '
                ],
                descriptions: {
                    zh: [
                        '唯一.表示这个字段值在模型中不能重复'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,

            }, {
                name: 'id',
                description: [
                    'Id in a model"). '
                ],
                descriptions: {
                    zh: [
                        '这个字段标明模型的唯一性'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: 'readonly',
                description: [
                    'The field create by server.user can not edit'
                ],
                descriptions: {
                    zh: [
                        '这个字段值有服务生成，用户不能修改'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: 'order',
                description: [
                    'The field used by order'
                ],
                descriptions: {
                    zh: [
                        '可以根据这个字段排序'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: true,
                },
                required: true,
            }, {
                name: 'exclusiveCreate',
                description: [
                    'That field exclusive when create model.'
                ],
                descriptions: {
                    zh: [
                        '字段不在增加操作中使用'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: 'exclusiveUpdate',
                description: [
                    'That field exclusive when update model.'
                ],
                descriptions: {
                    zh: [
                        '字段不在更新操作中使用'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: 'exclusiveWhere',
                description: [
                    'That field exclusive in where condition.'
                ],
                descriptions: {
                    zh: [
                        '字段不在查询条件中'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: 'exclusiveSearch',
                description: [
                    'That field exclusive in search result.'
                ],
                descriptions: {
                    zh: [
                        '字段不在查询结果中'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: 'exclusiveLoad',
                description: [
                    'That field exclusive in load result.'
                ],
                descriptions: {
                    zh: [
                        '字段不在装载结果中'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            },]
        }, {
            name: 'MParam',
            implements: ['MVariable'],
            description: [
                'Param is used by method.',
            ],
            descriptions: {
                zh: [
                    '函数中的参数定义'
                ]
            },
            fields: [{
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'param',
                    defaultValue: 'param'
                },
                required: true,
            },]
        }, {
            name: 'MFunctional',
            description: [
                'The define a basic function.',
            ],
            descriptions: {
                zh: [
                    '基本函数定义'
                ]
            },
            implements: ['MDocumentable', 'MValueable', 'MNameable'],
            fields: [{
                name: 'params',
                description: [
                    'Param Array'
                ],
                descriptions: {
                    zh: [
                        '参数集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MParam',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true
            }, {
                name: 'returnVoid',
                description: [
                    'The means that the method return void '
                ],
                descriptions: {
                    zh: [
                        '是否返回值为void'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            },]
        }, {
            name: 'MMethod',
            description: [
                'The define a method.',

            ],

            descriptions: {
                zh: [
                    '定义了一个方法'
                ]
            },
            implements: ['MFunctional'],
            fields: [{
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'method',
                    defaultValue: 'method'
                },
                required: true,
            },]
        }, {
            name: 'MStaticMethod',
            description: [
                'The define a static method.',

            ],

            descriptions: {
                zh: [
                    '定义了一个静态方法'
                ]
            },

            implements: ['MFunctional'],
            fields: [{
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'staticmethod',
                    defaultValue: 'staticmethod'
                },
                required: true,
            }]
        }, {
            name: 'MFunction',
            description: [
                'The define a function.',
            ],

            descriptions: {
                zh: [
                    '定义了一个方法'
                ]
            },
            fields: [
                {
                    name: '_kind',
                    type: {
                        _kind: 'kind',
                        value: 'function',
                        defaultValue: 'function'
                    },
                    required: true,
                },
            ],
            implements: ['MFunctional', 'MExportable',],

        }, {
            name: 'MConstant',
            description: [
                'The define a constant.',
            ],

            descriptions: {
                zh: [
                    '定义了一个常量'
                ]
            },
            fields: [
                {
                    name: '_kind',
                    type: {
                        _kind: 'kind',
                        value: 'constant',
                        defaultValue: 'constant'
                    },
                    required: true,
                },
            ],
            implements: ['MVariable', 'MExportable',],

        }, {
            name: 'MExport',
            description: [
                'The define a export.',

            ],

            descriptions: {
                zh: [
                    '定义了一个Export'
                ]
            },
            implements: ['MDocumentable', 'MNameable'],
            fields: [{
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'export',
                    defaultValue: 'export'
                },
                required: true,
            },]
        }, {
            name: 'MTypeable',
            implements: ['MDocumentable', 'MExportable', 'MNameable'],
            description: [
                'MTypeable consist of multiple fields and multiple methods',
            ],

            descriptions: {
                zh: [
                    '可类型化表示这个类型由多个字段和方法组成'
                ]
            },

            fields: [{
                name: 'fields',
                description: [
                    'The define fields on the type.',
                ],

                descriptions: {
                    zh: [
                        '字段集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MField',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true,

            }, {
                name: 'methods',
                description: [
                    'The define methods on the type.',
                ],

                descriptions: {
                    zh: [
                        '方法集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MMethod',
                    isArray: true,
                    defaultEmptyArray: true,

                },

                required: true,
            }]
        }, {
            name: 'MInterface',
            description: [
                'The Define a interface',
            ],

            descriptions: {
                zh: [
                    '定义一个接口'
                ]
            },
            implements: ['MTypeable'],
            fields: [{
                name: '_kind',
                description: [
                    'kind',
                ],

                descriptions: {
                    zh: [
                        '标识'
                    ]
                },
                type: {
                    _kind: 'kind',
                    value: 'interface',
                    defaultValue: 'interface'
                },
                required: true,
            }, {
                name: 'implements',
                description: [
                    'The names be  implemented by the interface',
                ],

                descriptions: {
                    zh: [
                        '实现的接口名称集合'
                    ]
                },
                type: {
                    _kind: 'string',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true,
            }]
        }, {
            name: 'MClass',
            description: [
                'The Define a Class',
            ],

            descriptions: {
                zh: [
                    '定义一个类'
                ]
            },

            implements: ['MTypeable'],
            fields: [{
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'class',
                    defaultValue: 'class'
                },
                required: true,
            }, {
                name: 'implements',
                description: [
                    'The names be  implemented by the interface',
                ],

                descriptions: {
                    zh: [
                        '实现的接口名称集合'
                    ]
                },
                type: {
                    _kind: 'string',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true,
            }, {
                name: 'staticMethods',
                description: [
                    'Static Method Array',
                ],

                descriptions: {
                    zh: [
                        '静态方法集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MStaticMethod',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true,
            }]
        }, {
            name: 'MTypeAlias',
            implements: ['MTypeable', 'MValueable'],
            description: [
                'The Define a Type alias',
            ],

            descriptions: {
                zh: [
                    '定义一个类型别名'
                ]
            },
            fields: [{
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'typealias',
                    defaultValue: 'typealias'
                },
                required: true,
            }]
        }, {
            name: 'MModule',

            description: [
                'The Define a Module',
            ],

            descriptions: {
                zh: [
                    '定义一个Module'
                ]
            },
            implements: ['MDocumentable', 'MNameable'],
            fields: [{
                name: 'file',
                description: [
                    'True mean The module will generate doc',
                ],

                descriptions: {
                    zh: [
                        '为真时表示产生文档'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }, {
                name: '_kind',
                type: {
                    _kind: 'kind',
                    value: 'module',
                    defaultValue: 'module'
                },
                required: true,
            }, {
                name: 'interfaces',
                description: [
                    'interfaces',
                ],

                descriptions: {
                    zh: [
                        '接口集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MInterface',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true
            }, {
                name: 'typealiases',
                description: [
                    'type aliases',
                ],

                descriptions: {
                    zh: [
                        '类型别名集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MTypeAlias',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true
            }, {
                name: 'classes',
                description: [
                    'classes',
                ],

                descriptions: {
                    zh: [
                        '类集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MClass',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true
            }, {
                name: 'functions',
                description: [
                    'functions',
                ],

                descriptions: {
                    zh: [
                        '函数集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MFunction',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true
            }, {
                name: 'exports',
                description: [
                    'export',
                ],

                descriptions: {
                    zh: [
                        '导出'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MExport',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true
            }, {
                name: 'constants',
                description: [
                    'constants',
                ],

                descriptions: {
                    zh: [
                        '常量集合'
                    ]
                },
                type: {
                    _kind: 'type',
                    value: 'MConstant',
                    isArray: true,
                    defaultEmptyArray: true,
                },

                required: true
            }, {
                name: 'idUnique',
                description: [
                    'Id field only one',
                ],

                descriptions: {
                    zh: [
                        '是否只有一个Id字段'
                    ]
                },
                type: {
                    _kind: 'boolean',
                    defaultValue: false,
                },
                required: true,
            }]
        }],
    typealiases: [{
        name: 'MBasicScalar',
        description: [
            'basic scalar',
        ],

        descriptions: {
            zh: [
                '基本标量'
            ]
        },
        required: true,
        type: {
            _kind: 'enum',
            values: ['string', 'number', 'boolean', 'int', 'datetime', 'json']
        },
    }, {
        name: 'MStringFormat',
        description: [
            'Sring Format',
        ],

        descriptions: {
            zh: [
                '文本格式'
            ]
        },
        required: true,
        type: {
            _kind: 'enum',
            values: ['UUID', 'EMail', 'IPV4', 'IPV6', 'URL']
        },
    }, {
        name: 'MIdentifierKind',
        required: true,
        description: [
            'type kind',
        ],

        descriptions: {
            zh: [
                '类型标示'
            ]
        },
        type: {
            _kind: 'enum',
            values: ['field', 'typealias', 'interface', 'class', 'export', 'function', 'param',
                'constant', 'module', 'method', 'staticmethod']
        },
    },{
        name: 'MScalars',
        required: true,
        description: [
            'Scalar',
        ],

        descriptions: {
            zh: [
                '标量'
            ]
        },
        type: {
            _kind: 'typeUnion',
            values: ['MEnumScalar', 'MStringScalar', 'MNumberScalar', 'MIntScalar', 'MBooleanScalar', 'MJsonScalar',
            'MDateTimeScalar', 'MKindScalar', 'MTypeScalar', 'MTypeUnionScalar', 'MTypeIntersectionScalar', ]
        },
    }]
} as MModule
export default schema
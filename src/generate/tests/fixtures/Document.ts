import { InputModule } from '../../../types'
const DocumentSchema: InputModule.MModule = {
    name: 'Document',
    idUnique:false,
    interfaces: [{
        name: 'Documentable',
        fields: [{
            name: 'name',
           
            required: true,
        }, {
            name: 'description',
            type: 'string',
        }, {
            name: 'since',
            type: 'string',
            required: true,
        }, {
            name: 'deprecated',
            type: 'boolean',
            required: true,
        }, {
            name: 'examples',
            type: {
               _kind: 'boolean',
               isArray: true,
            },
            required: true,
          
        }]

    }, {
        name: 'Interface',
        implements: ['Documentable'],
        fields: [{
            name: 'signature',
            type: 'string',
            required: true,
        },
        ]
    }, {
        name: 'Func',
        implements: ['Documentable'],
        fields: [{
            name: 'signature',
            type: 'string',
            required: true,
        },
        ]
    }, {
        name: 'Method',
        implements: ['Documentable'],
        fields: [{
            name: 'signature',
            type: 'string',
            required: true,
        },
        ]
    }, {
        name: 'Class',
        implements: ['Documentable'],
        fields: [{
            name: 'signature',
            type: 'string',
            required: true,
        }, {
            name: 'methods',
            type: {
                _kind: 'type',
                value: 'Method',
                isArray: true,
            },
           
            required: true,

        }, {
            name: 'staticMethods',
            type: {
                _kind: 'type',
                value: 'Method',
                isArray: true,
            },
          
            required: true,
        }
        ]
    }, {
        name: 'TypeAlias',
        implements: ['Documentable'],
        fields: [{
            name: 'signature',
            type: 'string',
            required: true,
        },
        ]
    }, {
        name: 'Constant',
        implements: ['Documentable'],
        fields: [{
            name: 'signature',
            type: 'string',
            required: true,
        },
        ]
    }, {
        name: 'Export',
        implements: ['Documentable'],
        fields: [{
            name: 'signature',
            type: 'string',
            required: true,
        },
        ]
    }, {
        name: 'Module',
        fields: [{
            name: 'path',
            type: {
                _kind:'string',
                isArray: true,

            },
           
            required: true,
        }, {
            name: 'description',
            type: 'string',

        }, {
            name: 'interfaces',
            type: {
                _kind: 'type',
                value: 'Interface',
                isArray: true,
            },
            required: true,
           
        }, {
            name: 'typeAliases',
            type: {
                _kind: 'type',
                value: 'TypeAlias',
                isArray: true,
            },
            required: true,
          
        }, {
            name: 'functions',
            type: {
                _kind: 'type',
                value: 'Func',
                isArray: true,
            },
            required: true,
            
        }, {
            name: 'classes',
            type: {
                _kind: 'type',
                value: 'Class',
                isArray: true,
            },
            required: true,
           
        }, {
            name: 'constants',
            type: {
                _kind: 'type',
                value: 'Constant',
                isArray: true,
            },
            required: true,
           
        }, {
            name: 'exports',
            type: {
                _kind: 'type',
                value: 'Export',
                isArray: true,
            },
            required: true,
          
        }, {
            name: 'deprecated',
            type: 'boolean',
            required: true,
        },
        ]
    },]
}
export default DocumentSchema;
/**
 * @since 0.2.0
 */
export type Example = string



/**
 * @since 0.2.0
 */
export interface Documentable {
    readonly name: string
    readonly description?: string
    readonly since: string
    readonly deprecated: boolean
    readonly examples: Array<Example>
}



/**
 * @since 0.2.0
 */
export interface Interface extends Documentable {
    signature: string
}



/**
 * @since 0.2.0
 */
export interface Func extends Documentable {
    readonly signatures: Array<string>
}



/**
 * @since 0.2.0
 */
export interface Method extends Documentable {
    readonly signatures: Array<string>
}


/**
 * @since 0.2.0
 */
export interface Class extends Documentable {
    readonly signature: string
    readonly methods: Array<Method>
    readonly staticMethods: Array<Method>
}

/**
 * @since 0.2.0
 */
export interface TypeAlias extends Documentable {
    readonly signature: string
}


/**
 * @since 0.2.0
 */
export interface Constant extends Documentable {
    readonly signature: string
}


/**
 * @since 0.2.0
 */
export interface Export extends Documentable {
    readonly signature: string
}


/**
 * @since 0.2.0
 */
export interface Module {
    readonly path: Array<string>
    readonly description?: string
    readonly interfaces: Array<Interface>
    readonly typeAliases: Array<TypeAlias>
    readonly functions: Array<Func>
    readonly classes: Array<Class>
    readonly constants: Array<Constant>
    readonly exports: Array<Export>
    readonly deprecated: boolean
}

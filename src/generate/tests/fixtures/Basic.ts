import { InputModule } from '../../../types'
const a: InputModule.MModule = {
    name: 'Basic',
    idUnique: false,
    interfaces: [{
        name: 'T1',
        fields: [
            {
                name: 'name1',
                required: true
            }
        ]

    }, {
        name: 'T2',
        fields: [
            {
                name: 'name2',
            }
        ]
    }, {
        name: 'Basic',
        implements: ['T1', 'T2'],
        methods: [{
            name: 'add',
            returnVoid: true,
            params: [{
                name: 'string',
                required: true,
            }, {
                name: 'number',

                type: 'number'
            }, {
                name: 'date',
                type: 'datetime'
            }, {
                name: 'int',
                type: 'int'
            }, {
                name: 'boolean',
                type: 'boolean'
            }, {
                name: 'json1',
                type: 'json'
            }, {
                name: 'string_kind',
                type: { _kind: 'string' }
            }, {
                name: 'number_kind',
                type: { _kind: 'number' }
            }, {
                name: 'int_kind',
                type: { _kind: 'int' }
            }, {
                name: 'datetime_kind',
                type: { _kind: 'datetime' }
            }, {
                name: 'json_kind',
                type: { _kind: 'json' }
            }, {
                name: 'boolean_kind',
                type: { _kind: 'boolean' }
            }, {
                name: 'enum_kind',
                type: { _kind: 'enum', values: ['a', 'b'] }
            }, {
                name: 'enum_t_kind',
                type: { _kind: 'type', value: 'City' }
            }, {
                name: 'kind_kind',
                type: { _kind: 'kind', value: 'k' }
            }, {
                name: 'type_kind',
                type: { _kind: 'type', value: 'T1' }
            }, {
                name: 'typeUnion_kind',
                type: { _kind: 'typeUnion', values: ['T1', 'T2'] }
            },]
        }

        ],
        fields: [{
            name: 'id',
            id: true,
        }, {
            name: 'string',
            required: true,
        }, {
            name: 'number',
            type: 'number'
        }, {
            name: 'date',
            type: 'datetime'
        }, {
            name: 'int',
            type: 'int'
        }, {
            name: 'boolean',
            type: 'boolean'
        }, {
            name: 'json1',
            type: 'json'
        }, {
            name: 'string_kind',
            type: { _kind: 'string' }
        }, {
            name: 'number_kind',
            type: { _kind: 'number' }
        }, {
            name: 'int_kind',
            type: { _kind: 'int' }
        }, {
            name: 'datetime_kind',
            type: { _kind: 'datetime' }
        }, {
            name: 'json_kind',
            type: { _kind: 'json' }
        }, {
            name: 'boolean_kind',
            type: { _kind: 'boolean' }
        }, {
            name: 'enum_kind',
            type: { _kind: 'enum', values: ['a', 'b'] }
        }, {
            name: 'enum_t_kind',
            type: { _kind: 'type', value: 'City' }
        }, {
            name: 'kind_kind',
            type: { _kind: 'kind', value: 'k' }
        }, {
            name: 'type_kind',
            type: { _kind: 'type', value: 'T1' }
        }, {
            name: 'typeUnion_kind',
            type: { _kind: 'typeUnion', values: ['T1', 'T2'] }
        },]
    }],

    typealiases: [{
        name: 'City',
        type: {
            _kind: 'enum',
            values: ['A', 'B', 'C']
        },
        required: true,

    }, {
        name: 'Empty',
        type: {
            _kind: 'enum',
            values: []
        },
        required: true,
    }]

}
export default a

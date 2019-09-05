import { InputModule } from '../../../types'
const a: InputModule.MModule = {
    name: 'Basic',
    idUnique: false,
    interfaces: [{
        name: 'User',
        fields: [{
            name: 'all',
            type: {
                _kind: 'string',
                defaultValue: 'all',
                isArray: true,
                isArrayRequired: true
            },
            required: true

        }, {
            name: 'requireAndArray',
            type: {
                _kind: 'number',
                defaultValue: 1,
                isArray: true
            },
            required: true

        }, {
            name: 'isArrayRequiredAndArray',
            type: {
                _kind: 'number',
                defaultValue: 2,
                isArrayRequired: true,
                isArray: true
            }

        }, {
            name: 'RequiredAndisArrayRequired',
            type: {
                _kind: 'number',
                defaultValue: 3,
                isArrayRequired: true
            },
            required: true

        }, {
            name: 'array',
            type: {
                _kind: 'number',
                defaultValue: 4,
                isArray: true
            }

        }, {
            name: 'isArrayRequired',
            type: {
                _kind: 'number',
                defaultValue: 5,
                isArrayRequired: true
            }

        }, {
            name: 'require',
            type: {
                _kind: 'datetime',
                defaultValue: 'now'
            },
            required: true
        }, {
            name: 'empty',
            type: {
                _kind: 'number',
                defaultValue: 7
            }
        }]
    }],
    typealiases: [{
        name: 'City',
        type: {
            _kind: 'enum',
            values: ['A', 'B', 'C']

        },
        required: true

    }]

}
export default a

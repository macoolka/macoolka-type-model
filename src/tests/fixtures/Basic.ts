import { InputModule } from '../../types'
const a: InputModule.MModule = {
    name: 'Basic',
    interfaces: [{
        name: 'O1',
        fields: [{
            name: 'id',
            type: {
                _kind: 'int',
            },
            id: true,
            required: true,
            unique: true,

        }, {
            name: 'e1',
            type: {
                _kind: 'type',
                value: 'E1'
            },
        }, {
            name: 'e2',
            type: {
                _kind: 'type',
                value: 'E2'
            },

        }]
    }, {
        name: 'O2',
        implements: ['O1'],
        fields: [{
            name: 'id',
            type: {
                _kind: 'int',
            },
            id: true,
            required: true,
            unique: true,

        }, {
            name: 'e1',
            type: {
                _kind: 'type',
                value: 'E1'
            },
        }, {
            name: 'e2',
            type: {
                _kind: 'type',
                value: 'E2'
            },

        }]
    }],
    typealiases: [{
        name: 'E1',
       

    }, {
        name: 'E2',
       
    }]


}
export default a
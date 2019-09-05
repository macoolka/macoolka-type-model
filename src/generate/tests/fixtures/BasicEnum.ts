import { InputModule } from '../../../types'
export const b: InputModule.MModule = {
    name: 'Basic',
    idUnique: false,
    interfaces: [],
    typealiases: [{
        name: 'City',
        type: {
            _kind: 'enum',
            values: ['A','B','C']
        },
        required: true

    },{
        name: 'Empty',
        type: {
            _kind: 'enum',
            values: []
        },
        required: true
    }
    ]

}
export default b

import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { writeFileSync } from 'fs'
import {InputModule, ioBuild, typeBuild } from '../../'
const userSchema: InputModule.MModule = {
    name: 'User',
    interfaces: [{
        name: 'User',
        fields: [{
            name: 'name',
            required: true,
        }, {
            name: 'id',
            id: true,
            required: true,
        }, {
            name: 'age',
            type: 'int',
        }, {
            name: 'female',
            type: 'boolean'
        }, {
            name: 'city',
            type: {
                _kind: 'enum',
                values: ['dalian', 'london', 'newyork', 'beijing'],
                defaultValue: 'dalian',
            },
            required: true,
        }]
    }]
}

describe('example', () => {
    it('build input type', () => {
        pipe(
            userSchema,
            typeBuild({ isInput: true  }),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/UserInput.ts', content)
            })
        )
    })
    it('build type', () => {
        pipe(
            userSchema,
            typeBuild(),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/User.ts', content)
            })
        )

    })
    it('build valid io', () => {
        pipe(
            userSchema,
            ioBuild(),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/User.io.ts', content)
            })
        )

    })

})




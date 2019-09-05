import model from '../../schema'
import Basic from './fixtures/Basic'
import BasicRequired from './fixtures/BasicRequired'
import Document from './fixtures/Document'
import BasicEnum from './fixtures/BasicEnum'
import { typeBuild } from '../'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { writeFileSync } from 'fs'

describe('typescript', () => {
    it('model', () => {

        pipe(
            model,
            typeBuild({}),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                 return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/Module.ts', content)
            })
        )

    })
    it('input model', () => {
        pipe(
            model,
            typeBuild({ isInput: true }),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/InputModule.ts', content)
            })
        )

    })
    it('basic', () => {
        pipe(
            Basic,
            typeBuild({}),
            result => {
                expect(E.isRight(result)).toBeTruthy()
             
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/Basic.ts', content)
            })
        )
    })
    it('basic Input', () => {
        pipe(
            Basic,
            typeBuild({isInput: true }),
            result => {
                expect(E.isRight(result)).toBeTruthy()
             
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/BasicInput.ts', content)
            })
        )
    })
    it('BasicEnum', () => {
        pipe(
            BasicEnum,
            typeBuild({}),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/BasicEnum.ts', content)
            })
        )
    })
 
    it('BasicRequired', () => {
        pipe(
            BasicRequired,
            typeBuild({}),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/BasicRequired.ts', content)
            })
        )

    })
    it('BasicRequired Input', () => {
        pipe(
            BasicRequired,
            typeBuild({ isInput: true }),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/BasicRequiredInput.ts', content)
            })
        )

    })
    it('Document', () => {
        pipe(
            Document,
            typeBuild({}),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/Document.ts', content)
            })
        )
    })
})




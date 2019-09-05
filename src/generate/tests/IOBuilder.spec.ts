//import Basic from './fixtures/Basic'
import { ioBuild } from '../'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { writeFileSync } from 'fs'
import model from '../../schema'
describe('io', () => {

    it('model', () => {

        pipe(
            model,
            ioBuild({}),
            result => {
                expect(E.isRight(result)).toBeTruthy()
                return result;
            },
            E.map(content => {
                expect(content).toMatchSnapshot()
                writeFileSync(__dirname + '/io.ts', content)
            })
        )
    })
    /*   it('basic', () => {
  
          pipe(
              Basic,
              ioBuild({}),
              result => {
                  if (E.isLeft(result)) {
                      throw new Error(result.left)
                  }
                  return result;
              },
              E.map(content => {
                  expect(content).toMatchSnapshot()
                  writeFileSync(__dirname + '/basic.io.ts', content)
              })
          )
      }) */
    /*   it('print', () => {
          const content=getDataSchema(model);
          expect(content).toMatchSnapshot()
          writeFileSync(__dirname+'/t.ts',content)
      }) */
})




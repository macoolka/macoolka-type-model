import schema from '../../schema'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { writeFileSync } from 'fs'
import { Module } from '../../io'
import {topologicalSort} from '../IOBuild'
it('buildGraph', () => {
    pipe(
        schema,
        Module([]).decode,
      
        as => {
            expect(E.isRight(as)).toBeTruthy();
            return as;
        },
        E.map(a=>{
            pipe(
                a,
                topologicalSort([]),
                as => {
                    expect(E.isRight(as)).toBeTruthy();
                    return as;
                },
                E.map(a=>{
                    writeFileSync(__dirname + '/schema.names.json', JSON.stringify(a.map(b=>b.name)))
                })
                
            )
        }),
       
    )
})
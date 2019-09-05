import { buildGraph, createVis, } from '../graph'
import Basic from './fixtures/Basic'
import schema from '../schema'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { writeFileSync } from 'fs'
import { Module } from '../io'
import _topologicalSort from 'macoolka-algorithms/lib/topologicalSort'
describe('graph', () => {
    it('build Schema Graph', () => {
        pipe(
            schema,
            Module([]).decode,
            as => {
                expect(E.isRight(as)).toBeTruthy();
                return as;
            },
            E.map(a =>
                pipe(
                    buildGraph([])(a),
                    as => {
                        expect(E.isRight(as)).toBeTruthy();
                        
                        return as;
                    },
                    E.map(a => {
                        const result=_topologicalSort(a).map(value=>value.value);
                    
                        writeFileSync(__dirname + '/schema.topologicalSort.json', JSON.stringify(result))
                        writeFileSync(__dirname + '/schema.vis.json', JSON.stringify(createVis(a)))
                       
                        expect(createVis(a)).toMatchSnapshot()
                    })
                ),
            )
        )
    })
   
    it('buildGraph', () => {
        pipe(
            Basic,
            Module([]).decode,
            as => {
                expect(E.isRight(as)).toBeTruthy();
                return as;
            },
            E.map(a =>
                pipe(
                    buildGraph([])(a),
                    as => {
                        expect(E.isRight(as)).toBeTruthy();
                        return as;
                    },
                    E.map(a => {
                        writeFileSync(__dirname + '/vis.json', JSON.stringify(createVis(a)))
                        expect(createVis(a)).toMatchSnapshot()
                    })
                ),
            )
        )
    })
})
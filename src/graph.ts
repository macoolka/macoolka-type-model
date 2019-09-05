
/**
 * @file
 */
import { Graph, GraphVertex, GraphEdge } from 'macoolka-algorithms/lib/graph'
import { MModule, MField, MInterface, MTypeAlias } from './models/Module'
import { isTypeScalar, isTypeUnionScalar } from './predicate'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { foreach } from './helper'
import * as O from 'fp-ts/lib/Option'
import { typeNotFound, typeNameRepeat } from './i18n'
import { MonidI18N, MonidI18NMonoid } from 'macoolka-i18n'
import { fold } from 'fp-ts/lib/Monoid'
import * as E from 'fp-ts/lib/Either'

import * as MF from 'macoolka-app/lib/MonadFunctionSync'
const foldI18NMonoid = fold(MonidI18NMonoid)
/**
 * a simple graph
 * @desczh
 * 一种简单的图结构
 * @since 0.2.0
 */
export interface Vis {
    nodes: Array<{
        id: string,
        label: String
    }>,
    edges: Array<{
        from: string,
        to: string
    }>
}
/**
 * Build Vis from Graph
 * @desczh
 * 用Graph建立Vis
 * @since 0.2.0
 *
 */
export const createVis = (a: Graph): Vis => ({
    nodes: pipe(
        a.getAllVertices(),
        A.map(a => ({ id: a.getKey(), label: a.toString() }))
    ),
    edges: pipe(
        a.getAllEdges(),
        A.map(a => ({
            from: a.startVertex.getKey(),
            to: a.endVertex.getKey()
        }))
    )

})
export const IgnoreNames = ['NonEmptyArray', 'MaybeArray', 'object', 'Date', 'Object']
/**
 * Build Graph with MModule
 * @desczh
 * 用MModule建立Graph
 * @since 0.2.0
 */
export const buildGraph = (ignoreNames: Array<string>): MF.MonadFunctionSync<MModule, Graph> => (as) => {
    ignoreNames = [...IgnoreNames, ...ignoreNames]
    const graphVertexs: Array<GraphVertex<string>> = []
    const graphEdges: Array<GraphEdge<string>> = []
    const errors: Array<MonidI18N> = []
    const addVertex = (name: string) => graphVertexs.map(a => a.getKey()).includes(name)
        ? errors.push(typeNameRepeat({ model: as.name, name }))
        : graphVertexs.push(new GraphVertex(name))

    const addGraphEdge = (from: string, to: string) => {
        if (IgnoreNames.includes(from) || IgnoreNames.includes(to)) {
            return
        }
        const fromOption = pipe(
            graphVertexs,
            A.findFirst(a => a.value === from)

        )
        const toOption = pipe(
            graphVertexs,
            A.findFirst(a => a.value === to)
        )

        pipe(
            fromOption,
            O.map(a => {
                pipe(
                    toOption,
                    O.map(b => {
                        const edge = new GraphEdge(a, b)
                        pipe(
                            graphEdges.every(a => a.getKey() !== edge.getKey()),
                            value => value ? graphEdges.push(edge) : void 0
                        )
                    }),
                    O.getOrElse(() => {

                        errors.push(typeNotFound({ model: as.name, name: to }))
                    })
                )
            }),

            O.getOrElse(() => {
                errors.push(typeNotFound({ model: as.name, name: from }))
            })

        )
    }

    foreach(as, {

        model: (model: MInterface, schema: MModule) => {
            addVertex(model.name)
        },
        typealiases: (a: MTypeAlias, schema: MModule) => {
            addVertex(a.name)

        }

    })

    foreach(as, {

        type: (type: MField['type'], field: MField, model: MInterface, schema: MModule) => {
            pipe(
                type,
                O.fromPredicate(isTypeScalar),
                O.map(a =>

                    addGraphEdge(model.name, a.value)

                )
            )
            pipe(
                type,
                O.fromPredicate(isTypeUnionScalar),
                O.map(a =>
                    pipe(
                        a.values,
                        A.map(type => addGraphEdge(model.name, type))

                    )
                )
            )
        },

        implement: (name: string, model: MInterface, schema: MModule) => {
            addGraphEdge(model.name, name)
        }
    })

    return pipe(
        errors,
        E.fromPredicate(a => a.length === 0, () => foldI18NMonoid(errors)),
        E.map(() => {
            const graph = new Graph(true)
            graphEdges.map(a => graph.addEdge(a))
            graphVertexs.map(a => graph.addVertex(a))
            return graph
        })

    )

}


/**
 * @file
 */
import { Graph, GraphVertex, GraphEdge } from 'macoolka-algorithms/lib/graph'

import { MModule, MField, MInterface, MTypeAlias } from './models/Module'
import { isTypeScalar, isTypeUnionScalar } from './predicate'
import * as  A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { foreach } from './helper'
import * as O from 'fp-ts/lib/Option'
import * as Ord from 'fp-ts/lib/Ord'
import { Message } from './i18n'
import * as E from 'fp-ts/lib/Either'
import _topologicalSort from 'macoolka-algorithms/lib/topologicalSort'
/**
 * a simple graph 
 * @desczh
 * 一种简单的图结构
 */
export interface Vis {
    nodes: {
        id: string,
        label: String,
    }[],
    edges: {
        from: string,
        to: string,
    }[]
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
/**
 * Build Graph with MModule
 * @desczh
 * 用MModule建立Graph
 * @since 0.2.0
 */
export const buildGraph = (as: MModule): E.Either<Message[], Graph> => {
    const graphVertexs: GraphVertex<string>[] = []
    const graphEdges: GraphEdge<string>[] = []
    const errors: Message[] = []

    const addVertex = (name: string) => graphVertexs.map(a => a.getKey()).includes(name)
        ? errors.push({ id: 'macoolka.data-model.typeNameRepeat', value: { model: name, name: '' } })
        : graphVertexs.push(new GraphVertex(name))

    const addGraphEdge = (from: string, to: string) => {
        const fromOption = pipe(
            graphVertexs,
            A.findFirst(a => a.value === from),

        )
        const toOption = pipe(
            graphVertexs,
            A.findFirst(a => a.value === to),
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

                            //    A.every(a => a.getKey() !== edge.getKey()),
                            value => value ? graphEdges.push(edge) : void 0

                        )

                    }),
                    O.getOrElse(() => {
                        errors.push({ id: 'macoolka.data-model.typeNotFound', value: { model: from, name: '' } })
                    })
                )
            }),

            O.getOrElse(() => {
                errors.push({ id: 'macoolka.data-model.typeNotFound', value: { model: from, name: '' } })
            })

        )
    }


    foreach(as, {

        model: (model: MInterface, schema: MModule) => {
            addVertex(model.name)
        },
        typealiases: (a: MTypeAlias, schema: MModule) => {
            addVertex(a.name)

        },

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
        },
    })
    return pipe(
        errors,
        E.fromPredicate(a => a.length === 0, () => errors),
        E.map(() => {
            const graph = new Graph(true);
            graphEdges.map(a => graph.addEdge(a))
            graphVertexs.map(a => graph.addVertex(a))
            return graph
        })
    )

}
export  type IOType = MInterface | MTypeAlias
export const topologicalSort = (a: MModule) => {
   
    let orders: Array<IOType> = [];

    orders = orders.concat(a.interfaces)
    orders = orders.concat(a.typealiases)

    const ordMoudle = (names: string[]): Ord.Ord<IOType> => ({
        equals: (a, b) => a.name === b.name,
        compare: (a, b) => {
            const aIndex = pipe(
                names,
                A.findIndex(name => name === a.name),
                O.getOrElse(() => -1)
            )
            const bIndex = pipe(
                names,
                A.findIndex(name => name === b.name),
                O.getOrElse(() => -1)
            )
            return Ord.ordNumber.compare(bIndex,aIndex)
        }
    })
    const valid = (names: string[]): E.Either<Message[], string[]> => pipe(
        orders,
        A.map(b => {
            return pipe(
                names,
                A.findIndex(name => name === b.name),
                E.fromOption(() => ({ id: 'macoolka.data-model.typeNotFound', value: { value: { model: b.name, name: '' } } as Message }))
            )
        }),
        A.lefts,
        a => a.length > 0 ? E.left(a) : E.right(names),
        b => b as E.Either<Message[], string[]>
    )
    //   orders=a.interfaces
    return pipe(
        a,
        buildGraph,
        E.map(_topologicalSort),
        E.chain(a =>
            pipe(
                a.map(value => value.value),
                valid,
                E.map(names => pipe(
                    names,
                    ordMoudle,
                    A.sort,
                  
                    b => b(orders)
                )),

            )
        )
    )
}

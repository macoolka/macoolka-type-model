import TypeBuild from './TypeBuild'
import IOBuild from './IOBuild'
import { TSOptions, } from './types'
import * as t from '../io'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import { MModule as InputModule } from '../models/InputModule'

export {
    TypeBuild,
    IOBuild,

}

export const typeBuild = (ts?: TSOptions) => (a: InputModule) => {

    return pipe(
        a,
        t.Module.decode,
        E.map(a => {
           return TypeBuild(ts)(a as any)
        }),
    )
}

export const ioBuild = (ts?: TSOptions) => (a: InputModule) => {

    return pipe(
        a,
        t.Module.decode,
        E.map(a => IOBuild(ts)(a as any)),
    )
}

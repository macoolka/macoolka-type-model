/**
 * @file
 */
import TypeBuild from './TypeBuild'
import IOBuild from './IOBuild'
import { TSOptions } from './types'
import * as t from '../io'
import { pipe } from 'fp-ts/lib/pipeable'
import { get } from 'macoolka-object'
import * as E from 'fp-ts/lib/Either'
import { MModule as InputModule } from '../models/InputModule'
import { MonadFunctionSync } from 'macoolka-app/lib/MonadFunctionSync'

export {
    TypeBuild,
    IOBuild
}
/**
 * Build typescript code with InputModule
 * @desczh
 * 用InputModule生成typescript代码
 * @param ts
 * @since 0.2.0
 */
export const typeBuild = (ts?: TSOptions): MonadFunctionSync<InputModule, string> => a => {
    const names = get(ts,'ignoreTypeNames',[])
    return pipe(
        a,
        t.Module(names).decode,
        t.mapI18N,
        E.chain(a => {
            return TypeBuild(ts)(a as any)
        })
    )
}
/**
 * Build io code with InputModule
 * @desczh
 * 用InputModule生成IO代码
 * @param ts
 * @since 0.2.0
 */
export const ioBuild = (ts?: TSOptions): MonadFunctionSync<InputModule, string> => a => {
    const names = get(ts,'ignoreTypeNames',[])
    return pipe(
        a,
        t.Module(names).decode,
        t.mapI18N,
        E.chain(a => IOBuild(ts)(a as any))
    )
}

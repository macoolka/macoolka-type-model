
import { pipe } from 'fp-ts/lib/pipeable'
import { InputModule, ioBuild, typeBuild } from '../index'
import * as MN from 'macoolka-app/lib/MonadNodeSync'
import { writeFileSync } from 'fs'
const userModule: InputModule.MModule = {
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
    it('typeBuild', () => {
        pipe(
            userModule,
            typeBuild({ isInput: true,showDesc:false }),
            MN.map(a => {
                writeFileSync(__dirname + '/example.input.ts', a)
            })
        )
        pipe(
            userModule,
            typeBuild({showDesc:false}),
            MN.map(a => {
                writeFileSync(__dirname + '/example.type.ts', a)
            })
        )
        pipe(
            userModule,
            ioBuild({showDesc:false}),
            MN.map(a => {
                writeFileSync(__dirname + '/example.io.ts', a)
            })
        )
    })
})


//input type conent
/* export interface NonEmptyArray<A> extends Array<A> {
    0: A
}
export type Maybe<T> = null | undefined | T
export type Integer = number
export type JSONDATA = Record<string,any>

export interface User {
  name: string
  id: string
  age?: Maybe<Integer>
  female?: Maybe<boolean>
  city?: Maybe<'dalian' | 'london' | 'newyork' | 'beijing'>
} */



// type content
/* export interface NonEmptyArray<A> extends Array<A> {
    0: A
}
export type Maybe<T> = null | undefined | T
export type Integer = number
export type JSONDATA = Record<string,any>

export interface User {
  name: string
  id: string
  age?: Maybe<Integer>
  female?: Maybe<boolean>
  city: 'dalian' | 'london' | 'newyork' | 'beijing'
} */



//valid funtion
/* import * as t from 'macoolka-io'
export const User =t.intersection([
  t.type({
    name:t.string,
    id:t.string,
    city:t.withDefault(t.keyof({"dalian":"","london":"","newyork":"","beijing":""}),"dalian"),
  })
,  t.partial({
    age:t.int,
    female:t.boolean,
  })
]) */


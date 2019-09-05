
# Quick generate type in TypeScript and validition function

`macoolka-type-model` is a library for define model  in TypeScript.
It easily build a type contain field and method to your Application.
It provide a generation model for type and validition


# Installation

To install the stable version:

```
npm install macoolka-type-model
```


## Consuming macoolka-type-model

Most examples will use the following import syntax:

```ts

import { pipe } from 'fp-ts/lib/pipeable'
import { InputSchema, ioBuild, typeBuild } from 'macoolka-type-model'

const userSchema: InputSchema = {
    name: 'User',
    models: [{
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

const inputUser = pipe(
            userSchema,
            typeBuild({ ts: { isInput: true } }),
       )

//input type conent
export interface NonEmptyArray<A> extends Array<A> {
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
}


const user = pipe(
            userSchema,
            typeBuild(),
       )

// type content
export interface NonEmptyArray<A> extends Array<A> {
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
}


const userValiad = pipe(
            userSchema,
            ioBuild(),
       )

//valid funtion
import * as t from 'macoolka-io'
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
])



```

# License

The MIT License (MIT)

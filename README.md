<p align="center">
  <a href="https://travis-ci.org/macoolka/macoolka-type-model">
    <img src="https://img.shields.io/travis/macoolka/macoolka-type-model/master.svg?style=flat-square" alt="build status" height="20">
  </a>
  <a href="https://david-dm.org/macoolka-type-model">
    <img src="https://img.shields.io/david/macoolka/macoolka-type-model.svg?style=flat-square" alt="dependency status" height="20">
  </a>
  <a href="https://www.npmjs.com/package/macoolka-type-model">
    <img src="https://img.shields.io/npm/dm/macoolka-type-model.svg" alt="npm downloads" height="20">
  </a>
</p>


# Quick generate type in TypeScript and validition function

`macoolka-type-model` is a library for define model in TypeScript.
It easily build a type contain field and method to your Application.
It provide a generation model for type and validition


**Table of contents**

- [Installation](#installation)
- [Documentation](#documentation)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

To install the stable version:

```
npm install macoolka-type-model
```


## Consuming macoolka-type-model

Most examples will use the following import syntax:

```ts
import { pipe } from 'fp-ts/lib/pipeable'
import { InputModule, ioBuild, typeBuild } from 'macoolka-type-model'
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

        pipe(
            userModule,
            typeBuild({ isInput: true,showDesc:false }),
        )

//input type conent

export interface User {
  name: string
  id: string
  age?: number
  female?: boolean
  city?: 'dalian' | 'london' | 'newyork' | 'beijing'
}


        pipe(
            userModule,
            typeBuild({showDesc:false}),
  
        )

// type content

export interface User {
  name: string
  id: string
  age?: number
  female?: boolean
  city: 'dalian' | 'london' | 'newyork' | 'beijing'
}



       pipe(
            userModule,
            ioBuild({showDesc:false}),
        )

//valid funtion
import * as t from 'macoolka-io'
export const User = t.intersection([
  t.type({
    name: t.string,
    id: t.string,
    city: t.withDefault(t.keyof({ dalian: '', london: '', newyork: '', beijing: '' }), 'dalian')
  }),
  t.partial({
    age: t.int,
    female: t.boolean
  })
])



```

# Documentation

- [Docs](https://macoolka.github.io/macoolka-type-model)
- [API Reference](https://macoolka.github.io/macoolka-type-model/docs/Modules)
- [API Reference (中文)](https://macoolka.github.io/macoolka-type-model/docs/模块)


# License

The MIT License (MIT)



---
title: helper.ts
nav_order: 8
parent: Modules
---

# Overview

Type Model helper

---

<h2 class="text-delta">Table of contents</h2>

- [ScalarType (type alias)](#scalartype-type-alias)
- [foreach (function)](#foreach-function)
- [getCompareModelDefinition (function)](#getcomparemodeldefinition-function)
- [getFieldWithID (function)](#getfieldwithid-function)

---

# ScalarType (type alias)

**Signature**

```ts
export type ScalarType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'int'
  | 'datetime'
  | 'kind'
  | 'type'
  | 'typeUnion'
  | 'json'
  | 'typeIntersection'
```

Added in v0.2.0

# foreach (function)

Foreach on MModule

**Signature**

```ts

export const foreach = (schema: MModule, option: {
    schema?: (schema: MModule) => void,
    model?: (model: MInterface, schema: MModule) => void,
    field?: (field: MField, model: MInterface, schema: MModule) => void,
    type?: (type: MField['type'], field: MField, model: MInterface, schema: MModule) => void,
    typealiases?: (e: MTypeAlias, schema: MModule) => void,
    method?: (method: MMethod, model: MInterface, schema: MModule) => void,
    param?: (param: MParam, method: MMethod, model: MInterface, schema: MModule) => void,
    implement?: (name: string, model: MInterface, schema: MModule) => void
}) => ...

```

Added in v0.2.0

# getCompareModelDefinition (function)

**Signature**

```ts

export const getCompareModelDefinition = (a: MInterface) => ...

```

Added in v0.2.0

# getFieldWithID (function)

**Signature**

```ts

export const getFieldWithID = (a: MInterface) => ...

```

Added in v0.2.0

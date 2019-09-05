---
title: helper.ts
nav_order: 8
parent: 模块
---

# 概述

Type Model 帮助函数

---

<h2 class="text-delta">目录</h2>

- [ScalarType (类型)](#scalartype-%E7%B1%BB%E5%9E%8B)
- [foreach (函数)](#foreach-%E5%87%BD%E6%95%B0)
- [getCompareModelDefinition (函数)](#getcomparemodeldefinition-%E5%87%BD%E6%95%B0)
- [getFieldWithID (函数)](#getfieldwithid-%E5%87%BD%E6%95%B0)

---

# ScalarType (类型)

**签名**

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

v0.2.0 中添加

# foreach (函数)

遍历 MModule

**签名**

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

v0.2.0 中添加

# getCompareModelDefinition (函数)

**签名**

```ts

export const getCompareModelDefinition = (a: MInterface) => ...

```

v0.2.0 中添加

# getFieldWithID (函数)

**签名**

```ts

export const getFieldWithID = (a: MInterface) => ...

```

v0.2.0 中添加

---
title: generate/IOBuild.ts
nav_order: 2
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [IOType (类型)](#iotype-%E7%B1%BB%E5%9E%8B)
- [buildTs (函数)](#buildts-%E5%87%BD%E6%95%B0)
- [topologicalSort (函数)](#topologicalsort-%E5%87%BD%E6%95%B0)

---

# IOType (类型)

**签名**

```ts
export type IOType = MInterface | MTypeAlias
```

v0.2.0 中添加

# buildTs (函数)

TSBuild instance with IO

**签名**

```ts

export const buildTs: TSBuild = (option = {}) => (schema) => ...

```

v0.2.0 中添加

# topologicalSort (函数)

IOType 拓扑排序

**签名**

```ts

export const topologicalSort=(ignoreNames:string[]): MF.MonadFunctionSync<MModule, Array<IOType>> => (a) => ...

```

v0.2.0 中添加

---
title: generate/IOBuild.ts
nav_order: 2
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [IOType (type alias)](#iotype-type-alias)
- [buildTs (function)](#buildts-function)
- [topologicalSort (function)](#topologicalsort-function)

---

# IOType (type alias)

**Signature**

```ts
export type IOType = MInterface | MTypeAlias
```

Added in v0.2.0

# buildTs (function)

TSBuild instance with IO

**Signature**

```ts

export const buildTs: TSBuild = (option = {}) => (schema) => ...

```

Added in v0.2.0

# topologicalSort (function)

topological sort IOType in MModule

**Signature**

```ts

export const topologicalSort=(ignoreNames:string[]): MF.MonadFunctionSync<MModule, Array<IOType>> => (a) => ...

```

Added in v0.2.0

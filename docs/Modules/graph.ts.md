---
title: graph.ts
nav_order: 7
parent: Modules
---

# Overview

---

<h2 class="text-delta">Table of contents</h2>

- [Vis (interface)](#vis-interface)
- [IgnoreNames (constant)](#ignorenames-constant)
- [createVis (function)](#createvis-function)

---

# Vis (interface)

a simple graph

**Signature**

```ts
interface Vis {
  edges: Array<{
    from: string
    to: string
  }>
  nodes: Array<{
    id: string
    label: String
  }>
}
```

Added in v0.2.0

# IgnoreNames (constant)

**Signature**

```ts

export const IgnoreNames: string[] = ...

```

Added in v0.2.0

# createVis (function)

Build Vis from Graph

**Signature**

```ts

export const createVis = (a: Graph): Vis => ({
    nodes: pipe(
        a.getAllVertices(),
        A.map(a => ({ id: a.getKey(), label: a.toString() }))
    ),
    edges: pipe(
        a.getAllEdges(),
        A.map(a => ...

```

Added in v0.2.0

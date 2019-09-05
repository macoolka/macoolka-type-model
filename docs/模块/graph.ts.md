---
title: graph.ts
nav_order: 7
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [Vis (接口)](#vis-%E6%8E%A5%E5%8F%A3)
- [IgnoreNames (常量)](#ignorenames-%E5%B8%B8%E9%87%8F)
- [createVis (函数)](#createvis-%E5%87%BD%E6%95%B0)

---

# Vis (接口)

一种简单的图结构

**签名**

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

v0.2.0 中添加

# IgnoreNames (常量)

**签名**

```ts

export const IgnoreNames: string[] = ...

```

v0.2.0 中添加

# createVis (函数)

用 Graph 建立 Vis

**签名**

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

v0.2.0 中添加

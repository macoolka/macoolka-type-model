---
title: generate/index.ts
nav_order: 1
parent: 模块
---

# 概述

---

<h2 class="text-delta">目录</h2>

- [ioBuild (函数)](#iobuild-%E5%87%BD%E6%95%B0)
- [typeBuild (函数)](#typebuild-%E5%87%BD%E6%95%B0)
- [IOBuild (导出)](#iobuild-%E5%AF%BC%E5%87%BA)
- [TypeBuild (导出)](#typebuild-%E5%AF%BC%E5%87%BA)

---

# ioBuild (函数)

用 InputModule 生成 IO 代码

**签名**

```ts

export const ioBuild = (ts?: TSOptions): MonadFunctionSync<InputModule, string> => a => ...

```

v0.2.0 中添加

# typeBuild (函数)

用 InputModule 生成 typescript 代码

**签名**

```ts

export const typeBuild = (ts?: TSOptions): MonadFunctionSync<InputModule, string> => a => ...

```

v0.2.0 中添加

# IOBuild (导出)

**签名**

```ts
TSBuild
```

v0.2.0 中添加

# TypeBuild (导出)

**签名**

```ts
TSBuild
```

v0.2.0 中添加

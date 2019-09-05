---
title: io.ts
nav_order: 9
parent: 模块
---

# 概述

运行时解码/编码系统

---

<h2 class="text-delta">目录</h2>

- [NoValidNameModule (常量)](#novalidnamemodule-%E5%B8%B8%E9%87%8F)
- [Module (函数)](#module-%E5%87%BD%E6%95%B0)
- [mapI18N (函数)](#mapi18n-%E5%87%BD%E6%95%B0)

---

# NoValidNameModule (常量)

Module IO

**签名**

```ts

export const NoValidNameModule: t.Type<IModule, IModule, unknown> = ...

```

v0.2.0 中添加

# Module (函数)

Module IO

**签名**

```ts

export const Module = (ignoreNames: string[]) => new t.Type<IModule, IModule, unknown>(
    'Module',
    (a): a is IModule => InputModule.is(a),
    (b: any, c) => pipe(
        InputModule.validate(b, c),
        E.chain((u: any) => ...

```

v0.2.0 中添加

# mapI18N (函数)

Convart Validation to MonadNodeSync

**签名**

```ts

export const mapI18N = <A>(value: t.Validation<A>): MN.MonadNodeSync<A> => ...

```

v0.2.0 中添加

---
title: generate/validation.ts
nav_order: 6
parent: 模块
---

# 概述

校验 Module

---

<h2 class="text-delta">目录</h2>

- [validateFieldName (函数)](#validatefieldname-%E5%87%BD%E6%95%B0)
- [validateId (函数)](#validateid-%E5%87%BD%E6%95%B0)
- [validateModelName (函数)](#validatemodelname-%E5%87%BD%E6%95%B0)

---

# validateFieldName (函数)

校验 interface 中字段名称的规则

**签名**

```ts

export const validateFieldName: MF.MonadFunctionSync<MInterface, MInterface> = (a) => ...

```

v0.2.0 中添加

# validateId (函数)

校验 interface 中 id 的规则

**签名**

```ts

export const validateId: MF.MonadFunctionSync<MInterface, MInterface> = (a) => ...

```

v0.2.0 中添加

# validateModelName (函数)

校验 Module 中名称的规则

**签名**

```ts

export const validateModelName=(ignoreNames:string[]): MF.MonadFunctionSync<MModule, MModule> => (a) => ...

```

v0.2.0 中添加

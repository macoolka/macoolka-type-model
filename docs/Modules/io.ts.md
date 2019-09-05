---
title: io.ts
nav_order: 9
parent: Modules
---

# Overview

Runtime type system for IO decoding/encoding

---

<h2 class="text-delta">Table of contents</h2>

- [NoValidNameModule (constant)](#novalidnamemodule-constant)
- [Module (function)](#module-function)
- [mapI18N (function)](#mapi18n-function)

---

# NoValidNameModule (constant)

Module IO

**Signature**

```ts

export const NoValidNameModule: t.Type<IModule, IModule, unknown> = ...

```

Added in v0.2.0

# Module (function)

Module IO

**Signature**

```ts

export const Module = (ignoreNames: string[]) => new t.Type<IModule, IModule, unknown>(
    'Module',
    (a): a is IModule => InputModule.is(a),
    (b: any, c) => pipe(
        InputModule.validate(b, c),
        E.chain((u: any) => ...

```

Added in v0.2.0

# mapI18N (function)

Convart Validation to MonadNodeSync

**Signature**

```ts

export const mapI18N = <A>(value: t.Validation<A>): MN.MonadNodeSync<A> => ...

```

Added in v0.2.0

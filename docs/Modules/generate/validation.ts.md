---
title: generate/validation.ts
nav_order: 6
parent: Modules
---

# Overview

Validate Module

---

<h2 class="text-delta">Table of contents</h2>

- [validateFieldName (function)](#validatefieldname-function)
- [validateId (function)](#validateid-function)
- [validateModelName (function)](#validatemodelname-function)

---

# validateFieldName (function)

Validate field id in interface

**Signature**

```ts

export const validateFieldName: MF.MonadFunctionSync<MInterface, MInterface> = (a) => ...

```

Added in v0.2.0

# validateId (function)

Validate field id in interface

**Signature**

```ts

export const validateId: MF.MonadFunctionSync<MInterface, MInterface> = (a) => ...

```

Added in v0.2.0

# validateModelName (function)

Validate name rule in module

**Signature**

```ts

export const validateModelName=(ignoreNames:string[]): MF.MonadFunctionSync<MModule, MModule> => (a) => ...

```

Added in v0.2.0

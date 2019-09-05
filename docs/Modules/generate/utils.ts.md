---
title: generate/utils.ts
nav_order: 5
parent: Modules
---

# Overview

Helper fro print code

---

<h2 class="text-delta">Table of contents</h2>

- [CodeOption (interface)](#codeoption-interface)
- [NodeGroup (interface)](#nodegroup-interface)
- [formatCode (function)](#formatcode-function)

---

# CodeOption (interface)

**Signature**

```ts
interface CodeOption {
  /**
   *Get empty string with a indent unit
   */
  indentMake?: (i: number) => string
  /**
   *Hard line
   */
  line?: string
}
```

Added in v0.2.0

# NodeGroup (interface)

The define a block node

**Signature**

```ts
interface NodeGroup {
  /**
   *Block begin content
   */
  begin: string
  /**
   *children node content
   */
  content: Array<string>
  /**
   *Block end content
   */
  end: string
  /**
   *indent to root
   */
  indent: number
  /**
   *content's split
   */
  split?: string
}
```

Added in v0.2.0

# formatCode (function)

The provide a helper about build `block` `line` `item` document.
Block containers head and content and end
Line mean a statement
Item maen a statement and description

**Signature**

```ts

export const formatCode = ({
    indentMake = standIndent,
    line = '\n'
}: CodeOption) => ...

```

Added in v0.2.0

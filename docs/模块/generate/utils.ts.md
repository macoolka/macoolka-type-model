---
title: generate/utils.ts
nav_order: 5
parent: 模块
---

# 概述

打印代码的帮助函数

---

<h2 class="text-delta">目录</h2>

- [CodeOption (接口)](#codeoption-%E6%8E%A5%E5%8F%A3)
- [NodeGroup (接口)](#nodegroup-%E6%8E%A5%E5%8F%A3)
- [formatCode (函数)](#formatcode-%E5%87%BD%E6%95%B0)

---

# CodeOption (接口)

**签名**

```ts
interface CodeOption {
  /**
   *用缩进单位得到空文本
   */
  indentMake?: (i: number) => string
  /**
   *换行符号
   */
  line?: string
}
```

v0.2.0 中添加

# NodeGroup (接口)

定义一个代码块

**签名**

```ts
interface NodeGroup {
  /**
   *开始内容
   */
  begin: string
  /**
   *主体内容
   */
  content: Array<string>
  /**
   *结束内容
   */
  end: string
  /**
   *缩进
   */
  indent: number
  /**
   *主体内容分隔符
   */
  split?: string
}
```

v0.2.0 中添加

# formatCode (函数)

提供一些帮助方法在建立`block` `line` `item`

block 包含头尾内容，一般用于 interface
line 是一条语句
item 是包含注释的语句

**签名**

```ts

export const formatCode = ({
    indentMake = standIndent,
    line = '\n'
}: CodeOption) => ...

```

v0.2.0 中添加

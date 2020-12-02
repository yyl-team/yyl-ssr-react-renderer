# yyl-ssr-react-renderer

用于 yyl-ssr 的 服务端 react 渲染

## 安装

```bash
# yarn
yarn add yyl-ssr-react-renderer
# npm
npm i yyl-ssr-react-renderer --save
```

## 使用

```typescript
import React from 'react'
import { Routes } from '~/router/index'

interface PageProps {}

const pageProps: PageProps = {}
render<PageProps>({
  title: '我是 title',
  description: '我是 描述',
  keywords: '我是关键字',
  tplPath: 'path/to/tpl.html',
  props: pageProps
})
```

## types

直接看 types 吧

```typescript
/// <reference types="react" />
/** render option */
export interface RendererOption<P = {}> {
  /** 全局变量属性名 */
  propsName?: string
  /** pageProps */
  props: P
  /** 页面标题 */
  title: string
  /** 页面描述 */
  description?: string
  /** 页面关键字 */
  keywords?: string
  /** 入口文件 */
  tplPath: string
  /** 页面url */
  url: string
  /** 路由 basename */
  basename: string
  /** client 通用路由部分 */
  Routes(): JSX.Element
}
/** 页面初始化 */
export declare function renderer<P = {}>(op: RendererOption<P>): string
```

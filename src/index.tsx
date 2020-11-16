import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter as Router } from 'react-router'

/** 标题 reg */
const TITLE_REG = /(<title>)[^<]*(<\/title>)/
/** 描述 reg */
const DESC_REG = /(<meta [^>]*name\s*=['"]description['"][^>]*>)/
/** 关键字 reg */
const KEYWORD_REG = /(<meta [^>]*name\s*=['"]keywords['"][^>]*>)/
/** 模板 reg */
const SERVER_RENDER_REG = /(\s\n\t\r)*\{#serverRender\}(\s\n\t\r)*<\/div>/

function formatDescTag(desc: string) {
  return `<meta name='description' content='${desc}' />`
}

function formatKeywordsTag(keywords: string) {
  return `<meta name='keywords' content='${keywords}' />`
}

/** render option */
export interface RendererOption<P = {}> {
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
export function renderer<P = {}>(op: RendererOption<P>) {
  const globalAny: any = global
  const { props, title, keywords, description, tplPath, url, basename, Routes } = op
  const entryHtmlPath = tplPath

  // jsdom
  globalAny.pageProps = props

  if (fs.existsSync(entryHtmlPath)) {
    let html = fs.readFileSync(entryHtmlPath).toString()
    const App = (
      <Router location={url} basename={basename}>
        <Routes />
      </Router>
    )
    html = html
      .replace(TITLE_REG, `$1${title}$2`)
      .replace(DESC_REG, formatDescTag(description || title))
      .replace(KEYWORD_REG, formatKeywordsTag(keywords || title))
      .replace(
        SERVER_RENDER_REG,
        `${ReactDOM.renderToString(App)}</div><script>window.pageProps = ${JSON.stringify(
          props
        )}</script>`
      )
    return html
  } else {
    return '404'
  }
}

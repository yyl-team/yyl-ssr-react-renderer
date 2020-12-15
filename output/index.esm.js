/*!
 * yyl-ssr-react-renderer esm 0.1.5
 * (c) 2020 - 2020 jackness
 * Released under the MIT License.
 */
import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { JSDOM } from 'jsdom';

/** 标题 reg */
const TITLE_REG = /(<title>)[^<]*(<\/title>)/;
/** 描述 reg */
const DESC_REG = /(<meta [^>]*name\s*=['"]description['"][^>]*>)/;
/** 关键字 reg */
const KEYWORD_REG = /(<meta [^>]*name\s*=['"]keywords['"][^>]*>)/;
/** 模板 reg */
const SERVER_RENDER_REG = /(\s\n\t\r)*\{#serverRender\}(\s\n\t\r)*<\/div>/;
function formatDescTag(desc) {
    return `<meta name='description' content='${desc}' />`;
}
function formatKeywordsTag(keywords) {
    return `<meta name='keywords' content='${keywords}' />`;
}
const { window } = new JSDOM();
/** 页面初始化 */
function renderer(op) {
    const globalAny = global;
    const { props, title, keywords, description, tplPath, url, basename, Routes, propsName = 'pageProps' } = op;
    const entryHtmlPath = tplPath;
    // jsdom
    globalAny[propsName] = props;
    globalAny.window = window;
    global.document = window.document;
    if (fs.existsSync(entryHtmlPath)) {
        let html = fs.readFileSync(entryHtmlPath).toString();
        const App = (React.createElement(StaticRouter, { location: url, basename: basename },
            React.createElement(Routes, null)));
        html = html
            .replace(TITLE_REG, `$1${title}$2`)
            .replace(DESC_REG, formatDescTag(description || title))
            .replace(KEYWORD_REG, formatKeywordsTag(keywords || title))
            .replace(SERVER_RENDER_REG, `${ReactDOM.renderToString(App)}</div><script>window.${propsName} = ${JSON.stringify(props)}</script>`);
        return html;
    }
    else {
        return '404';
    }
}

export { renderer };

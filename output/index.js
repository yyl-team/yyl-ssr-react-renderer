/*!
 * yyl-ssr-react-renderer cjs 0.1.0
 * (c) 2020 - 2020 jackness
 * Released under the MIT License.
 */
"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("fs")),t=e(require("react")),n=e(require("react-dom/server")),a=require("react-router");const i=/(<title>)[^<]*(<\/title>)/,o=/(<meta [^>]*name\s*=['"]description['"][^>]*>)/,s=/(<meta [^>]*name\s*=['"]keywords['"][^>]*>)/,c=/(\s\n\t\r)*\{#serverRender\}(\s\n\t\r)*<\/div>/;exports.renderer=function(e){const l=global,{props:u,title:p,keywords:d,description:m,tplPath:f,url:y,basename:v,Routes:$}=e,g=f;if(l.pageProps=u,r.existsSync(g)){let e=r.readFileSync(g).toString();const l=t.createElement(a.StaticRouter,{location:y,basename:v},t.createElement($,null));return e=e.replace(i,`$1${p}$2`).replace(o,(S=m||p,`<meta name='description' content='${S}' />`)).replace(s,function(e){return`<meta name='keywords' content='${e}' />`}(d||p)).replace(c,`${n.renderToString(l)}</div><script>window.pageProps = ${JSON.stringify(u)}<\/script>`),e}return"404";var S};

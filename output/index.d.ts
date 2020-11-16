/// <reference types="react" />
/** render option */
export interface RendererOption<P = {}> {
    /** pageProps */
    props: P;
    /** 页面标题 */
    title: string;
    /** 页面描述 */
    description?: string;
    /** 页面关键字 */
    keywords?: string;
    /** 入口文件 */
    tplPath: string;
    /** 页面url */
    url: string;
    /** 路由 basename */
    basename: string;
    /** client 通用路由部分 */
    Routes(): JSX.Element;
}
/** 页面初始化 */
export declare function renderer<P = {}>(op: RendererOption<P>): string;

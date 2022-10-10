import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import { basicRoutes } from './routes';
import {App} from "vue";

const WHITE_NAME_LIST: string[] = [];


export const router = createRouter({
    // 创建一个 hash 历史记录。
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    // 应该添加到路由的初始路由列表。
    routes: basicRoutes as unknown as RouteRecordRaw[],
    // 是否应该禁止尾部斜杠。默认为假
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name && !WHITE_NAME_LIST.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}


// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
    app.use(router);
}

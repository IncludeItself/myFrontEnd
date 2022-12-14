import {PluginOption} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import purgeIcons from 'vite-plugin-purge-icons';
import windiCSS from 'vite-plugin-windicss';
import VitePluginCertificate from 'vite-plugin-mkcert';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import {configMockPlugin} from './mock';


export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const {
        VITE_USE_IMAGEMIN,
        VITE_USE_MOCK,
        VITE_LEGACY,
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    } = viteEnv;

    const vitePlugins: (PluginOption | PluginOption[])[] = [
        // have to
        vue(),
        // have to
        vueJsx(),
        // support name
        // vueSetupExtend(),
        VitePluginCertificate({
            source: 'coding',
        }),
    ];

    // vite-plugin-windicss
    vitePlugins.push(windiCSS());

    // vite-plugin-mock
    VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

    // vite-plugin-purge-icons
    vitePlugins.push(purgeIcons());


    return vitePlugins;


}

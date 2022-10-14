import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
import {resolve} from "path";
import { wrapperEnv } from './build/utils';
import {createVitePlugins} from "./build/vite/plugin";

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const root = process.cwd();

const env = loadEnv(mode, root);

// The boolean type read by loadEnv is a string. This function can be converted to boolean type
const viteEnv = wrapperEnv(env);

const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

const isBuild = command === 'build';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: createVitePlugins(viteEnv, isBuild),
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      // /@/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
  optimizeDeps: {
    // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    include: [
      // '@vue/runtime-core',
      // '@vue/shared',
      // '@iconify/iconify',
      // 'naive-ui/es/locales',
    ],
  },
})

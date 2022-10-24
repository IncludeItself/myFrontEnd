//项目配置
import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  TransitionSetting,
  MultiTabsSetting, ThemeOverrides,
} from '#/config';
import type { BeforeMiniState } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { ThemeEnum } from '@/enums/appEnum';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY,APP_THEMEOVERRIDES_KEY } from '@/enums/cacheEnum';
import {APP_PRESET_COLOR_LIST} from "@/settings/designSetting";
import { Persistent } from '@/utils/cache/persistent';
import {darkMode} from '@/settings/designSetting';
import { resetRouter } from '@/router';
import { deepMerge } from '@/utils';
import {lighten} from "@/utils/color";

interface AppState {
  //吴鑫峰加的，naive用的
  themeOverrides:DeepPartial<ThemeOverrides>| null;

  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

const PrimaryColor=APP_PRESET_COLOR_LIST[1];
const defaultOverrides:DeepPartial<ThemeOverrides>={
  common:{
    primaryColor:PrimaryColor,
    primaryColorHover: lighten(PrimaryColor,6),
    primaryColorPressed: lighten(PrimaryColor,7),
  },
  LoadingBar:{
    colorLoading: PrimaryColor
  }
};

let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    themeOverrides:Persistent.getLocal(APP_THEMEOVERRIDES_KEY)||defaultOverrides,
    darkMode: undefined, // 主题模式  dark|light
    pageLoading: false, //  页面加载状态
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY), //  属性用于配置项目内展示的内容、布局、文本等效果，具体配置文件路径
    beforeMiniInfo: {}, //  属性用于当窗口缩小时记住菜单状态，并在恢复窗口时恢复这些状态（是否折叠、是否分割、类型、模式）
  }),
  getters: {
    getThemeOverrides():DeepPartial<ThemeOverrides>{
      return this.themeOverrides || {};
    },
    // 页面加载状态
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    // 主题模式
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    // 菜单状态快照
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    // 项目配置
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    // 头部配置
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    // 菜单配置
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    // 动画配置
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    // 多标签配置
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    setThemeOverrides(theme: DeepPartial<ThemeOverrides>){
      this.themeOverrides = deepMerge(this.themeOverrides || {}, theme);
      Persistent.setLocal(APP_THEMEOVERRIDES_KEY, this.themeOverrides);
    },
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },
    // 设置项目配置 项目自带的缓存类进行缓存操作
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    // 重置路由
    async resetAllState() {
      resetRouter();
      Persistent.clearAll(); // 清空缓存
    },
    // 使用定时器设置页面加载状态
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}

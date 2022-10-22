import {designSetting} from '#/config';

import {defineStore} from 'pinia';
import {store} from '@/store';

import {APP_DARKTHEME_KEY, APP_THEMEOVERRIDES_KEY} from '@/enums/cacheEnum';
import {createLocalStorage} from '@/utils/cache';
import {PrimaryColor, DarkTheme} from '@/settings/designSetting';
import {lighten} from "@/utils/color";
import {deepMerge} from "@/utils";
import {darkTheme, GlobalTheme, lightTheme} from "naive-ui";

const ls = createLocalStorage();

const acheTheme = ls.get(APP_DARKTHEME_KEY) || DarkTheme;
const themeOverrides=ls.get(APP_THEMEOVERRIDES_KEY);

interface DesignState{
  darkTheme:Boolean,
  themeOverrides: designSetting;
}

export const useDesignStore = defineStore('app-design',{
  state: (): DesignState => ({
    darkTheme:acheTheme||false,
    themeOverrides
  }),
  getters: {
    getDarkTheme(): Boolean {
      return this.darkTheme;
    },
    getThemeOverrides(): designSetting {
      if(this.themeOverrides?.common?.primaryColor){
        return this.themeOverrides;
      }
      const defaultOverrides={
        common:{
          primaryColor:PrimaryColor,
          primaryColorHover: lighten(PrimaryColor,6),
          primaryColorPressed: lighten(PrimaryColor,7),
        },
        LoadingBar:{
          colorLoading: PrimaryColor
        }
      };
      return deepMerge(this.themeOverrides||{},defaultOverrides);
    },
    getNaiveTheme():GlobalTheme{
      return this.darkTheme?darkTheme:lightTheme;
    }

  },
  actions: {

    setDarkTheme(theme: Boolean) {
      this.darkTheme = theme;
      ls.set(APP_DARKTHEME_KEY, this.darkTheme);
    },
    setThemeOverrides(change:Partial<designSetting>){
      this.themeOverrides=deepMerge(this.themeOverrides,change);
      ls.set(APP_THEMEOVERRIDES_KEY, this.themeOverrides);
    }

    // initLocale() {
    //   this.setLocaleInfo({
    //     ...localeSetting,
    //     ...this.localInfo,
    //   });
    // },
  },
});

// Need to be used outside the setup
export function useDesignStoreWithOut() {
  return useDesignStore(store);
}

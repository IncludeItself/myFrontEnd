import type { LocaleSetting,LocaleType,DateLocaleType } from '#/config';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { LOCALE_KEY } from '@/enums/cacheEnum';
import { createLocalStorage } from '@/utils/cache';
import {DATELOCALE, LOCALE, localeSetting} from '@/settings/localeSetting';
import {dateEnUS, enUS, NDateLocale, NLocale} from "naive-ui";

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
  globalLocale:NLocale;
  globalDateLocale:NDateLocale;
}

export const useLocaleStore = defineStore('app-locale',{
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
    globalLocale:enUS,
    globalDateLocale:dateEnUS
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? LOCALE.EN_US;
    },
    getDateLocale(): DateLocaleType {
      return this.localInfo?.dateLocale ?? DATELOCALE.EN_US;
    },
    getGlobalLocale():NLocale{
      return this.globalLocale;
    },
    getGlobalDateLocale():NDateLocale{
      return this.globalDateLocale;
    }
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      ls.set(LOCALE_KEY, this.localInfo);
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    setGlobalLocale(locale:NLocale){
      this.globalLocale=locale;
    },
    setGlobalDateLocale(dateLocale:NDateLocale){
      this.globalDateLocale=dateLocale;
    },
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}

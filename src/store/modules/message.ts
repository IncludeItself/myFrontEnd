import {NewMessage} from "#/store";

import { defineStore } from 'pinia';
import { store } from '@/store';

import { LOCALE_KEY } from '@/enums/cacheEnum';
import { createLocalStorage } from '@/utils/cache';
import {DATELOCALE, LOCALE, localeSetting} from '@/settings/localeSetting';
import {dateEnUS, enUS, NDateLocale, NLocale} from "naive-ui";

const ls = createLocalStorage();

// const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface MessageState {
  newMessage:NewMessage

}

export const useMessageStore = defineStore('app-message',{
  state: (): MessageState => ({
    newMessage:{} as NewMessage
  }),
  getters: {
    getNewMessage():NewMessage{
      return this.newMessage;
    }

  },
  actions: {
    setNewMessage(msg:NewMessage){
      this.newMessage=msg;
    }

  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useMessageStore(store);
}

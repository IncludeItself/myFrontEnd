import { defineStore } from 'pinia';
import { store } from '@/store';
import type {MessageOptions, MessageType, NotificationOptions} from "naive-ui";
import {VNodeChild} from "vue";
import {MessageApiInjection} from "naive-ui/es/message/src/MessageProvider";
import {NotificationApiInjection} from "naive-ui/es/notification/src/NotificationProvider";


interface MessageState {
  messageFn:MessageApiInjection|null;
  notificationFn:NotificationApiInjection|null;
}

export const useMessage = defineStore('app-message',{
  state: (): MessageState => ({
    messageFn:null,
    notificationFn:null
  }),
  // getters: {
  //   getMessageFn():MessageFn{
  //     return this.messageFn;
  //   }
  //
  // },
  actions: {
    setMessageFn(fn:MessageApiInjection){
      this.messageFn=fn;
    },
    setNotificationFn(fn:NotificationApiInjection){
      this.notificationFn=fn;
    },
    error(opt:NotificationOptions){
      if(this.notificationFn){
        this.notificationFn['error'](opt);
      }

    },
    info(opt:NotificationOptions){
      if(this.notificationFn) {
        this.notificationFn['info'](opt);
      }
    },
    loading(content: string | (() => VNodeChild), option?: MessageOptions){
      if(this.messageFn) {
        this.messageFn['loading'](content, option);
      }
    },
    success(opt:NotificationOptions){
      if(this.notificationFn) {
        this.notificationFn['success'](opt);
      }
    },
    warning(opt:NotificationOptions){
      if(this.notificationFn) {
        this.notificationFn['warning'](opt);
      }
    }

  },
});

// Need to be used outside the setup
export function useMessageWithOut() {
  return useMessage(store);
}

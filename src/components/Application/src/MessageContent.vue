<template></template>
<script lang="ts">
import {defineComponent} from 'vue';
import { useMessage, useNotification} from "naive-ui";
import {useMessage as useMessageStore} from "@/store/modules/message";

export default defineComponent({
  name: "MessageContent",

  setup() {
    const createNotification = useNotification();
    const createMessage = useMessage();
    const messageStore=useMessageStore();
    messageStore.setMessageFn(createMessage);
    messageStore.setNotificationFn(createNotification);
    return {

    }

    // window['$message'] = (type: MessageType = 'info', content: string | (() => VNodeChild)) => {
    //   switch (type) {
    //     case 'error':
    //       createNotification[type]({content});
    //       break;
    //     case 'info':
    //       createNotification[type]({content});
    //       break;
    //     case 'loading':
    //       createMessage[type](content);
    //       break;
    //     case 'success':
    //       createNotification[type]({content});
    //       break;
    //     case 'warning':
    //       createNotification[type]({content});
    //       break;
    //   }
    //
    // };

  }

});
</script>

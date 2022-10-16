<template>
  <div class="p-5">
    多层级缓存-页面2
    <br />
    <NInput />
    <NButton @click="handleClick">点我showMessage</NButton>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NInput ,NButton} from 'naive-ui';
  import {useMessage} from "@/store/modules/message";
  const createMessage=useMessage();
  export default defineComponent({
    name: 'Menu2Demo',
    components: { NInput,NButton },
    setup(){
      // const useMessage=window['$message'];
      const handleClick=()=>{
        createMessage.success({content:'测试成功？'});
      };
      return {
        handleClick
      }
    }
  });
</script>

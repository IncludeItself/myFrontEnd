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
  import { NInput ,NButton,NIcon} from 'naive-ui';
  import {useMessage} from "@/store/modules/message";
  const createMessage=useMessage();
  export default defineComponent({
    name: 'Menu2Demo',
    components: { NInput,NButton,NIcon },
    setup(){
      // const useMessage=window['$message'];
      const handleClick=()=>{
        createMessage.success({content:'测试成功？'});

      };
      let iconCom;
      import('@vicons/ionicons5/TvOutline.js').then((a)=>{iconCom=a.default.name;});
      return {
        handleClick,
        iconCom
      }
    }
  });
</script>

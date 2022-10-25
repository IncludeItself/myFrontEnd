<template>
  <div class="p-5">
    多层级缓存-页面2
    <br />
    <NInput />
    <NButton @click="handleClick">点我showMessage</NButton>
    <Icon icon="ant-design:login-outlined" size="50px"/>
    <div style="height: 100px;width: 200px;background-color: #535bf2" >
      <div class="mx-auto" style="height: 10px;width: 20px;background-color: blueviolet">
        <n-button >ytyt</n-button>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import {NInput, NButton, NIcon} from 'naive-ui';
  import {useMessage} from "@/store/modules/message";
  import Icon from "@/components/Icon";
  const createMessage=useMessage();
  export default defineComponent({
    name: 'Menu2Demo',
    components: {Icon, NInput,NButton,NIcon },
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

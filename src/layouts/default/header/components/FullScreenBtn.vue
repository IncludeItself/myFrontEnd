<template>
  <n-button text style="outline: 0px;margin-left: 10px" :focusable="false" ghost @click="toggle">
    <template #icon>
      <Icon :icon="isFullscreen?'codicon:screen-normal':'codicon:screen-full'"/>
    </template>
  </n-button>
</template>

<script lang="ts">
import {defineComponent, unref, watch} from 'vue';
import {NButton} from 'naive-ui';
import Icon from '@/components/Icon';
import { useFullscreen } from '@vueuse/core';
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";
import {useHeaderSetting} from "@/hooks/setting/useHeaderSetting";
import {triggerWindowResize} from "@/utils/event";

export default defineComponent({
  name: "FullScreenBtn",
  components:{NButton,Icon},
  setup() {
    const { toggle, isFullscreen } = useFullscreen();
    const { setMenuSetting } = useMenuSetting();
    const { setHeaderSetting } = useHeaderSetting();

    watch(isFullscreen,(v)=>{
      setMenuSetting({
        show: !unref(v),
        hidden: unref(v),
      });
      setHeaderSetting({ show: !unref(v) });
      // triggerWindowResize();
    },{immediate:true})

    return {
      isFullscreen,
      toggle,
    };
  }

});
</script>

<style scoped>

</style>

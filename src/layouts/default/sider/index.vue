<template>
  <n-layout-sider
      :native-scrollbar="false"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
      v-if="!getIsTopMenu"
  >
    <LayoutMenu v-if="!collapsed" :collapsed="collapsed"/>
    <LayoutMixSider v-else/>
  </n-layout-sider>

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {NLayoutSider} from 'naive-ui'
import LayoutMenu from "@/layouts/default/menu/index.vue";
import LayoutMixSider from "@/layouts/default/sider/MixSider.vue";
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';

export default defineComponent({
  name: "LayoutSideBar",
  components: {LayoutMixSider, LayoutMenu, NLayoutSider},
  setup() {
    const collapsed = ref<boolean>(false);
    const { getIsTopMenu} = useMenuSetting();
    collapsed.value=false;
    return {
      collapsed,
      getIsTopMenu
    };
  }
});
</script>

<style lang="less" scoped>

</style>

<template>
  <n-layout-sider
      position="absolute"
      width="auto"
      bordered
      :native-scrollbar="false"
      collapse-mode="width"
      :collapsed-width="64"
  >
    <SideMenu v-if="!collapsed"/>
    <LayoutMixSider v-else/>
  </n-layout-sider>

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {NLayoutSider} from 'naive-ui'
import SideMenu from "@/components/Menu/src/SideMenu.vue";
import LayoutMixSider from "@/layouts/default/sider/MixSider.vue";

export default defineComponent({
  name: "SiderWrapper",
  components: {LayoutMixSider, SideMenu, NLayoutSider},
  setup() {
    const collapsed = ref<boolean>(false);
    collapsed.value=true;
    return {
      collapsed
    };
  }
});
</script>

<style lang="less" scoped>

</style>

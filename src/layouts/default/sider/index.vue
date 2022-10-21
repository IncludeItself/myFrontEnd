<template>
  <n-layout-sider
      position="absolute"
      width="auto"
      bordered
      :native-scrollbar="false"
      :inverted="true"
      show-trigger="bar"
      @collapse="collapsed = true"
      collapse-mode="width"
      :collapsed-width="64"
  >
    <SideMenu/>
  </n-layout-sider>

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {NLayoutSider} from 'naive-ui'
import SideMenu from "@/components/Menu/src/SideMenu.vue";

export default defineComponent({
  name: "SiderWrapper",
  components: {SideMenu, NLayoutSider},
  setup() {
    const collapsed = ref<boolean>(false);
    return {
      collapsed
    };
  }
});
</script>

<style lang="less" scoped>

</style>

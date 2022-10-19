<template>
  <!--  <NLayoutSider class="layout-sider" :inverted="true" width="50px">-->

  <!--    <div>asdfasdf</div>-->

  <!--  </NLayoutSider>-->
  <n-layout-sider position="absolute" class="layout-sider" width="auto" bordered>
    <SideMenu/>
  </n-layout-sider>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NLayoutSider} from 'naive-ui'
import SideMenu from "@/components/Menu/src/SideMenu.vue";

export default defineComponent({
  name: "SiderWrapper",
  components: {SideMenu, NLayoutSider},
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.layout-sider {
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  position: relative;
  transition: all 0.2s ease-in-out;
  padding-top: 35px;
}

</style>

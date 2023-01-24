<template>
  <n-layout-sider
      :native-scrollbar="false"
      collapse-mode="width"
      :collapsed-width="getRealWidth"
      :width="getRealWidth"
      :collapsed="getCollapsed"
      show-trigger
      @collapse="collapse(true)"
      @expand="collapse(false)"
      v-if="!getIsTopMenu"
  >
    <LayoutMenu v-if="!getCollapsed&&!getIsMixSidebar" :collapsed="getCollapsed"/>
    <MixMenu v-else/>
  </n-layout-sider>
</template>

<script lang="ts">
import {computed, defineComponent, ref, unref} from "vue";
import {NLayoutSider} from 'naive-ui'
import LayoutMenu from "@/layouts/default/menu/index.vue";
import {MixMenu} from "@/components/Menu";
import {useMenuSetting} from '@/hooks/setting/useMenuSetting';
import SimpleMenu from "@/components/SimpleMenu/src/SimpleMenu.vue";
import {SIDE_BAR_SHOW_TIT_MINI_WIDTH} from "@/enums/appEnum";
import {MenuTypeEnum} from "@/enums/menuEnum";

export default defineComponent({
  name: "LayoutSideBar",
  components: {SimpleMenu, MixMenu, LayoutMenu, NLayoutSider},
  setup() {
    const {getIsTopMenu, getCollapsed, setMenuSetting, getIsMixSidebar,getMixSideFixed,getRealWidth} = useMenuSetting();
    const getMixSideWidth = SIDE_BAR_SHOW_TIT_MINI_WIDTH;

    function collapse(b: boolean | undefined) {
      if (b == true) {
        setMenuSetting({
          collapsed: true,
          mixSideFixed: false,
          type:MenuTypeEnum.MIX_SIDEBAR
        });
      } else {
        setMenuSetting({
          collapsed: false,
          mixSideFixed: false,
          type:MenuTypeEnum.SIDEBAR
        });
      }

    }

    return {
      getIsTopMenu,
      getCollapsed,
      getMixSideWidth,
      getIsMixSidebar,
      getMixSideFixed,
      getRealWidth,
      collapse
    };
  }
});
</script>

<style lang="less" scoped>

</style>

<template>
  <n-layout-sider
      :native-scrollbar="false"
      collapse-mode="width"
      :collapsed-width="getMiniWidthNumber"
      :width="getMixSideFixed?getMiniWidthNumber+getMenuWidth:getMenuWidth"
      :collapsed="getCollapsed||(getIsMixSidebar&&!getMixSideFixed)"
      :show-trigger="!(openMenu&&!getMixSideFixed)"
      @collapse="collapse(true)"
      @expand="collapse(false)"
      v-if="!getIsTopMenu"
      inverted
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
import {MenuTypeEnum} from "@/enums/menuEnum";
import {useTrigger} from "./useLayoutSider";
import {useAppInject} from "@/hooks/web/useAppInject";
import {openMenu} from "./useLayoutSider";

export default defineComponent({
  name: "LayoutSideBar",
  components: {SimpleMenu, MixMenu, LayoutMenu, NLayoutSider},
  setup() {
    const {
      getIsTopMenu,
      getCollapsed,
      getMenuWidth,
      setMenuSetting,
      getIsMixSidebar,
      getMixSideFixed,
      getMiniWidthNumber
    } = useMenuSetting();

    const { getIsMobile } = useAppInject();

    const { getTriggerAttr, getShowTrigger } = useTrigger(getIsMobile);

    function collapse(b: boolean | undefined) {
      if (b == true) {
        setMenuSetting({
          collapsed: true,
          mixSideFixed: false,
          type: MenuTypeEnum.MIX_SIDEBAR
        });
      } else {
        setMenuSetting({
          collapsed: false,
          mixSideFixed: false,
          type: MenuTypeEnum.SIDEBAR
        });
      }

    }



    return {
      getIsTopMenu,
      getCollapsed,
      getIsMixSidebar,
      getMixSideFixed,
      getMiniWidthNumber,
      collapse,
      getMenuWidth,
      getShowTrigger,
      openMenu
    };
  }
});
</script>

<style lang="less" scoped>

</style>

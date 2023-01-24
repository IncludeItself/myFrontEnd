<template>
  <n-layout-sider
      :native-scrollbar="false"
      collapse-mode="width"
      :collapsed-width="getMixSideWidth"
      :width="220"
      :collapsed="getCollapsed"
      show-trigger
      @collapse="collapse(true)"
      @expand="collapse(false)"
      v-if="!getIsTopMenu"
  >
    <LayoutMenu v-if="!getCollapsed" :collapsed="getCollapsed"/>
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
import {SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH} from "@/enums/appEnum";

export default defineComponent({
  name: "LayoutSideBar",
  components: {SimpleMenu, MixMenu, LayoutMenu, NLayoutSider},
  setup() {
    const {getIsTopMenu,getCollapsed,setMenuSetting} = useMenuSetting();
    const getMixSideWidth = computed(() => {
      return unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH;
    });

    function collapse(b:boolean | undefined) {
      setMenuSetting({
        collapsed: b,
      });
    }

    return {
      getIsTopMenu,
      getCollapsed,
      getMixSideWidth,
      collapse
    };
  }
});
</script>

<style lang="less" scoped>

</style>

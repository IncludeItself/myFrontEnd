<template>
  <n-layout class="layout" position="absolute" has-sider>
    <LayoutSideBar class="layout-sider" v-if="getMenuMode !== 'horizontal' && getShowMenu"/>
    <n-layout inverted>
      <LayoutHeader v-show="getShowHeader"/>
      <LayoutContent/>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">

import {NLayout} from 'naive-ui';
import {defineComponent} from 'vue';
import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
import LayoutSideBar from './sider/index.vue';
import {useLockPage} from '@/hooks/web/useLockPage';
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";
import {useHeaderSetting} from "@/hooks/setting/useHeaderSetting";

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    NLayout,
    LayoutHeader,
    LayoutContent,
    LayoutSideBar
  },
  setup() {
    // const {getShowSidebar} = useMenuSetting();

    // Create a lock screen monitor
    const lockEvents = useLockPage();
    const {getMenuMode,getShowMenu} = useMenuSetting();
    const { getShowHeader } = useHeaderSetting();

    return {
      // getShowSidebar,
      lockEvents,
      getMenuMode,
      getShowMenu,
      getShowHeader
    };
  },
});
</script>

<style lang="less">
.layout-side-drawer {
  background-color: rgb(0, 20, 40);

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
}
</style>
<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    height: auto;
    top: 35px;
    margin: 0 0;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  //padding-top: 64px;
}

.layout-content-main-fix {
  //padding-top: 64px;
}

.fluid-header {
  padding-top: 0;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>


<template>

  <n-layout class="layout" position="absolute">
    <LayoutHeader/>

    <n-layout inverted has-sider style="width: 100vw" position="absolute">


      <LayoutSideBar/>

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

// import {useMenuSetting} from '@/hooks/setting/useMenuSetting';
import {useLockPage} from '@/hooks/web/useLockPage';

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


    return {
      // getShowSidebar,
      lockEvents,
    };
  },
});
</script>

<style lang="less">


.layout-sider {
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  position: relative;
  transition: all 0.2s ease-in-out;
}

</style>
<style lang="less" scoped>
.layout {
  //display: flex;
  //flex-direction: column;
  //flex: auto;
  //height: 100vh;

  &-default-background {
    background: #f5f7f9;
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
    flex-direction: column;
    height: 100vh;
    padding-top: 35px;
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
  padding-top: 64px;
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


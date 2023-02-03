<template>
  <n-layout-header bordered class="layout-header" :style="{height:`${HEADER_HEIGHT}px`}">

    <!--左侧菜单-->
    <div class="layout-header-left">
      <!--顶部迷你菜单minimenu-->
      <MiniMenu/>
      <NButton :focusable="false" text style="outline: 0px" size="tiny" ghost @click="setMiniMenu">
        <template #icon>
          <Icon size="20">
            <CaretForwardSharp v-if="getIsTopMenu"/>
            <CaretBackSharp v-else/>
          </Icon>
        </template>
      </NButton>

      <n-divider vertical />

      <multiple-tabs/>
    </div>
    <div class="layout-header-right">
      <!--切换全屏-->
      <full-screen/>

      <!-- 个人中心 -->
      <user-dropdown/>

      <!--语言-->
      <AppLocalePicker/>

      <!--设置-->
      <!--      <SettingDrawerBtn class="layout-header-trigger layout-header-trigger-min"/>-->
      <SettingDrawer/>
    </div>
  </n-layout-header>
</template>

<script lang="ts">
import {defineComponent, unref} from 'vue';
import {NButton, NTooltip, NDropdown, NAvatar, NLayoutHeader, NIcon,NDivider} from 'naive-ui';
import {HEADER_HEIGHT} from '@/enums/appEnum'
import {Icon} from "@vicons/utils";
import {FullScreen} from "./components";

import {
  SettingsOutline,
  AccessibilityOutline,
  ReloadOutline,
  MenuOutline,
  AmericanFootballOutline
} from '@vicons/ionicons5';
// import SettingDrawerBtn from "@/layouts/default/header/SettingDrawerBtn.vue";
import MiniMenu from "@/layouts/default/header/MiniMenu.vue";
import {CaretBackSharp, CaretForwardSharp} from '@vicons/ionicons5';
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";
import {createAsyncComponent} from "@/utils/factory/createAsyncComponent";
import AppLocalePicker from "@/components/Application/src/AppLocalePicker.vue";
import {MenuTypeEnum} from "@/enums/menuEnum";
import {UserDropdown,MultipleTabs} from "./components";
import FullScreenBtn from "@/layouts/default/header/components/FullScreenBtn.vue";

export default defineComponent({
  name: 'PageHeader',
  components: {
    FullScreenBtn,
    UserDropdown,
    MultipleTabs,
    AppLocalePicker,
    MiniMenu,
    NDivider,
    SettingsOutline,
    NTooltip,
    Icon,
    NButton,
    AccessibilityOutline,
    NDropdown,
    CaretBackSharp,
    CaretForwardSharp,
    NAvatar,
    ReloadOutline,
    MenuOutline,
    AmericanFootballOutline,
    NLayoutHeader,
    NIcon,
    FullScreen,
    SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue'), {loading: true,})
  },
  props: {
    collapsed: {
      type: Boolean,
    },
    inverted: {
      type: Boolean,
    },
  },
  setup(props) {
    const {getMenuMode, setMenuSetting, getIsTopMenu} = useMenuSetting();

    function setMiniMenu() {
      if (unref(getIsTopMenu)) {
        setMenuSetting({
          type: MenuTypeEnum.MIX_SIDEBAR
        });
      } else {
        setMenuSetting({
          type: MenuTypeEnum.TOP_MENU
        });
      }

    }

    const collapsed = false;

    return {
      collapsed,
      getMenuMode,
      setMiniMenu,
      getIsTopMenu,
      HEADER_HEIGHT
    };
  },
});
</script>

<style lang="less">
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      //height: 35px;
      //line-height: 35px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        //height: 32px;
        //margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .avatar {
      display: flex;
      align-items: center;
      //height: 35px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 20px;
    //height: 35px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      //height: 35px;
      //line-height: 35px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
      color: #515a6e;
    }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}
</style>

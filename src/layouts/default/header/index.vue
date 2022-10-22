<template>
  <n-layout-header bordered position="absolute" class="layout-header">
    <!--顶部菜单-->
    <MiniMenu class="layout-header-left" v-if="getMenuMode === 'horizontal'"/>
    <!--左侧菜单-->
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <div
          class="ml-1 layout-header-trigger layout-header-trigger-min"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuOutline/>
        </n-icon>
        <n-icon size="18" v-else>
          <MenuOutline/>
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
          class="mr-1 layout-header-trigger layout-header-trigger-min"
          v-if="collapsed"
      >
        <n-icon size="18">
          <ReloadOutline/>
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <!--      <n-breadcrumb v-if="crumbsSetting.show">-->
      <!--        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">-->
      <!--          <n-breadcrumb-item v-if="routeItem.meta.title">-->
      <!--            <n-dropdown-->
      <!--                v-if="routeItem.children.length"-->
      <!--                :options="routeItem.children"-->
      <!--                @select="dropdownSelect"-->
      <!--            >-->
      <!--              <span class="link-text">-->
      <!--                <component-->
      <!--                    v-if="crumbsSetting.showIcon && routeItem.meta.icon"-->
      <!--                    :is="routeItem.meta.icon"-->
      <!--                />-->
      <!--                {{ routeItem.meta.title }}-->
      <!--              </span>-->
      <!--            </n-dropdown>-->
      <!--            <span class="link-text" v-else>-->
      <!--              <component-->
      <!--                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"-->
      <!--                  :is="routeItem.meta.icon"-->
      <!--              />-->
      <!--              {{ routeItem.meta.title }}-->
      <!--            </span>-->
      <!--          </n-breadcrumb-item>-->
      <!--        </template>-->
      <!--      </n-breadcrumb>-->
    </div>
    <div class="layout-header-right">
      <div
          class="layout-header-trigger layout-header-trigger-min"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <!--              <component :is="item.icon" v-on="item.eventObject || {}" />-->
              <AmericanFootballOutline/>
            </n-icon>
          </template>
          <span>item.tips</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <!--              <component :is="fullscreenIcon" @click="toggleFullScreen" />-->
              <AmericanFootballOutline/>
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover">
          <div class="avatar">
            <n-avatar round>
              username
              <template #icon>
                <AccessibilityOutline/>
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>

      <!--设置-->
<!--      <SettingDrawerBtn class="layout-header-trigger layout-header-trigger-min"/>-->
      <SettingDrawer class="layout-header-trigger layout-header-trigger-min"/>
    </div>
  </n-layout-header>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, computed, unref} from 'vue';
import {useRouter, useRoute} from 'vue-router';
// import components from './components';
import {NTooltip, NDropdown, NAvatar, NLayoutHeader, NIcon} from 'naive-ui';
import {useMessage} from "@/store/modules/message";
// import { TABS_ROUTES } from '@/store/mutation-types';
import {useUserStore} from '@/store/modules/user';
// import { useLockscreenStore } from '@/store/modules/lockscreen';
// import ProjectSetting from './ProjectSetting.vue';
// import { AsideMenu } from '@/layout/components/Menu';
// import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
// import { websiteConfig } from '@/config/website.config';

import {
  SettingsOutline,
  AccessibilityOutline,
  ReloadOutline,
  MenuOutline,
  AmericanFootballOutline
} from '@vicons/ionicons5';
// import SettingDrawerBtn from "@/layouts/default/header/SettingDrawerBtn.vue";
import MiniMenu from "@/components/Menu/src/MiniMenu.vue";
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";
import {createAsyncComponent} from "@/utils/factory/createAsyncComponent";

export default defineComponent({
  name: 'PageHeader',
  components: {
    MiniMenu,
    // SettingDrawerBtn,
    SettingsOutline,
    NTooltip,
    AccessibilityOutline,
    NDropdown,
    NAvatar,
    ReloadOutline,
    MenuOutline,
    AmericanFootballOutline,
    NLayoutHeader,
    NIcon,
    SettingDrawer:createAsyncComponent(() => import('@/layouts/default/setting/index.vue'),{loading: true,})
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
    const {getMenuMode}=useMenuSetting();

    // const userStore = useUserStore();
    // // const useLockscreen = useLockscreenStore();
    // const message = useMessage();
    // // const { getNavMode, getNavTheme, getHeaderSetting, getMenuSetting, getCrumbsSetting } =
    // //     useProjectSetting();
    //
    // const { username } = userStore?.info || {};
    //
    // const drawerSetting = ref();
    //
    // const state = reactive({
    //   username: username || '',
    //   fullscreenIcon: 'FullscreenOutlined',
    //   navMode: getNavMode,
    //   navTheme: getNavTheme,
    //   headerSetting: getHeaderSetting,
    //   crumbsSetting: getCrumbsSetting,
    // });
    //
    // const getInverted = computed(() => {
    //   const navTheme = unref(getNavTheme);
    //   return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted;
    // });
    //
    // const mixMenu = computed(() => {
    //   return unref(getMenuSetting).mixMenu;
    // });
    //
    // const getChangeStyle = computed(() => {
    //   const { collapsed } = props;
    //   const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
    //   return {
    //     left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
    //     width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`,
    //   };
    // });
    //
    // const getMenuLocation = computed(() => {
    //   return 'header';
    // });
    //
    // const router = useRouter();
    // const route = useRoute();
    //
    // const generator: any = (routerMap) => {
    //   return routerMap.map((item) => {
    //     const currentMenu = {
    //       ...item,
    //       label: item.meta.title,
    //       key: item.name,
    //       disabled: item.path === '/',
    //     };
    //     // 是否有子菜单，并递归处理
    //     if (item.children && item.children.length > 0) {
    //       // Recursion
    //       currentMenu.children = generator(item.children, currentMenu);
    //     }
    //     return currentMenu;
    //   });
    // };
    //
    // const breadcrumbList = computed(() => {
    //   return generator(route.matched);
    // });
    //
    // const dropdownSelect = (key) => {
    //   router.push({ name: key });
    // };
    //
    // // 刷新页面
    // const reloadPage = () => {
    //   router.push({
    //     path: '/redirect' + unref(route).fullPath,
    //   });
    // };
    //
    // // 退出登录
    // const doLogout = () => {
    //   // message.info({
    //   //   title: '提示',
    //   //   content: '您确定要退出登录吗',
    //   //   positiveText: '确定',
    //   //   negativeText: '取消',
    //   //   onPositiveClick: () => {
    //   //     userStore.logout().then(() => {
    //   //       message.success({content:'成功退出登录'});
    //   //       // 移除标签页
    //   //       localStorage.removeItem(TABS_ROUTES);
    //   //       router
    //   //           .replace({
    //   //             name: 'Login',
    //   //             query: {
    //   //               redirect: route.fullPath,
    //   //             },
    //   //           })
    //   //           .finally(() => location.reload());
    //   //     });
    //   //   },
    //   //   onNegativeClick: () => {},
    //   // });
    // };
    //
    // // 切换全屏图标
    // const toggleFullscreenIcon = () =>
    //     (state.fullscreenIcon =
    //         document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined');
    //
    // // 监听全屏切换事件
    // document.addEventListener('fullscreenchange', toggleFullscreenIcon);
    //
    // // 全屏切换
    // const toggleFullScreen = () => {
    //   if (!document.fullscreenElement) {
    //     document.documentElement.requestFullscreen();
    //   } else {
    //     if (document.exitFullscreen) {
    //       document.exitFullscreen();
    //     }
    //   }
    // };
    //
    // // 图标列表
    // const iconList = [
    //   {
    //     icon: 'SearchOutlined',
    //     tips: '搜索',
    //   },
    //   {
    //     icon: 'GithubOutlined',
    //     tips: 'github',
    //     eventObject: {
    //       click: () => window.open('https://github.com/jekip/naive-ui-admin'),
    //     },
    //   },
    //   {
    //     icon: 'LockOutlined',
    //     tips: '锁屏',
    //     eventObject: {
    //       click: () => useLockscreen.setLock(true),
    //     },
    //   },
    // ];
    // const avatarOptions = [
    //   {
    //     label: '个人设置',
    //     key: 1,
    //   },
    //   {
    //     label: '退出登录',
    //     key: 2,
    //   },
    // ];
    //
    // //头像下拉菜单
    // const avatarSelect = (key) => {
    //   switch (key) {
    //     case 1:
    //       router.push({ name: 'Setting' });
    //       break;
    //     case 2:
    //       doLogout();
    //       break;
    //   }
    // };
    //
    // function openSetting() {
    //   const { openDrawer } = drawerSetting.value;
    //   openDrawer();
    // }
    const collapsed = false;

    return {
      collapsed,
      getMenuMode
      // ...toRefs(state),
      // iconList,
      // toggleFullScreen,
      // doLogout,
      // route,
      // dropdownSelect,
      // avatarOptions,
      // getChangeStyle,
      // avatarSelect,
      // breadcrumbList,
      // reloadPage,
      // drawerSetting,
      // openSetting,
      // getInverted,
      // getMenuLocation,
      // mixMenu,
      // websiteConfig,
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
  height: 35px;
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
      height: 35px;
      line-height: 35px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
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
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 35px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 35px;
    height: 35px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 35px;
      line-height: 35px;
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

<template>
  <n-space v-bind="getMenuEvents" :style="getWrapStyle">
    <n-scrollbar style="height: 100vh;">
      <n-space vertical style="display: inline-block;position: relative">

        <n-button v-for="item in menuModules"
                  size="large"
                  text
                  :style="getModuleItemStyle(item)"
                  :key="item.path"
                  v-bind="getItemEvents(item)">
          <template #icon>
            <IconWithText
                size="28px"
                :icon="item.icon || (item.meta && item.meta.icon)"
                :text="t(item.name)"
                textSize="1px"
            />
          </template>
        </n-button>

      </n-space>
    </n-scrollbar>
    <SimpleMenu :style="getMenuStyle"
                v-show="openMenu"
                :items="childrenMenus"
                mixSider
                @menu-click="handleMenuClick"
    />

  </n-space>
</template>

<script lang="ts">
import {computed, CSSProperties, defineComponent, onMounted, ref, unref, watch} from "vue";
import {NButtonGroup, NButton, NSpace, NTooltip, NDrawer, NDrawerContent, NScrollbar} from "naive-ui";
import Icon from "@/components/Icon/src/Icon.vue";
import IconWithText from "@/components/Icon/src/IconWithText.vue";
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";
import {usePermissionStore} from '@/store/modules/permission';
import {SimpleMenu} from "@/components/SimpleMenu";
import {RouteLocationNormalized} from "vue-router";
import {getChildrenMenus, getCurrentParentPath, getShallowMenus} from "@/router/menus";
import {Menu} from "@/router/types";
import {useI18n} from '@/hooks/web/useI18n';
import {useGo} from "@/hooks/web/usePage";
import {SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH} from "@/enums/appEnum";
import {useThemeVars} from "naive-ui";


export default defineComponent({
  name: "MixMenu",
  components: {
    NScrollbar,
    SimpleMenu,
    IconWithText,
    Icon,
    NButtonGroup,
    NButton,
    NSpace,
    NTooltip,
    NDrawer,
    NDrawerContent
  },
  setup() {
    let menuModules = ref<Menu[]>([]);
    const activePath = ref('');
    const childrenMenus = ref<Menu[]>([]);
    const openMenu = ref(false);
    const currentRoute = ref<Nullable<RouteLocationNormalized>>(null);
    const go = useGo();
    const {t} = useI18n();
    const {
      getMenuWidth,
      getCanDrag,
      getCloseMixSidebarOnChange,
      getMenuTheme,
      getMixSideTrigger,
      getRealWidth,
      getMixSideFixed,
      mixSideHasChildren,
      setMenuSetting,
      getIsMixSidebar,
      getCollapsed,
    } = useMenuSetting();
    const themeVars = useThemeVars();

    const permissionStore = usePermissionStore();

    onMounted(async () => {
      menuModules.value = await getShallowMenus();
    });

    // Menu changes
    watch(
        [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
        async () => {
          menuModules.value = await getShallowMenus();
        },
        {
          immediate: true,
        },
    );


    // Process module menu click
    async function handleModuleClick(path: string, hover = false) {
      const children = await getChildrenMenus(path);
      if (unref(activePath) === path) {
        if (!hover) {
          if (!unref(openMenu)) {
            openMenu.value = true;
          } else {
            closeMenu();
          }
        } else {
          if (!unref(openMenu)) {
            openMenu.value = true;
          }
        }
        if (!unref(openMenu)) {
          setActive();
        }
      } else {
        openMenu.value = true;
        activePath.value = path;
      }

      if (!children || children.length === 0) {
        if (!hover) go(path);
        childrenMenus.value = [];
        closeMenu();
        return;
      }
      childrenMenus.value = children;
    }

    // Set the currently active menu and submenu
    async function setActive(setChildren = false) {
      console.log("currentRoute.value",currentRoute.value);
      const path = currentRoute.value?.path;
      if (!path) return;
      activePath.value = await getCurrentParentPath(path);
      console.log("activePath.value",activePath.value);
      if (unref(getIsMixSidebar)) {
        const activeMenu = unref(menuModules).find((item) => item.path === unref(activePath));
        const p = activeMenu?.path;
        if (p) {
          const children = await getChildrenMenus(p);
          if (setChildren) {
            childrenMenus.value = children;

            if (unref(getMixSideFixed)) {
              openMenu.value = children.length > 0;
            }
          }
          if (children.length === 0) {
            childrenMenus.value = [];
          }
        }
      }
    }

    function handleMenuClick(path: string) {
      go(path);
    }

    function handleClickOutside() {
      setActive(true);
      closeMenu();
    }


    const getIsFixed = computed(() => {
      /* eslint-disable-next-line */
      mixSideHasChildren.value = unref(childrenMenus).length > 0;
      const isFixed = unref(getMixSideFixed) && unref(mixSideHasChildren);
      if (isFixed) {
        /* eslint-disable-next-line */
        openMenu.value = true;
      }
      return isFixed;
    });

    const getMixSideWidth = computed(() => {
      return unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH;
    });

    function getItemEvents(item: Menu) {
      if (unref(getMixSideTrigger) === 'hover') {//unref(getMixSideTrigger) === 'hover'
        return {
          onMouseenter: () => handleModuleClick(item.path, true),
          onClick: async () => {
            const children = await getChildrenMenus(item.path);
            if (item.path && (!children || children.length === 0)) go(item.path);
          },
        };
      }
      return {
        onClick: () => handleModuleClick(item.path)
      };
    }

    function handleFixedMenu() {
      setMenuSetting({
        mixSideFixed: !unref(getIsFixed),
      });
    }

    function closeMenu() {
      if (!unref(getIsFixed)) {
        openMenu.value = false;
      }
    }

    function getModuleItemStyle(item): CSSProperties {
      return {
        margin: '20px',
        outline: '0px',
        color: item.path === activePath.value ? themeVars.value.primaryColor : ''
      }
    }

    const getMenuStyle = computed((): CSSProperties => {
      return {
        width: unref(openMenu) ? `${unref(getMenuWidth)}px` : 0,
        position: "fixed",
        top: "0px",
        left: `${unref(getMixSideWidth)}px`,
        height: "100vh",
        transition: "all 0.2s"
      }

    });

    function getWrapCommonStyle(width: string): CSSProperties {
      return {
        width,
        maxWidth: width,
        minWidth: width,
        // flex: `0 0 ${width}`,
        // backgroundColor:"grey",
        height: "100vh",
        position: 'fixed',
        overflow: "hidden"
      };
    }


    const getWrapStyle = computed((): CSSProperties => {
      const width = unref(openMenu) ? `${unref(getMixSideWidth) + unref(getMenuWidth)}px` : `${unref(getMixSideWidth)}px`;
      return getWrapCommonStyle(width);
    });

    const getMenuEvents = computed(() => {
      return !unref(getMixSideFixed)
          ? {
            onMouseleave: () => {
              setActive(true);
              closeMenu();
            },
          }
          : {};
    });

    return {
      openMenu,
      getMenuStyle,
      getMenuEvents,
      getItemEvents,
      menuModules,
      t,
      childrenMenus,
      getMixSideWidth,
      getWrapStyle,
      getModuleItemStyle,
      handleMenuClick
    };
  }
});
</script>

<style lang="less" scoped>


</style>

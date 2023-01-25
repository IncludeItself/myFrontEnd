<template>
  <n-layout :style="{height: '100vh',width: getMenuWidth}" embedded inverted has-sider>
    <n-layout-sider style="height: 100vh;width: auto" :native-scrollbar="false" embedded inverted>
      <n-space style="position: absolute">

        <span>爱在西元前</span>

        <n-button quaternary
                  :focusable="false"
                  :type="getMixSideFixed ?'default':'tertiary'"
                  @click="handleFixedMenu"
        >
          <template #icon>
            <Icon
                :size="16"
                :icon="getMixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
            />
          </template>
        </n-button>
      </n-space>


      <!--    {{items}}-->
      <n-menu :options="items"
              :render-label="renderLabel"
              :render-icon="renderIcon"
              key-field="path"
              mode="vertical"
              :collapsed="false"
              :style="getSimpleMenuStyle"
              :indent="5"
              inverted
              :on-update:value="handleSelect"
      />

    </n-layout-sider>
  </n-layout>
</template>

<script lang="ts">
import type {MenuState} from './types';
import {computed, CSSProperties, defineComponent, h, reactive, ref, toRefs, unref} from "vue";
import {
  NSpace,
  NTag,
  NMenu,
  NCard,
  NScrollbar,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutFooter,
  NButton
} from 'naive-ui';
import Icon from "@/components/Icon";
import {useI18n} from "@/hooks/web/useI18n";
import {Menu} from "@/router/types";
import {propTypes} from "@/utils/propTypes";
import {REDIRECT_NAME} from "@/router/constant";
import {listenerRouteChange} from "@/logics/mitt/routeChange";
import {RouteLocationNormalizedLoaded, useRouter} from "vue-router";
import {useOpenKeys} from "@/components/SimpleMenu/src/useOpenKeys";
import {openWindow} from "@/utils";
import {isFunction, isUrl} from "@/utils/is";
import {useMenuSetting} from "@/hooks/setting/useMenuSetting";

export default defineComponent({
  name: "SimpleMenu",
  components: {
    Icon,
    NSpace,
    NTag,
    NMenu,
    NCard,
    NScrollbar,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutFooter,
    NButton
  },
  props: {
    items: {
      type: Array as PropType<Menu[]>,
      default: () => [],
    },
    collapse: propTypes.bool,
    mixSider: propTypes.bool,
    accordion: propTypes.bool.def(true),
    collapsedShowTitle: propTypes.bool,
    beforeClickFn: {
      type: Function as PropType<(key: string) => Promise<boolean>>,
    },
    isSplitMenu: propTypes.bool,
  },
  setup(props, {attrs, emit}) {
    const currentActiveMenu = ref('');
    const isClickGo = ref(false);

    const {setMenuSetting, getMixSideFixed, getMiniWidthNumber, getMenuWidth} = useMenuSetting();

    const menuState = reactive<MenuState>({
      activeName: '',
      openNames: [],
      activeSubMenuNames: [],
    });

    const {currentRoute} = useRouter();
    const {items, accordion, mixSider, collapse} = toRefs(props);

    const {setOpenKeys, getOpenKeys} = useOpenKeys(
        menuState,
        items,
        accordion,
        mixSider,
        collapse,
    );


    const {t} = useI18n();
    const renderLabel = (option) => {
      return t(option.meta.title);
    };
    const renderIcon = (option) => {
      return h(Icon, {icon: option.meta.icon});
    };

    const getSimpleMenuStyle = computed((): CSSProperties => {
      return {
        width: `${unref(getMenuWidth)}px`,
        // left:`${unref(getMiniWidthNumber)}px`,
        top: "20px",
        position: "relative"
      };
    });

    listenerRouteChange((route) => {
      if (route.name === REDIRECT_NAME) return;

      currentActiveMenu.value = route.meta?.currentActiveMenu as string;
      handleMenuChange(route);

      if (unref(currentActiveMenu)) {
        menuState.activeName = unref(currentActiveMenu);
        setOpenKeys(unref(currentActiveMenu));
      }
    });

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
      if (unref(isClickGo)) {
        isClickGo.value = false;
        return;
      }
      const path = (route || unref(currentRoute)).path;

      menuState.activeName = path;

      setOpenKeys(path);
    }

    async function handleSelect(key: string) {
      if (isUrl(key)) {
        openWindow(key);
        return;
      }
      const {beforeClickFn} = props;
      if (beforeClickFn && isFunction(beforeClickFn)) {
        const flag = await beforeClickFn(key);
        if (!flag) return;
      }

      emit('menuClick', key);

      isClickGo.value = true;
      setOpenKeys(key);
      menuState.activeName = key;
    }

    function handleFixedMenu() {
      setMenuSetting({
        mixSideFixed: !unref(getMixSideFixed),
        collapsed: unref(getMixSideFixed)
      });
    }


    return {
      renderLabel,
      renderIcon,
      handleSelect,
      getOpenKeys,
      getMixSideFixed,
      handleFixedMenu,
      getSimpleMenuStyle,
      getMenuWidth
    };
  }
});
</script>



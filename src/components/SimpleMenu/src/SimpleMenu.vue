<template>
  <n-layout style="height: 100vh" embedded>
    <n-layout-header style="height: 5vh">
      <n-tag :bordered="false" style="width: 100%;margin: auto;text-align: center">
        爱在西元前
      </n-tag>
    </n-layout-header>
    <n-layout-content style="height: 95vh" :native-scrollbar="false" embedded>

      <!--    {{items}}-->
      <n-menu :options="items"
              :render-label="renderLabel"
              :render-icon="renderIcon"
              key-field="path"
              mode="vertical"
              :collapsed="false"
              indent="1px"
              accordion
              :on-update:value="handleSelect"
      />

    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import type { MenuState } from './types';
import {defineComponent, h, reactive, ref, toRefs, unref} from "vue";
import {NSpace, NTag, NMenu, NCard, NScrollbar, NLayout, NLayoutContent, NLayoutHeader} from 'naive-ui';
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

export default defineComponent({
  name: "SimpleMenu",
  components: {NSpace, NTag, NMenu, NCard, NScrollbar, NLayout, NLayoutContent, NLayoutHeader},
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
  setup(props, { attrs, emit }) {
    const currentActiveMenu = ref('');
    const isClickGo = ref(false);

    const menuState = reactive<MenuState>({
      activeName: '',
      openNames: [],
      activeSubMenuNames: [],
    });

    const { currentRoute } = useRouter();
    const { items, accordion, mixSider, collapse } = toRefs(props);

    const { setOpenKeys, getOpenKeys } = useOpenKeys(
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
      const { beforeClickFn } = props;
      if (beforeClickFn && isFunction(beforeClickFn)) {
        const flag = await beforeClickFn(key);
        if (!flag) return;
      }

      emit('menuClick', key);

      isClickGo.value = true;
      setOpenKeys(key);
      menuState.activeName = key;
    }


    return {
      renderLabel,
      renderIcon,
      handleSelect,
      getOpenKeys
    };
  }
});
</script>



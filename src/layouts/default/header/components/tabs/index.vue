<template>
  <n-scrollbar style="max-width: 50vw;height: 39px" :x-scrollable="true">
    <n-tabs type="card" size="small" :on-update:value="handleChange" :on-close="handleEdit" :value="activeKeyRef">
      <n-tab v-for="item in getTabsState"
             :name="item.query ? item.fullPath : item.path"
             :closable="!(item && item.meta && item.meta.affix)&&!unClose"
             size="small"
             :style="getTabStyle(item)"
             @contextmenu="handleContext($event,item)"
      >
        {{ getTitle(item) }}
      </n-tab>
    </n-tabs>
  </n-scrollbar>
  <n-dropdown placement="bottom-start" trigger="click" :options="getDropMenuList" :on-select="handleMenuEvent">
    <n-button text style="outline: 0px;margin-top: 12px" :focusable="false" ghost @click="handleContext">
      <Icon icon="ion:chevron-down"/>
    </n-button>
  </n-dropdown>
  <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="getDropMenuList"
      :show="showDropdown"
      :on-clickoutside="onClickoutside"
      :on-select="(key)=>{handleMenuEvent(key);showDropdown=false;}"
  />
</template>
<script lang="ts">
import {NTag, NSpace, NScrollbar, NTabs, NTab, useThemeVars, NButton, NDropdown} from 'naive-ui';
import {computed, CSSProperties, defineComponent, nextTick, ref, unref} from 'vue';
import {useMultipleTabStore} from "@/store/modules/multipleTab";
import {useI18n} from "@/hooks/web/useI18n";
import {RouteLocationNormalized, RouteMeta, useRouter} from "vue-router";
import {listenerRouteChange} from "@/logics/mitt/routeChange";
import {REDIRECT_NAME} from "@/router/constant";
import {useUserStore} from "@/store/modules/user";
import {useGo} from "@/hooks/web/usePage";
import Icon from '@/components/Icon';
import {useTabDropdown} from "@/layouts/default/header/components/tabs/useTabDropdown";
import {useTabs} from "@/hooks/web/useTabs"

export default defineComponent({
  name: 'MultipleTabs',
  components: {NTag, NSpace, NScrollbar, NTabs, NTab, Icon, NButton, NDropdown},
  setup() {
    const themeVars = useThemeVars();
    const activeKeyRef = ref('');
    const {t} = useI18n();
    const tabStore = useMultipleTabStore();
    const userStore = useUserStore();
    const router = useRouter();
    const showDropdown = ref(false);
    const x = ref(0);
    const y = ref(0);

    const go = useGo();

    const {getCurrentTab}=useTabs();

    const currentTab=computed<RouteLocationNormalized>(()=>getCurrentTab(activeKeyRef.value));

    const getTitle = (tabItem: RouteLocationNormalized | undefined) => {
      const {meta} = tabItem ?? {};
      return meta && t(meta.title as string);
    };

    const getIsTabs = ref<boolean>(false);

    const getTabsState = computed(() => {
      return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
    });

    const unClose = computed(() => unref(getTabsState).length === 1);

    listenerRouteChange((route) => {
      const {name} = route;
      if (name === REDIRECT_NAME || !route || !userStore.getToken) {
        return;
      }

      const {path, fullPath, meta = {}} = route;
      const {currentActiveMenu, hideTab} = meta as RouteMeta;
      const isHide = !hideTab ? null : currentActiveMenu;
      const p = isHide || fullPath || path;
      if (activeKeyRef.value !== p) {
        activeKeyRef.value = p as string;
      }

      if (isHide) {
        const findParentRoute = router
            .getRoutes()
            .find((item) => item.path === currentActiveMenu);

        findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
      } else {
        tabStore.addTab(unref(route));
      }
    });


    function handleChange(activeKey: any) {
      activeKeyRef.value = activeKey;
      go(activeKey, false);
    }

    // Close the current tab
    function handleEdit(targetKey: string) {
      // Added operation to hide, currently only use delete operation
      if (unref(unClose)) {
        return;
      }
      tabStore.closeTabByKey(targetKey, router);
    }

    //padding-left: 3px;padding-right: 3px;margin-top: 11px;height: 27px;border-bottom: #535bf2 3px solid
    function getTabStyle(item: RouteLocationNormalized): CSSProperties {
      const p = item.fullPath || item.path
      return {
        paddingLeft: '3px',
        paddingRight: '1px',
        marginTop: '11px',
        height: '27px',
        borderBottomWidth: '3px',
        borderBottomColor: themeVars.value.primaryColor,
        borderBottomStyle: p == activeKeyRef.value ? 'solid' : 'none',
      }
    }

    const {getDropMenuList, handleContextMenu, handleMenuEvent} = useTabDropdown();

    function handleContext(e, item?) {
      handleContextMenu(unref(item||currentTab))(e);
      if (unref(item)) {
        showDropdown.value = false;
        nextTick().then(() => {
          showDropdown.value = true
          x.value = e.clientX
          y.value = e.clientY
        });
      }
    }

    return {
      getTabsState,
      getTitle,
      handleChange,
      handleEdit,
      unClose,
      getTabStyle,
      activeKeyRef,
      getDropMenuList,
      handleContext,
      handleMenuEvent,
      showDropdown,
      x,
      y,
      onClickoutside() {
        showDropdown.value = false
      }
    };
  },
});
</script>
<style lang="less">
</style>

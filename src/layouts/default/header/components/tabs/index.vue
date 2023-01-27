<template>
  <n-scrollbar style="width: 50vw;height: 39px" :x-scrollable="true">
    <n-tabs type="card" size="small" :on-update:value="handleChange" :on-close="handleEdit">
      <n-tab v-for="item in getTabsState"
             :name="item.query ? item.fullPath : item.path"
             :closable="!(item && item.meta && item.meta.affix)&&!unClose"
             size="small"
             :style="getTabStyle(item)"
      >
        {{ getTitle(item) }}
      </n-tab>
    </n-tabs>
  </n-scrollbar>
</template>
<script lang="ts">
import {NTag, NSpace, NScrollbar, NTabs, NTab, useThemeVars} from 'naive-ui';
import {computed, CSSProperties, defineComponent, ref, unref} from 'vue';
import {useMultipleTabStore} from "@/store/modules/multipleTab";
import {useI18n} from "@/hooks/web/useI18n";
import {RouteLocationNormalized, RouteMeta, useRouter} from "vue-router";
import {listenerRouteChange} from "@/logics/mitt/routeChange";
import {REDIRECT_NAME} from "@/router/constant";
import {useUserStore} from "@/store/modules/user";
import {useGo} from "@/hooks/web/usePage";
import {func} from "vue-types";

export default defineComponent({
  name: 'MultipleTabs',
  components: {NTag, NSpace, NScrollbar, NTabs, NTab},
  setup() {
    const themeVars = useThemeVars();
    const activeKeyRef = ref('');
    const {t} = useI18n();
    const tabStore = useMultipleTabStore();
    const userStore = useUserStore();
    const router = useRouter();

    const go = useGo();

    const getTitle = (tabItem: RouteLocationNormalized | undefined) => {
      const {meta} = tabItem ?? {};
      return meta && t(meta.title as string);
    };

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
      console.log("p",p);
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

    return {
      getTabsState,
      getTitle,
      handleChange,
      handleEdit,
      unClose,
      getTabStyle
    };
  },
});
</script>
<style lang="less">
</style>

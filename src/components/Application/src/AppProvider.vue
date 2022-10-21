<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
<!--      <DialogContent />-->
      <n-notification-provider>
        <n-message-provider>
          <MessageContent />
          <slot name="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
import {defineComponent, ref, unref} from 'vue';
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from 'naive-ui';
import MessageContent from './MessageContent.vue';
import {useAppStore} from "@/store/modules/app";
import {createBreakpointListen} from "@/hooks/event/useBreakpoint";
import {MenuModeEnum, MenuTypeEnum} from "@/enums/menuEnum";

export default defineComponent({
  name: 'Application',
  inheritAttrs: false,
  components: {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
    MessageContent
  },
  setup() {
    const isMobile = ref(false);
    const isSetState = ref(false);

    const appStore = useAppStore();
    // Monitor screen breakpoint information changes
    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG);
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth;
      }
      handleRestoreState();
    });

    /**
     * Used to maintain the state before the window changes
     */
    function handleRestoreState() {
      if (unref(isMobile)) {
        if (!unref(isSetState)) {
          isSetState.value = true;
          const {
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit,
            },
          } = appStore.getProjectConfig;
          appStore.setProjectConfig({
            menuSetting: {
              type: MenuTypeEnum.SIDEBAR,
              mode: MenuModeEnum.INLINE,
              split: false,
            },
          });
          appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit });
        }
      } else {
        if (unref(isSetState)) {
          isSetState.value = false;
          const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo;
          appStore.setProjectConfig({
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit,
            },
          });
        }
      }
    }
    return {};
  },
});
</script>

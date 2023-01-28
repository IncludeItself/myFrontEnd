import type { TabContentProps } from './types';
import type {ComputedRef, Ref} from 'vue';

import { computed, unref, reactive,h } from 'vue';
import { MenuEventEnum } from './types';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { RouteLocationNormalized, useRouter } from 'vue-router';
// import { useTabs } from '@/hooks/web/useTabs';
import { useI18n } from '@/hooks/web/useI18n';
import {DropdownOption} from "naive-ui";
import Icon from '@/components/Icon';

export function useTabDropdown() {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0,
  });

  const { t } = useI18n();
  const tabStore = useMultipleTabStore();
  const { currentRoute } = useRouter();

  const renderIcon = (icon: string) => {
    return () => {
      return h(Icon, {icon:icon}, {});
    }
  }


  /**
   * @description: drop-down list
   */
  const getDropMenuList = computed(() => {
    const dropMenuList: DropdownOption[] = [
      {
        icon: renderIcon('ion:reload-sharp'),
        event: MenuEventEnum.REFRESH_PAGE,
        text: t('layout.multipleTab.reload'),
        // disabled: refreshDisabled,
      },
      {
        icon: renderIcon('clarity:close-line'),
        event: MenuEventEnum.CLOSE_CURRENT,
        text: t('layout.multipleTab.close'),
        // disabled: !!meta?.affix || disabled,
        // divider: true,
      },
      {
        icon: renderIcon('line-md:arrow-close-left'),
        event: MenuEventEnum.CLOSE_LEFT,
        text: t('layout.multipleTab.closeLeft'),
        disabled: closeLeftDisabled,
        divider: false,
      },
      {
        icon: 'line-md:arrow-close-right',
        event: MenuEventEnum.CLOSE_RIGHT,
        text: t('layout.multipleTab.closeRight'),
        disabled: closeRightDisabled,
        divider: true,
      },
      {
        icon: 'dashicons:align-center',
        event: MenuEventEnum.CLOSE_OTHER,
        text: t('layout.multipleTab.closeOther'),
        disabled: disabled || !isCurItem,
      },
      {
        icon: 'clarity:minus-line',
        event: MenuEventEnum.CLOSE_ALL,
        text: t('layout.multipleTab.closeAll'),
        disabled: disabled,
      },
    ];

    return dropMenuList;
  });

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) {
        return;
      }
      e?.preventDefault();
      const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path);
      state.current = tabItem;
      state.currentIndex = index;
    };
  }
  //
  // // Handle right click event
  // function handleMenuEvent(menu: DropMenu): void {
  //   const { event } = menu;
  //   switch (event) {
  //     case MenuEventEnum.REFRESH_PAGE:
  //       // refresh page
  //       refreshPage();
  //       break;
  //     // Close current
  //     case MenuEventEnum.CLOSE_CURRENT:
  //       close(tabContentProps.tabItem);
  //       break;
  //     // Close left
  //     case MenuEventEnum.CLOSE_LEFT:
  //       closeLeft();
  //       break;
  //     // Close right
  //     case MenuEventEnum.CLOSE_RIGHT:
  //       closeRight();
  //       break;
  //     // Close other
  //     case MenuEventEnum.CLOSE_OTHER:
  //       closeOther();
  //       break;
  //     // Close all
  //     case MenuEventEnum.CLOSE_ALL:
  //       closeAll();
  //       break;
  //   }
  // }
  return {  handleContextMenu };
}

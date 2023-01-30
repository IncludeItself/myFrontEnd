import type {ComputedRef, Ref} from 'vue';

import {computed, unref, reactive, h} from 'vue';
import {MenuEventEnum} from './types';
import {useMultipleTabStore} from '@/store/modules/multipleTab';
import {RouteLocationNormalized, useRouter} from 'vue-router';
// import { useTabs } from '@/hooks/web/useTabs';
import {useI18n} from '@/hooks/web/useI18n';
import {DropdownOption} from "naive-ui";
import Icon from '@/components/Icon';
import {useTabs} from "@/hooks/web/useTabs";

export function useTabDropdown() {
    const state = reactive({
        current: null as Nullable<RouteLocationNormalized>,
        currentIndex: 0,
    });

    const {t} = useI18n();
    const tabStore = useMultipleTabStore();
    const {currentRoute} = useRouter();
    const {refreshPage, closeAll, close, closeLeft, closeOther, closeRight} = useTabs();

    const renderIcon = (icon: string) => {
        return () => {
            return h(Icon, {icon: icon}, {});
        }
    }


    /**
     * @description: drop-down list
     */
    const getDropMenuList = computed(() => {

        const {path} = unref(currentRoute);

        const curItem = state.current;

        const isCurItem = curItem ? curItem.path === path : false;

        // Refresh button
        const index = state.currentIndex;
        const refreshDisabled = !isCurItem;
        // Close left
        const closeLeftDisabled = index === 0 || !isCurItem;

        const disabled = tabStore.getTabList.length === 1;

        // Close right
        const closeRightDisabled =
            !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);

        const dropMenuList: DropdownOption[] = [
            {
                icon: renderIcon('ion:reload-sharp'),
                key: MenuEventEnum.REFRESH_PAGE,
                label: t('layout.multipleTab.reload'),
                disabled: refreshDisabled,
            },
            {
                icon: renderIcon('clarity:close-line'),
                key: MenuEventEnum.CLOSE_CURRENT,
                label: t('layout.multipleTab.close'),
                disabled: !!state.current?.meta?.affix || disabled,
                // divider: true,
            },
            {
                icon: renderIcon('line-md:arrow-close-left'),
                key: MenuEventEnum.CLOSE_LEFT,
                label: t('layout.multipleTab.closeLeft'),
                disabled: closeLeftDisabled,
                // divider: false,
            },
            {
                icon: renderIcon('line-md:arrow-close-right'),
                key: MenuEventEnum.CLOSE_RIGHT,
                label: t('layout.multipleTab.closeRight'),
                disabled: closeRightDisabled,
                // divider: true,
            },
            {
                icon: renderIcon('dashicons:align-center'),
                key: MenuEventEnum.CLOSE_OTHER,
                label: t('layout.multipleTab.closeOther'),
                disabled: disabled || !isCurItem,
            },
            {
                icon: renderIcon('clarity:minus-line'),
                key: MenuEventEnum.CLOSE_ALL,
                label: t('layout.multipleTab.closeAll'),
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

    // Handle right click event
    function handleMenuEvent(key: MenuEventEnum): void {
        switch (key) {
            case MenuEventEnum.REFRESH_PAGE:
                // refresh page
                refreshPage();
                break;
            // Close current
            case MenuEventEnum.CLOSE_CURRENT:
                close(state.current || undefined);
                break;
            // Close left
            case MenuEventEnum.CLOSE_LEFT:
                closeLeft();
                break;
            // Close right
            case MenuEventEnum.CLOSE_RIGHT:
                closeRight();
                break;
            // Close other
            case MenuEventEnum.CLOSE_OTHER:
                closeOther();
                break;
            // Close all
            case MenuEventEnum.CLOSE_ALL:
                closeAll();
                break;
        }
    }

    return {getDropMenuList, handleContextMenu, handleMenuEvent};
}

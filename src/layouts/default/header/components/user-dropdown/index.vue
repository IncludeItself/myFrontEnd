<template>
  <n-badge value="8" :max="15" :offset="offset" style="margin-right: 10px;margin-left: 10px">
    <n-avatar round size="small">

      <Icon size="40px">
        <CarSharp/>
      </Icon>

    </n-avatar>
  </n-badge>
</template>
<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useUserStore} from '@/store/modules/user';
import {useHeaderSetting} from '@/hooks/setting/useHeaderSetting';
import {useI18n} from '@/hooks/web/useI18n';
import headerImg from '@/assets/images/header.jpg';
import {CarSharp} from '@vicons/ionicons5';
import {NAvatar, NBadge} from "naive-ui";
import {propTypes} from '@/utils/propTypes';
import {openWindow} from '@/utils';
import {Icon} from "@vicons/utils";

import {createAsyncComponent} from '@/utils/factory/createAsyncComponent';

type MenuEvent = 'logout' | 'doc' | 'lock';

export default defineComponent({
  name: 'UserDropdown',
  components: {
    CarSharp, NAvatar, Icon, NBadge
    // MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
    // LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
  },
  props: {
    theme: propTypes.oneOf(['dark', 'light']),
  },
  setup() {
    const {t} = useI18n();
    const {getShowDoc, getUseLockPage} = useHeaderSetting();
    const userStore = useUserStore();

    const getUserInfo = computed(() => {
      const {realName = '', avatar, desc} = userStore.getUserInfo || {};
      return {realName, avatar: avatar || headerImg, desc};
    });

    //  login out
    function handleLoginOut() {
      userStore.confirmLoginOut();
    }


    return {
      t,
      getUserInfo,
      getShowDoc,
      getUseLockPage,
      offset: [0, 7] as const
    };
  },
});
</script>
<style lang="less">
//@prefix-cls: ~'@{namespace}-header-user-dropdown';
//
//.@{prefix-cls} {
//  height: @header-height;
//  padding: 0 0 0 10px;
//  padding-right: 10px;
//  overflow: hidden;
//  font-size: 12px;
//  cursor: pointer;
//  align-items: center;
//
//  img {
//    width: 24px;
//    height: 24px;
//    margin-right: 12px;
//  }
//
//  &__header {
//    border-radius: 50%;
//  }
//
//  &__name {
//    font-size: 14px;
//  }
//
//  &--dark {
//    &:hover {
//      background-color: @header-dark-bg-hover-color;
//    }
//  }
//
//  &--light {
//    &:hover {
//      background-color: @header-light-bg-hover-color;
//    }
//
//    .@{prefix-cls}__name {
//      color: @text-color-base;
//    }
//
//    .@{prefix-cls}__desc {
//      color: @header-light-desc-color;
//    }
//  }
//
//  &-dropdown-overlay {
//    .ant-dropdown-menu-item {
//      min-width: 160px;
//    }
//  }
//}
</style>

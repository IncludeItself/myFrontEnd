<template>
  <div class="prefixCls">
    <n-button type="primary" block @click="handleCopy">
      <CopyOutline class="mr-2" />
      {{ t('layout.setting.copyBtn') }}
    </n-button>

    <n-button color="warning" block @click="handleResetSetting" class="my-3">
      <ArrowRedoOutline class="mr-2" />
      {{ t('common.resetText') }}
    </n-button>

    <n-button color="error" block @click="handleClearAndRedo">
      <ArrowRedoOutline class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </n-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';

  import { CopyOutline, ArrowRedoOutline } from '@vicons/ionicons5';

  import { useAppStore } from '@/store/modules/app';
  import { usePermissionStore } from '@/store/modules/permission';
  import { useMultipleTabStore } from '@/store/modules/multipleTab';
  import { useUserStore } from '@/store/modules/user';

  // import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import {useMessage} from "@/store/modules/message";
  import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard';

  // import { updateColorWeak } from '@/logics/theme/updateColorWeak';
  // import { updateGrayMode } from '@/logics/theme/updateGrayMode';
  import defaultSetting from '@/settings/projectSetting';

  export default defineComponent({
    name: 'SettingFooter',
    components: { CopyOutline, ArrowRedoOutline },
    setup() {
      const permissionStore = usePermissionStore();
      // const { prefixCls } = useDesign('setting-footer');
      const { t } = useI18n();
      const createMessage = useMessage();
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();

      function handleCopy() {
        const { isSuccessRef } = useCopyToClipboard(
          JSON.stringify(unref(appStore.getProjectConfig), null, 2),
        );
        unref(isSuccessRef) &&
        createMessage.success({
            title: t('layout.setting.operatingTitle'),
            content: t('layout.setting.operatingContent'),
          });
      }
      function handleResetSetting() {
        try {
          appStore.setProjectConfig(defaultSetting);
          const { colorWeak, grayMode } = defaultSetting;
          // updateTheme(themeColor);
          // updateColorWeak(colorWeak);
          // updateGrayMode(grayMode);
          createMessage.success({content:t('layout.setting.resetSuccess')});
        } catch (error: any) {
          createMessage.error(error);
        }
      }

      function handleClearAndRedo() {
        localStorage.clear();
        appStore.resetAllState();
        permissionStore.resetState();
        tabStore.resetState();
        userStore.resetState();
        location.reload();
      }
      return {
        t,
        handleCopy,
        handleResetSetting,
        handleClearAndRedo,
      };
    },
  });
</script>
<style lang="less" scoped>
  //@prefix-cls: ~'@{namespace}-setting-footer';

  .prefix-cls{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

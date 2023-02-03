<template>
  <n-space justify="space-between" style="margin: 12px 0">
    <span> {{ title }}</span>
    <n-switch
        rubber-band
        :value="def"
        @update:value="handleChange"
        :disabled="disabled"
        :checkedChildren="t('layout.setting.on')"
        :unCheckedChildren="t('layout.setting.off')"
    />
  </n-space>
</template>
<script lang="ts">
import {defineComponent, PropType, computed} from 'vue';

import {NSwitch, NSpace} from 'naive-ui';
import {useI18n} from '@/hooks/web/useI18n';
import {baseHandler} from '../handler';
import {HandlerEnum} from '../enum';

export default defineComponent({
  name: 'SwitchItem',
  components: {NSwitch, NSpace},
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
    },
    def: {
      type: Boolean,
    },
  },
  setup(props) {
    // const { prefixCls } = useDesign('setting-switch-item');
    const {t} = useI18n();

    function handleChange(e: ChangeEvent) {
      props.event && baseHandler(props.event, e);
    }

    return {
      t,
      handleChange
    };
  },
});
</script>


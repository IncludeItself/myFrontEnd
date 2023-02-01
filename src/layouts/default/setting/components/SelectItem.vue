<template>
  <n-space justify="space-between" style="margin: 12px 0">
    <span> {{ title }}</span>
    <n-select
      v-bind="getBindValue"
      @update:value="handleChange"
      :disabled="disabled"
      size="small"
      :options="options"
      style="width: 126px"
    />
  </n-space>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';

  import { NSelect,NSpace } from 'naive-ui';
  // import { useDesign } from '@/hooks/web/useDesign';
  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enum';

  export default defineComponent({
    name: 'SelectItem',
    components: { NSelect,NSpace },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      disabled: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      def: {
        type: [String, Number] as PropType<string | number>,
      },
      initValue: {
        type: [String, Number] as PropType<string | number>,
      },
      options: {
        type: Array as PropType<LabelValueOptions>,
        default: () => [],
      },
    },
    setup(props) {
      // const { prefixCls } = useDesign('setting-select-item');
      const getBindValue = computed(() => {
        return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
      });

      function handleChange(e: ChangeEvent) {
        props.event && baseHandler(props.event, e);
      }
      return {
        // prefixCls,
        handleChange,
        getBindValue,
      };
    },
  });
</script>

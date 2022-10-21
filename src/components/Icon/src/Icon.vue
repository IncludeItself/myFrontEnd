<template>
  <span :style="{ fontSize: size }">
    <span ref="elRef" class="iconify m-iconify"></span>
  </span>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref, unref, watch} from 'vue';
import Iconify from '@purge-icons/generated';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: { type: String, required: true },
    size: { type: String, default: '18px' },
  },

  setup(props) {
    const elRef = ref<ElRef>(null);

    const update = async () => {

      const el = unref(elRef);
      if (!el) return;

      await nextTick();

      const svg = Iconify.renderSVG(props.icon, {});
      if (svg) {
        el.textContent = '';
        el.appendChild(svg);
      } else {
        const span = document.createElement('span');
        span.className = 'iconify';
        span.dataset.icon = props.icon;
        el.textContent = '';
        el.appendChild(span);
      }
    };

    watch(() => props.icon, update, { flush: 'post' });

    onMounted(update);

    return {elRef};
  },
});
</script>

<style scoped lang="less">
.m-iconify {
  vertical-align: middle;
}
</style>

<template>
  <n-space vertical style="position: relative;top: 8px">
    <div style="position: relative">
      <span :style="{ fontSize: size}" ref="elRef" class="iconify m-iconify"></span>
    </div>
    <div style="position: relative;top: -6px" >
      <span :style="{ fontSize: textSize,margin:'0',verticalAlign:'top' }">{{ text }}</span>
    </div>
  </n-space>

</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref, unref, watch} from 'vue';
import Iconify from '@purge-icons/generated';
import {NSpace} from 'naive-ui';

export default defineComponent({
  name: 'IconWithText',
  props: {
    icon: {type: String, required: true},
    size: {type: String, default: '18px'},
    text: {type: String,default:null},
    textSize: {type: String, default: '10px'}
  },
  components:{NSpace},
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

    watch(() => props.icon, update, {flush: 'post'});

    onMounted(update);

    return {elRef};
  },
});
</script>

<style scoped lang="less">
.m-iconify {
  vertical-align: bottom;
  line-height: 1px;
}
</style>

<template>
  <div class="prefix-cls" :style="getWrapStyle">
    <n-spin :spinning="loading" size="large" :style="getWrapStyle">
      <iframe
          :src="frameSrc"
          class="prefix-cls__main"
          ref="frameRef"
          @load="hideLoading"
      ></iframe>
    </n-spin>
  </div>
</template>
<script lang="ts" setup>
import {NSpin} from 'naive-ui';
import type {CSSProperties} from 'vue';
import {ref, unref, computed} from 'vue';
import {useWindowSizeFn} from '@/hooks/event/useWindowSizeFn';
import {propTypes} from '@/utils/propTypes';
import {useLayoutHeight} from '@/layouts/default/content/useContentViewHeight';

defineProps({
  frameSrc: propTypes.string.def(''),
});

const loading = ref(true);
const topRef = ref(50);
const heightRef = ref(window.innerHeight);
const frameRef = ref<HTMLFrameElement>();
const {headerHeightRef} = useLayoutHeight();

useWindowSizeFn<void>(calcHeight, 150, {immediate: true});

const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `${unref(heightRef)}px`,
  };
});

function calcHeight() {
  const iframe = unref(frameRef);
  if (!iframe) {
    return;
  }
  const top = headerHeightRef.value;
  topRef.value = top;
  heightRef.value = window.innerHeight - top;
  const clientHeight = document.documentElement.clientHeight - top;
  iframe.style.height = `${clientHeight}px`;
}

function hideLoading() {
  loading.value = false;
  calcHeight();
}
</script>
<style lang="less" scoped>

.prefix-cls {

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    //background-color: @component-background;
    border: 0;
    box-sizing: border-box;
  }
}
</style>

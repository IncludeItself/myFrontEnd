<template>
        <div class="layout-header-trigger layout-header-trigger-min">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-icon size="18">
                <component :is="fullscreenIcon" @click="toggleFullScreen" />
              </n-icon>
            </template>
            <span>全屏</span>
          </n-tooltip>
        </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "FullScreenBtn",

  setup() {

  }

});
</script>

<style scoped>

</style>

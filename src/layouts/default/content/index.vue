<template>
  <n-layout-content :native-scrollbar="false"
                    :style="{height: isFullscreen?'100vh':`${getViewHeight}px`,padding:'0',margin:'0 0'}"
                    id="page"
  >
    <PageLayout/>
  </n-layout-content>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NLayoutContent, NSpace} from 'naive-ui';
import {useContentViewHeight} from "@/layouts/default/content/useContentViewHeight";
import PageLayout from "../../page/index.vue";
import {useFullscreen} from "@vueuse/core";

export default defineComponent({
  name: "LayoutContent",
  components: {NLayoutContent, NSpace, PageLayout},
  setup() {
    const {isFullscreen } = useFullscreen();
    const {getViewHeight} = useContentViewHeight();
    return {getViewHeight,isFullscreen};
  }
});
</script>


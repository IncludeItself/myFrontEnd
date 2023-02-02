<template>
  <n-layout-content :native-scrollbar="false" :style="{height: `${getViewHeight}px`,padding:'0',margin:'0 0'}">
    <PageLayout/>
  </n-layout-content>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NLayoutContent, NSpace} from 'naive-ui';
import {useContentViewHeight} from "@/layouts/default/content/useContentViewHeight";
import PageLayout from "../../page/index.vue";

export default defineComponent({
  name: "LayoutContent",
  components: {NLayoutContent, NSpace, PageLayout},
  setup() {
    const {getViewHeight} = useContentViewHeight();
    return {getViewHeight};
  }
});
</script>


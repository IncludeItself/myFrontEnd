<template>
  <n-layout-content :native-scrollbar="false" :style="{height: `${getViewHeight}px`}">
    <div class="main-view">
      <router-view/>
    </div>
  </n-layout-content>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NLayoutContent, NSpace} from 'naive-ui';
import {useContentViewHeight} from "@/layouts/default/content/useContentViewHeight";


export default defineComponent({
  name: "LayoutContent",
  components: {NLayoutContent, NSpace},
  setup() {
    const {getViewHeight}=useContentViewHeight();
    return {getViewHeight};
  }
});
</script>


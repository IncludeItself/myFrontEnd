<template>
  <n-layout-content :native-scrollbar="false">
    <div class="main-view">
      <router-view/>
    </div>
  </n-layout-content>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NLayoutContent, NSpace} from 'naive-ui';

export default defineComponent({
  name: "LayoutContent",
  components: {NLayoutContent, NSpace},
  setup() {
    return {};
  }
});
</script>


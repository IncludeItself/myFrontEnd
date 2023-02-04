<template>
  <n-drawer to="#page"
            v-model:show="isOpen"
            :block-scroll="false"
            :resizable="true"
            :show-mask="false"
            :mask-closable="false"
  >
    <n-drawer-content :native-scrollbar="false">
      <n-space justify="start">
        <JobTabs/>
      </n-space>
    </n-drawer-content>

  </n-drawer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NDrawer, NDrawerContent, NSpace} from "naive-ui";
import {useJobDrawer} from "./useJobDrawer";
import JobTabs from "./JobTabs.vue";

export default defineComponent({
  name: "JobDrawer",
  components: {JobTabs, NDrawer, NDrawerContent, NSpace},
  setup() {
    const {isOpen,toggle} = useJobDrawer();
    return {isOpen,toggle};
  }
});
</script>


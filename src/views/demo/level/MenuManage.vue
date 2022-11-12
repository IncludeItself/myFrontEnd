<template>
  <n-tree
      :data="backMenuList"
      :render-label="renderLabel"
      key-field="path"
  />

</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {usePermissionStore} from "@/store/modules/permission";
import {NTree, TreeOption} from 'naive-ui';
import {useI18n} from "@/hooks/web/useI18n";

export default defineComponent({
  name: 'MenuManage',
  components: {NTree},
  setup() {
    const {t}=useI18n();
    const permissionStore = usePermissionStore();
    const backMenuList = computed(() => permissionStore.getBackMenuList);
    console.log("backMenuList",backMenuList);
    const renderLabel = ({option}: { option: TreeOption }) => {
      return t(option.meta.title);
    };
    return {
      backMenuList,
      renderLabel
    }
  }
});
</script>

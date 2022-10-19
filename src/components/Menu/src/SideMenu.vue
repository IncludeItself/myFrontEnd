<template>
  <n-menu
      v-if="true"
      :options="menuOption"
      :render-label="renderLabel"
      :render-icon="renderIcon"
      :render-extra="renderKey"
      key-field="path"
      collapsed-icon-size="24"
      on-update:value="handleChanged"

  />
</template>

<script lang="ts">
import {defineComponent,h} from "vue";
import {usePermissionStore} from "@/store/modules/permission";
import {useI18n} from "@/hooks/web/useI18n";
import {NMenu} from 'naive-ui';
import {useGo} from "@/hooks/web/usePage";
const go = useGo();
const {t} =useI18n();

export default defineComponent({
  name: "SideMenu",
  components:{NMenu},
  setup() {
    let selectedKdy='';
    const permissionStore=usePermissionStore();
    const menuOption=permissionStore.getFrontMenuList;
    const renderLabel=(option)=>{
      return t(option.meta.title);
    };
    const renderIcon=(option)=>{
      return null;
    };
    const renderKey=(option)=>{
      return {key:option.path};
    };
    const handleChanged=(key: string)=>{
      console.log("key",key);
      if(selectedKdy===key){
        return
      }
      go(key);
    };
    return {
      menuOption,
      renderLabel,
      renderIcon,
      renderKey,
      handleChanged,
      t
    };
  }
});
</script>

<style scoped>

</style>

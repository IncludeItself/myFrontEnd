<template>
  <n-menu
      v-if="true"
      :options="menuOption"
      :render-label="renderLabel"
      :render-icon="renderIcon"
      :key="path"
      key-field="path"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :indent="24"
      :on-update:value="handleChanged"
      mode="vertical"
      :inverted="true"
      style="overflow: hidden"

  />
</template>

<script lang="ts">
import {defineComponent,h} from "vue";
import {usePermissionStore} from "@/store/modules/permission";
import {useI18n} from "@/hooks/web/useI18n";
import {NMenu} from 'naive-ui';
import {useGo} from "@/hooks/web/usePage";
import Icon from "@/components/Icon";
import {useAppStore} from "@/store/modules/app";
const {t} =useI18n();

export default defineComponent({
  name: "SideMenu",
  components:{NMenu,Icon},
  setup() {
    let selectedKdy='';
    const permissionStore=usePermissionStore();
    const menuOption=permissionStore.getFrontMenuList;
    const renderLabel=(option)=>{
      return t(option.meta.title);
    };
    const renderIcon=(option)=>{
      return h(Icon,{icon:option.meta.icon});
    };

    const go = useGo();

    const handleChanged=(key: string,item)=>{
      if(item.hasOwnProperty('children')) return;
      if(selectedKdy===key){
        return;
      }
      go(key);
    };
    return {
      menuOption,
      renderLabel,
      renderIcon,
      handleChanged,
      t
    };
  }
});
</script>

<style lang="less" scoped>
  //.menuItemCls{
  //  display: block;
  //  height: 1040px;
  //}
</style>

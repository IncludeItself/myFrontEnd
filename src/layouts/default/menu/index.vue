<template>
  <n-menu
      v-if="true"
      :options="menusRef"
      :render-label="renderLabel"
      :render-icon="renderIcon"
      key-field="path"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :indent="16"
      :on-update:value="handleMenuClick"
      mode="vertical"
      style="overflow: hidden"
      :collapsed="collapsed"
      inverted
  />
</template>

<script lang="ts">
import {defineComponent, h, ref, toRef} from "vue";
import {useI18n} from "@/hooks/web/useI18n";
import {MenuOption, NMenu} from 'naive-ui';
import {useGo} from "@/hooks/web/usePage";
import Icon from "@/components/Icon";
import { useSplitMenu } from './useLayoutMenu';
import {MenuSplitTyeEnum} from "@/enums/menuEnum";
const {t} =useI18n();

export default defineComponent({
  name: "LayoutMenu",
  components:{NMenu,Icon},
  props:{
    splitType: {
      type: Number as PropType<MenuSplitTyeEnum>,
      default: MenuSplitTyeEnum.NONE,
    },
    collapsed:{
      type:Boolean
    }
  },
  setup(props) {
    const { menusRef } = useSplitMenu(toRef(props, 'splitType'));
    const renderLabel=(option)=>{
      return t(option.meta.title);
    };
    const renderIcon=(option)=>{
      return h(Icon,{icon:option.meta.icon});
    };

    const go = useGo();

    function handleMenuClick(key: string) {
      go(key);
    }
    return {
      menusRef,
      renderLabel,
      renderIcon,
      handleMenuClick,
      t
    };
  }
});
</script>

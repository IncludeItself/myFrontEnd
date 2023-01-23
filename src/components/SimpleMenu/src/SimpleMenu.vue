<template>
  <n-space vertical>
    <n-tag :bordered="false">
      爱在西元前
    </n-tag>
<!--    {{items}}-->
    <n-menu :options="items"
            :render-label="renderLabel"
            :render-icon="renderIcon"
            key-field="path"
            mode="vertical"
    />
    <span>dffffffff</span>

  </n-space>
</template>

<script lang="ts">
import {defineComponent, h} from "vue";
import {NSpace,NTag,NMenu} from 'naive-ui';
import Icon from "@/components/Icon";
import {useI18n} from "@/hooks/web/useI18n";

export default defineComponent({
  name: "SimpleMenu",
  components: {NSpace,NTag,NMenu},
  props:['items'],
  setup() {
    const { t } = useI18n();
    const renderLabel=(option)=>{
      return t(option.meta.title);
    };
    const renderIcon=(option)=>{
      return h(Icon,{icon:option.meta.icon});
    };
    return {
      renderLabel,
      renderIcon
    };
  }
});
</script>



<template>
  <n-layout style="height: 100vh" embedded>
    <n-layout-header style="height: 5vh">
      <n-tag :bordered="false" style="width: 100%;margin: auto;text-align: center">
        爱在西元前
      </n-tag>
    </n-layout-header>
    <n-layout-content style="height: 95vh" :native-scrollbar="false" embedded>

      <!--    {{items}}-->
      <n-menu :options="items"
              :render-label="renderLabel"
              :render-icon="renderIcon"
              key-field="path"
              mode="vertical"
              :collapsed="false"
              indent="1px"
      />

    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
import {defineComponent, h} from "vue";
import {NSpace, NTag, NMenu, NCard, NScrollbar, NLayout, NLayoutContent, NLayoutHeader} from 'naive-ui';
import Icon from "@/components/Icon";
import {useI18n} from "@/hooks/web/useI18n";

export default defineComponent({
  name: "SimpleMenu",
  components: {NSpace, NTag, NMenu, NCard, NScrollbar, NLayout, NLayoutContent, NLayoutHeader},
  props: ['items'],
  setup() {
    const {t} = useI18n();
    const renderLabel = (option) => {
      console.log("t(option.meta.title)", t(option.meta.title));
      return t(option.meta.title);
    };
    const renderIcon = (option) => {
      return h(Icon, {icon: option.meta.icon});
    };
    return {
      renderLabel,
      renderIcon
    };
  }
});
</script>



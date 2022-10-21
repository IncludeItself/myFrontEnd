<template>
<div @click="openDrawer">
  <n-tooltip placement="bottom-end">
    <template #trigger>
      <n-icon size="18" style="font-weight: bold">
        <SettingsOutline/>
      </n-icon>
    </template>
    <span>项目配置</span>
  </n-tooltip>

  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" :native-scrollbar="false">
      <Setting/>
    </n-drawer-content>
  </n-drawer>
</div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Setting from "../setting/components/AppSettings.vue";
import {NDrawer,NDrawerContent,NIcon,NTooltip} from 'naive-ui';
import {SettingsOutline} from '@vicons/ionicons5';

export default defineComponent({
  name: "SettingDrawerBtn",
  components: {Setting,NDrawer,NDrawerContent,NIcon,NTooltip,SettingsOutline},
  props: {
    title: {
      type: String,
      default: '项目配置',
    },
    width: {
      type: Number,
      default: 280,
    },
    placement:{
      type:String,
      default:'right',
    }
  },

  setup(props) {
    const isDrawer=ref<Boolean>(false);
    function openDrawer(){
      isDrawer.value=true;
    }

    return {
      openDrawer,
      isDrawer
    }

  }

});
</script>

<style scoped>

</style>

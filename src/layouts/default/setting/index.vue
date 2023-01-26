<template>
    <n-button text style="outline: 0px;margin-left: 8px" :focusable="false" ghost @click="openDrawer">
      <template #icon>
        <Icon icon="ion:settings-outline"/>
      </template>
    </n-button>
    <SettingDrawer/>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import {NButton} from "naive-ui";
import SettingDrawer from './SettingDrawer';
import Icon from '@/components/Icon';
import {openDrawer} from "./SettingDrawer";

export default defineComponent({
  name: 'SettingButton',
  components: {SettingDrawer, Icon,NButton},
  setup() {
    const isOpen = ref<Boolean>(false);

    return {
      openDrawer,
      isOpen
    };
  },
});
</script>

<template>
  <div @click="openDrawer">
    <Icon icon="ion:settings-outline"/>
    <SettingDrawer/>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import SettingDrawer from './SettingDrawer';
import Icon from '@/components/Icon';
import {openDrawer} from "./SettingDrawer";

export default defineComponent({
  name: 'SettingButton',
  components: {SettingDrawer, Icon},
  setup() {
    const isOpen=ref<Boolean>(false);

    return {
      openDrawer,
      isOpen
    };
  },
});
</script>

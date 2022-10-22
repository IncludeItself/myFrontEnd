<template>
  <div @click="openDrawer">
    <Icon icon="ion:settings-outline"/>
    <SettingDrawer :show="isOpen"/>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import SettingDrawer from './SettingDrawer';
import Icon from '@/components/Icon';


export default defineComponent({
  name: 'SettingButton',
  components: {SettingDrawer, Icon},
  setup() {
    const isOpen=ref<Boolean>(false);
    function openDrawer(){
      isOpen.value=true;
    }

    return {
      openDrawer,
      isOpen
    };
  },
});
</script>

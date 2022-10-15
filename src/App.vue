<template>
  <ConfigProvider>
    <AppProvider>

      <RouterView/>

    </AppProvider>


  </ConfigProvider>

</template>

<script setup lang="ts">
import ConfigProvider from '@/components/Application/src/ConfigProvider.vue';
import AppProvider from "@/components/Application/src/AppProvider.vue";

import HelloWorld from './components/HelloWorld.vue';
import {useDesignStore} from "@/store/modules/design";
import {computed} from "vue";
import AppLocalePicker from "@/components/Application/src/AppLocalePicker.vue";
import {useLocaleStoreWithOut} from "@/store/modules/locale";
import {ThemeEnum} from "@/enums/appEnum";


const localStore = useLocaleStoreWithOut();

const designStore = useDesignStore();

const active = computed<boolean>({
  get: () => {
    return designStore.getTheme == ThemeEnum.LIGHT;
  },
  set: (value) => {
    designStore.setTheme(value ? ThemeEnum.LIGHT : ThemeEnum.DARK);
  }
});


</script>


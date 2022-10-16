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
</script>


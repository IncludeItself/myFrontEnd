<template>
  <n-card :title="t(item.meta.title)" size="small">


  </n-card>

</template>

<script lang="ts" setup>
import type {AppRouteRecordRaw, Menu} from '@/router/types';
import {NCard} from 'naive-ui';
import {useI18n} from "@/hooks/web/useI18n";
const {t}=useI18n();
const props=defineProps({
  item: Object as PropType<Nullable<AppRouteRecordRaw>>
});

</script>

<style lang="less" scoped>

</style>

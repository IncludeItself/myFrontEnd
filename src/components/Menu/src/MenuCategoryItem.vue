<template>
  <n-card :title="t(item.meta.title)" size="small">
    <span>hehe</span>

  </n-card>

</template>

<script lang="ts" setup>
import type {Menu} from '@/router/types';
import {NCard} from 'naive-ui';
import {useI18n} from "@/hooks/web/useI18n";
const {t}=useI18n();
const props=defineProps({
  item: Object as PropType<Nullable<Menu>>
});

</script>

<style lang="less" scoped>

</style>

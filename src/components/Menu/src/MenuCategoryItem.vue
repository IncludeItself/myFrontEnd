<template>
  <n-card :title="t(item.title)" size="small">
    <n-button class="menu"
              size="small"
              :bordered="false"
              v-if="hasChildren(item)"
              v-for="menu in item.children"
              :key="menu.meta.orderNo"
              @click="handleClick(menu.path)"
              strong secondary
    >
      {{ t(menu.title) }}
    </n-button>

    <n-button class="menu" v-else size="small" :bordered="false" @click="handleClick(item.path)" strong secondary>
      {{ t(item.title) }}
    </n-button>

  </n-card>

</template>

<script lang="ts" setup>
import type {Menu} from '@/router/types';
import {NCard, NButton} from 'naive-ui';
import {useI18n} from "@/hooks/web/useI18n";
import {useGo} from '@/hooks/web/usePage';

const {t} = useI18n();
const go = useGo();
const props = defineProps({
  item: Object as PropType<Nullable<Menu>>
});

const hasChildren = (route: Menu): Boolean => {
  return route.hasOwnProperty('children') && !!route.children;
};

const handleClick = (path: string) => {
  go(path);
};

</script>

<style lang="less" scoped>
.menu {
  margin: 2px;
}
</style>

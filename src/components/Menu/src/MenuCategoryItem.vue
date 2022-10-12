<template>
  <n-card :title="t(item.meta.title)" size="small">
    <n-tag class="menu"
           size="small"
           :bordered="false"
           v-if="hasChildren(item)"
           v-for="menu in item.children"
           :key="menu.meta.orderNo"
           @click="handleClick(menu.path)"
    >
      {{t(menu.meta.title)}}
    </n-tag>

    <n-tag class="menu" v-else size="small" :bordered="false">
      {{t(item.meta.title)}}
    </n-tag>

  </n-card>

</template>

<script lang="ts" setup>
import type {AppRouteRecordRaw, Menu} from '@/router/types';
import {NCard,NTag} from 'naive-ui';
import {useI18n} from "@/hooks/web/useI18n";
import {useGo} from '@/hooks/web/usePage';
const {t}=useI18n();
const go=useGo();
const props=defineProps({
  item: Object as PropType<Nullable<AppRouteRecordRaw>>
});

const hasChildren=(route:AppRouteRecordRaw):Boolean=>{
  return route.hasOwnProperty('children') && !!route.children;
};

const handleClick=(path:string)=>{
  go(path);
  // go('/about');
  // console.log("path",path);
};

</script>

<style lang="less" scoped>
.menu{
  margin: 2px;
}
</style>

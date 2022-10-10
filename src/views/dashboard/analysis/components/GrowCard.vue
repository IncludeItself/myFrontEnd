<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <NCard
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <NTag :color="item.color">{{ item.action }}</NTag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <n-number-animation :from="1" :to="item.value" class="text-2xl" />
<!--          <Icon :icon="item.icon" :size="40" />-->
<!--          <Icon>-->


<!--          </Icon>-->
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <n-number-animation :from="1" :to="item.total" />
        </div>
      </NCard>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { NTag, NCard,NNumberAnimation} from 'naive-ui';
  import { growCardList } from '../data';
  import {Icon} from "@vicons/utils";

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>

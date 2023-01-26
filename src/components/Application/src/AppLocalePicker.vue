<!--
 * @Author: Vben
 * @Description: Multi-language switching component
-->
<template>
  <n-popselect
      v-model:value="selectedKey"
      placement="bottom"
      trigger="click"
      :options="localeList"
      :on-update:value="handleMenuEvent"
  >

    <n-button text style="outline: 0px;margin-left: 8px" :focusable="false" ghost>
      <template #icon>
        <Icon icon="ion:language"/>
      </template>
    </n-button>
  </n-popselect>
</template>
<script lang="ts" setup>
import type {LocaleType} from '#/config';
import {NPopselect, NButton, NSpace} from 'naive-ui';
import Icon from '@/components/Icon';
import {useLocale} from '@/locales/useLocale';
import {useLocaleStore} from "@/store/modules/locale";
import {localeList} from '@/settings/localeSetting';
import {computed, ref, unref, watchEffect} from "vue";

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: {type: Boolean, default: false},
  /**
   * Whether to refresh the interface when changing
   */
  reload: {type: Boolean},
});

const localStore = useLocaleStore();

const selectedKey = ref<string>('');

const {changeLocale} = useLocale();

const getLocaleText = computed(() => {
  return localeList.find((item) => item.key === unref(localStore.getLocale))?.label;
});

watchEffect(() => {
  selectedKey.value = unref(localStore.getLocale);
});

async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType);
  selectedKey.value = lang;
  props.reload && location.reload();
}

function handleMenuEvent(key: string | number) {
  if (unref(localStore.getLocale) === key) {
    return;
  }
  toggleLocale(key as LocaleType);
}
</script>


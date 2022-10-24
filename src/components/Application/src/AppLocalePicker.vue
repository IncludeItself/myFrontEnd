<!--
 * @Author: Vben
 * @Description: Multi-language switching component
-->
<template>
  <NDropdown
      placement="bottom"
      trigger="click"
      :options="localeList"
      @select="handleMenuEvent"
  >
<!--    <NButton size="small" v-bind="$attrs" :bordered="false">-->
<!--      <template #icon>-->
    <div>
        <Icon style="margin: 10px">
          <Language/>
        </Icon>
<!--      </template>-->
      <span v-if="showText">{{ getLocaleText }}</span>
<!--    </NButton>-->
    </div>
  </NDropdown>
</template>
<script lang="ts" setup>
import type {LocaleType} from '#/config';
import {NDropdown, NButton,NSpace} from 'naive-ui';
import {Icon} from '@vicons/utils'
import {useLocale} from '@/locales/useLocale';
import {useLocaleStore} from "@/store/modules/locale";
import {localeList} from '@/settings/localeSetting';
import {computed, ref, unref, watchEffect} from "vue";
import {Language} from '@vicons/ionicons5'

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


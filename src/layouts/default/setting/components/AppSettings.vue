<template>
  <AppThemeToggle/>
  <SwitchItem :event="HandlerEnum.CHANGE_THEME" :title="t('layout.setting.sysTheme')"/>


</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import SwitchItem from "./SwitchItem.vue";
import {HandlerEnum} from '../enum';
import {useI18n} from "@/hooks/web/useI18n";
import AppThemeToggle from "@/components/Application/src/AppThemeToggle.vue";

export default defineComponent({
  name: "AppSettings",
  components: {AppThemeToggle, SwitchItem},
  setup() {
    const {t} = useI18n();
    return {t, HandlerEnum}
  }

});
</script>

<style scoped>

</style>

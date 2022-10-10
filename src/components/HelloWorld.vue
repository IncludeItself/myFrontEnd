<template>
  <span>Helloworld from here</span>
  <AppLocalePicker/>
  <div>
    <span>{{t('common.loadingText')}}</span>
  </div>
  <span>Helloworld ends</span>

</template>

<script setup lang="ts">
import {useI18n} from "@/hooks/web/useI18n";
import {AppLocalePicker} from "@/components/Application";
const {t}=useI18n();
// import { ref } from 'vue'

// defineProps<{ msg: string }>()

// const count = ref(0)
</script>


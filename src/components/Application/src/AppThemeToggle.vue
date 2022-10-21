<template>
  <n-switch :value="isDarkTheme" :rail-style="railStyle" @update:value="isDarkTheme=!isDarkTheme">
    <template #checked>
      <Icon color='#ffdd63'>
        <Moon/>
      </Icon>
    </template>
    <template #unchecked>
      <Icon color='#ffdd63'>
        <Sunny/>
      </Icon>
    </template>
  </n-switch>
</template>
<script lang="ts" setup>
import {computed, CSSProperties} from 'vue';
import {useDesignStoreWithOut} from "@/store/modules/design";
import {NSwitch} from 'naive-ui';
// import {useRootSetting} from '@/hooks/setting/useRootSetting';
import {ThemeEnum} from "@/enums/appEnum";
import {Icon} from "@vicons/utils";
import {Moon,Sunny} from '@vicons/ionicons5'


const designStore = useDesignStoreWithOut();
// const {getShowDarkModeToggle} = useRootSetting();

const isDarkTheme = computed({
  get() {
    return designStore.getDarkTheme;
  },
  set(th) {
    designStore.setDarkTheme(th);
  }
});

const railStyle=({
              focused,
              checked
            }: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {};
  style.borderStyle='inherit';
  if (checked) {
    style.background = '#000000';
    style.borderColor='#ff0000';
  } else {
    style.background = '#000000';
    style.borderColor='#ff0000';
  }
  return style
}

</script>

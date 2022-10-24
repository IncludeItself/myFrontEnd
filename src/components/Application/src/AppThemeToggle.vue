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
import {NSwitch} from 'naive-ui';
import {useAppStore} from "@/store/modules/app";
import {ThemeEnum} from "@/enums/appEnum";
import {Icon} from "@vicons/utils";
import {Moon, Sunny} from '@vicons/ionicons5'


const appStore = useAppStore();
// const {getShowDarkModeToggle} = useRootSetting();

const isDarkTheme = computed({
  get() {
    return appStore.getDarkMode===ThemeEnum.DARK;
  },
  set(th) {
    appStore.setDarkMode(th?ThemeEnum.DARK:ThemeEnum.LIGHT);
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

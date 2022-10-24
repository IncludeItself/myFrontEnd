<script lang="ts">
import {darkTheme, lightTheme, NConfigProvider} from 'naive-ui';
import {computed, defineComponent, h, unref} from 'vue';
import {useLocaleStore} from "@/store/modules/locale";
import {useAppStore} from "@/store/modules/app";
import {ThemeEnum} from "@/enums/appEnum";


export default defineComponent({
  name: "ConfigProvider",
  components: {NConfigProvider},
  setup(props, {slots}) {

    const localStore = useLocaleStore();
    const appStore=useAppStore();
    const getBindValues = computed(() => {
      return {
        locale: localStore.getGlobalLocale,
        "date-locale": localStore.getGlobalDateLocale,
        theme: unref(appStore.getDarkMode===ThemeEnum.DARK?darkTheme:lightTheme),
        "theme-overrides": unref(appStore.getThemeOverrides)
      }
    });
    return () => {
      return h(NConfigProvider, getBindValues.value, {default: ()=> slots.default?.()})
    }
  }
});
</script>


<script lang="ts">
import {NConfigProvider} from 'naive-ui';
import {computed, defineComponent, h, unref} from 'vue';
import {useLocaleStore} from "@/store/modules/locale";
import {useDesignStore} from "@/store/modules/design";


export default defineComponent({
  name: "ConfigProvider",
  components:{NConfigProvider},
  setup(props,{slots}) {

    const localStore = useLocaleStore();
    const designStore = useDesignStore();
    const getBindValues = computed(() => {
      return {
        locale: localStore.getGlobalLocale,
        "date-locale": localStore.getGlobalDateLocale,
        theme: unref(designStore.getNaiveTheme),
        // theme:lightTheme,
        "theme-overrides": designStore.getThemeOverrides
      }
    });
    return ()=>{
      return h(NConfigProvider,getBindValues.value,{default:()=>slots.default?.()})
    }
  }
});
</script>


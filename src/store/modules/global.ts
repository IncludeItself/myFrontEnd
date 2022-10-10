import {defineStore} from "pinia";
import {GlobalTheme, NLocale, NDateLocale, enUS, lightTheme, dateEnUS} from "naive-ui";
import {designSetting} from "#/config";
import {useDesignStore} from "@/store/modules/design";
import {deepMerge} from "@/utils";

const designStore=useDesignStore();

type GlobalProp={
    theme:GlobalTheme;
    "theme-overrides":designSetting;
    locale:NLocale;
    "date-locale":NDateLocale
}

interface GlobalState {
    globalProps: GlobalProp;
}


export const useLocaleStore = defineStore('app-global',{
    state:():GlobalState=>({
        globalProps:{
            theme:lightTheme,
            "theme-overrides":designStore.getThemeOverrides,
            locale:enUS,
            "date-locale":dateEnUS
        }
    }),

    getters:{
        getGlobalProps():GlobalProp{
            return this.globalProps;
        }

    },
    actions:{
        setGlobalProps(props:Partial<GlobalProp>){
            this.globalProps=deepMerge(this.globalProps||{},props);
        }

    }

});

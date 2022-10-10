import type {DropdownOption} from 'naive-ui';
import type {LocaleSetting, LocaleType, DateLocaleType} from '#/config';


export const LOCALE: { [key: string]: LocaleType } = {
    ZH_CN: 'zhCN',
    EN_US: 'enUS',
};

export const DATELOCALE: { [key: string]: DateLocaleType } = {
    ZH_CN: 'dateZhCN',
    EN_US: 'dateEnUS',
};

export const localeSetting: LocaleSetting = {
    showPicker: true,
    // Locale
    locale: LOCALE.EN_US,

    dateLocale: DATELOCALE.EN_US,
    // Default locale
    fallback: LOCALE.ZH_CN,
    // available Locales
    availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};



// locale list
export const localeList: DropdownOption[] = [
    {
        label: '简体中文',
        key: LOCALE.ZH_CN,
    },
    {
        label: 'English',
        key: LOCALE.EN_US,
    },
];

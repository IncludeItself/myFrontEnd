/**
 * Multi-language related operations
 */
import type {DateLocaleType, LocaleType} from '#/config';

import { i18n } from './setupI18n';
import { useLocaleStoreWithOut } from '@/store/modules/locale';
import { unref, computed } from 'vue';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { NDateLocale, NLocale} from "naive-ui";


interface LangModule {
  message: Recordable,
  naiveLocale:NLocale,
  dateLocale: NDateLocale;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  // localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();


  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;

    const { message,naiveLocale,dateLocale } = langModule;

    localeStore.setGlobalLocale(naiveLocale);
    localeStore.setGlobalDateLocale(dateLocale);
    localeStore.setLocaleInfo({
      dateLocale:naiveLocale.name as DateLocaleType,
      locale
    });

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    changeLocale,
  };
}

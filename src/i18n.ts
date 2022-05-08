import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import languages from "./locales/index";

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  return languages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
  silentTranslationWarn: false,
});

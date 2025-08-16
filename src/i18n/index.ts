import { createI18n } from "vue-i18n";
import en from './en.json';
import id from './id.json';

type Locale = 'en' | 'id'

/**
 * Detect default locale for the user
 */
function detectDefaultLocale():Locale {
    const saved = localStorage.getItem('item') as Locale | null
    if( saved === 'en' || saved === 'id') return saved

    return navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en'
}

/**
 * i18n instance for the app
 * - `Legacy: false` -> using composition API made for vue-i18n
 * - `locale` → detected default locale
 * - `fallbackLocale` → used if the current locale has missing translation keys
 * - `messages` → imported translations
 */
export const i18n = createI18n({
    legacy: false,
    locale: detectDefaultLocale(),
    fallbackLocale: 'en',
    messages: { en,id }
})

/**
 * change the apllication locale at runtime
 * @param locale - The new locale ('en' | 'id')
 */
export function setLocale(locale: Locale) {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
}

// Set the initial <html lang="..."> attribute
document.documentElement.lang = (i18n.global.locale.value as string)
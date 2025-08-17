<template>
    <div>
        <header class="sticky top-0 z-10 bg-brand-primary backdrop-blur border-b border-red-500" role="banner">
        <div class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <img :src="Logo" class="h-10"/>

            <div class="flex items-center gap-2">
                <label for="lang" class="text-sm text-white">{{ t('nav.language') }}</label>
                <select
                id="lang"
                class="rounded-xl cursor-pointer border px-2 py-1 text-sm bg-white"
                :value="locale"
                @change="onChangeLang"
                >
                    <option value="en">{{ t('lang.en') }}</option>
                    <option value="id">{{ t('lang.id') }}</option>
                </select>
            </div>
        </div>
        </header>
        <FiltersBar aria-label="Job filters"/>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/i18n';
import FiltersBar from '@/components/common/FiltersBar.vue';
import Logo from '@/assets/images/maukerja.png';

const { t, locale } = useI18n()

function onChangeLang(e: Event) {
    const value = (e.target as HTMLSelectElement).value as 'en' | 'id'
    setLocale(value)
}
</script>
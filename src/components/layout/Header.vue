<template>
    <header class="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <h1 class="text-lg font-semibold cursor-pointer">AJT</h1>

            <div class="flex items-center gap-2">
                <label for="lang" class="text-sm text-gray-600">{{ t('nav.language') }}</label>
                <select
                id="lang"
                class="rounded-lg border px-2 py-1 text-sm bg-white"
                :value="locale"
                @change="onChangeLang"
                >
                    <option value="en">{{ t('lang.en') }}</option>
                    <option value="id">{{ t('lang.id') }}</option>
                </select>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/i18n';

const { t, locale } = useI18n()

function onChangeLang(e: Event) {
    const value = (e.target as HTMLSelectElement).value as 'en' | 'id'
    setLocale(value)
}
</script>
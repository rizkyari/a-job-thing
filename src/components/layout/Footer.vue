<template>
    <footer class="bg-brand-primary backdrop-blur border-t border-red-500">
        <div class="mx-auto max-w-6xl px-4 py-4 text-sm text-white text-center">
            {{ t('copyright.copyright') }} &copy; {{ year }} A Job Thing -- Demo. {{ t('copyright.desc') }}
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const year = new Date().getFullYear()
</script>
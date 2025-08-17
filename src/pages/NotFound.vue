<template>
    <section class="min-h-[65vh] flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-5xl font-bold text-brand-dark">{{ t('notFound.code') }}</h1>
            <p class="mt-2 text-brand-dark/70">{{ t('notFound.title') }}</p>
            <div class="mt-6 flex items-center justify-center gap-3">
                <RouterLink to="/">
                    <Button variant="primary" class="rounded-md hover:bg-red-400">{{ t('notFound.toHome') }}</Button>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
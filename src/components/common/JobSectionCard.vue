<template>
  <Card class="mt-4">
    <h2 class="pl-4 pr-4 pt-4 font-semibold mb-2">{{ title }}</h2>
    <div class="border-t-4 border-brand-bg my-2"/>
    <div class="p-4 text-sm text-gray-800 whitespace-pre-line">
      {{ text || '—' }}
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
defineProps<{ title: string; text?: string | null }>()
</script>
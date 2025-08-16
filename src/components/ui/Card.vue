<template>
    <div
    class="rounded-2xl bg-white shadow-soft"
    :class="props.padding ? 'p-4' : ''"
    >
        <slot/>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        padding?: boolean
    }>()
</script>
<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost'
const props = withDefaults(defineProps<{
    as?: 'button' | 'a',
    href?: string,
    disabled?: boolean,
    loading?: boolean,
    variant?: Variant
}>(), { as: 'button', variant: 'primary'})
</script>

<template>
    <component
    :is="props.as"
    :href="props.as === 'a' ? href : undefined"
    :disabled="props.as === 'button' ? disabled || loading : undefined"
    class="inline-flex items-center justify-center rounded-lg px-3 py-2 transition border text-sm cursor-pointer"
    :class="{
        'bg-black text-white border-black': variant === 'primary',
        'bg-white text-black border-gray-300': variant === 'secondary',
        'bg-transparent text-black border-transparent': variant === 'ghost',
        'opacity-60 pointer-events-none': disabled || loading
    }"
    >
        <slot />
    </component>
</template>
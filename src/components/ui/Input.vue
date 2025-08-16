<template>
    <input
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="classes"
    :value="modelValue"
    @input="onInput"
    @keydown="onKeydown"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'pill' | 'base'
type Size = 'sm' | 'md'

const props = withDefaults(defineProps<{
    modelValue?: string | number
    type?: string
    placeholder?: string
    name?: string
    disabled?: boolean
    invalid?: boolean
    variant?: Variant
    size?: Size
}>(), {
    type: 'text',
    variant: 'pill',
    size: 'md'
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
    (e: 'enter'): void
}>()

const classes = computed(() => {
    const base = [
        'w-full text-sm bg-white border outline-none transition',
        props.variant === 'pill' ? 'rounded-full px-4' : 'rounded-lg px-3',
        props.size === 'sm' ? 'py-1.5' : 'py-2',
        'border-brand-muted/50 focus:ring-2 ring-brand-primary/60 focus:border-brand-primary/60'
    ]
    if (props.invalid) base.push('border-red-500 ring-red-500')
    if (props.disabled) base.push('opacity-60 pointer-events-none')
    return base.join(' ')
})

function onInput(e: Event) {
    const el = e.target as HTMLInputElement
    const val = props.type === 'number' ? (el.value === '' ? '' : Number(el.value)) : el.value
    emit('update:modelValue', val)
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') emit('enter')
}
</script>
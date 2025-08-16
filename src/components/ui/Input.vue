<template>
    <input
        :type="props.type"
        class="w-full rounded-lg border px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input = "emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue?: string,
    type?: string,
    placeholder?: string,
}>(), {
    type: 'text'
})

const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="relative">
    <select
      :name="name"
      :disabled="disabled"
      :class="classes"
      :value="modelValue === undefined ? '' : String(modelValue)"
      @change="onChange"
    >
      <option v-if="placeholder !== undefined" value="" disabled hidden>
        {{ placeholder }}
      </option>

      <option
        v-for="opt in options"
        :key="String(opt.value)"
        :value="String(opt.value)"
        :disabled="opt.disabled"
      >
        {{ opt.label }}
      </option>
    </select>

    <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/60"
         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.11l3.71-3.88a.75.75 0 111.08 1.04l-4.25 4.45a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'pill' | 'base'
type Size = 'sm' | 'md'
type OptValue = string | number

export interface SelectOption {
  label: string
  value: OptValue
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: OptValue
  options: SelectOption[]
  placeholder?: string
  name?: string
  disabled?: boolean
  invalid?: boolean
  variant?: Variant
  size?: Size
}>(), {
  variant: 'pill',
  size: 'md'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: OptValue | undefined): void
  (e: 'change', value: OptValue | undefined): void
}>()

const classes = computed(() => {
  const base = [
      'w-full text-sm bg-white border outline-none appearance-none transition',
      props.variant === 'pill' ? 'rounded-full px-4' : 'rounded-lg px-3',
      props.size === 'sm' ? 'py-1.5' : 'py-2',
      'border-brand-muted/50 focus:ring-2 ring-brand-primary/60 focus:border-brand-primary/60'
  ]
  if (props.invalid) base.push('border-red-500 ring-red-500')
  if (props.disabled) base.push('opacity-60 pointer-events-none')
  return base.join(' ')
})

function onChange(e: Event) {
  const el = e.target as HTMLSelectElement
  const raw = el.value
  const selected = raw === '' ? undefined : (isNaN(Number(raw)) || raw.trim() === '' ? raw : Number(raw))
  emit('update:modelValue', selected)
  emit('change', selected)
}
</script>
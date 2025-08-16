<template>
    <form @submit="submit" class="bg-white backdrop-blur border-b border-black/5">
        <div class="mx-auto max-w-6xl px-4 py-3 grid gap-3 md:grid-cols-5">
            <Input v-model="q" :placeholder="t('filters.job')" />
            <Input v-model="location" :placeholder="t('filters.location')" />
            <Select v-model="jobType" :options="jobTypeOptions" />
            <Input v-model="minSalary" type="number" :placeholder="t('filters.salary')" />
            <Button type="submit" variant="primary" class="w-full rounded-full sm:w-auto hover:bg-brand-primary/90">{{ t('common.search') }}</Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n';
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Select from '../ui/Select.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const q = ref('')
const location = ref('')
const jobType = ref('')
const minSalary = ref<string | number>('')

onMounted(() => {
    q.value = String(route.query.q ?? '')
    location.value = String(route.query.state ?? '')
    jobType.value = String(route.query.type ?? '')
    minSalary.value = String(route.query.salaryMin ?? '')
})

const jobTypeOptions = computed(() => [
    { label: t('filters.anyType'), value: '' },
    { label: t('filters.fullTime'),   value: 'Full time' },
    { label: t('filters.partTime'),   value: 'Part time' },
    { label: t('filters.contract'),   value: 'Contract' },
])

function submit(e: Event) {
    e.preventDefault()
    router.push({
        path: '/jobs',
        query: {
            q: q.value || undefined,
            state: location.value || undefined,
            type: jobType.value || undefined,
            salaryMin: minSalary.value || undefined,
            page: undefined,
        }
    })
}
</script>
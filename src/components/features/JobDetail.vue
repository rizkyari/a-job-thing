<template>
  <section>
    <JobSummaryCard v-if="jobs.currentJob" :job="jobs.currentJob"/>
    <JobSectionCard
      v-if="jobs.currentJob"
      title="Requirements"
      :text="jobs.currentJob.descriptions?.requirements"
    />
    <JobSectionCard
      v-if="jobs.currentJob"
      title="Responsibilities"
      :text="jobs.currentJob.descriptions?.reponsibilities || jobs.currentJob.descriptions?.reponsibilities"
    />
    <div v-if="jobs.loading" class="mt-6 text-gray-600 text-center">Loading…</div>
    <div v-else-if="jobs.error" class="mt-6 text-red-600">
      {{ error }}
      <Button variant="secondary" class="rounded-md hover:bg-brand-primary hover:text-white" @click="goBack">{{ t('common.back') }}</Button>
    </div>
    <div v-else class="mt-5">
        <Button variant="secondary" class="rounded-md hover:bg-brand-primary hover:text-white" @click="goBack">{{ t('common.back') }}</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { useJobsStore } from '@/stores/jobs'

import JobSummaryCard from '../common/JobSummaryCard.vue'
import JobSectionCard from '../common/JobSectionCard.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const jobs = useJobsStore()

const error = ref<string | null>(null)

/**
 * fetch detail job
 * @param idParam id for job
 */
async function getDetailJob(idParam: unknown) {
    const id = Number(Array.isArray(idParam) ? idParam[0] : idParam)
    if (!Number.isFinite(id)) return
    try {
        await jobs.loadById(id)
    } catch (e) {
        console.error(e)
    }
}

onMounted(() => getDetailJob(route.params.id))
watch(() => route.params.id, getDetailJob)

/**
 * function to go back to job list
 */
function goBack() {
    router.back()
}
</script>

<template>
  <section>
    <div class="mt-6 grid gap-6">
      <div v-if="jobs.loading">
        <Spinner/>
      </div>
      <div v-else-if="jobs.error" class="text-red-600">
        {{ jobs.error }}
        <button class="ml-2 underline" @click="jobs.load()">Retry</button>
      </div>
      <template v-else>
        <JobCard v-for="j in jobs.items" :key="j.id" :job="j" />
      </template>

      <div class="mt-4 flex items-center justify-center gap-2">
        <Button
        variant="secondary"
        class="rounded-md hover:bg-brand-primary/90"
        :disabled="jobs.page <= 1"
        @click="jobs.goToPage(jobs.page - 1)"
        >
          {{ t('filters.prev') }}
        </Button>
          <span class="text-sm text-gray-700">
            {{ t('filters.page') }} {{ jobs.page }} / {{ jobs.lastPage }}
          </span>
        <Button
        variant="secondary"
        class="rounded-md hover:bg-brand-primary/90"
        :disabled="jobs.page >= jobs.lastPage"
        @click="jobs.goToPage(jobs.page + 1)"
        >
          {{ t('filters.next') }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { useI18n } from 'vue-i18n';
import JobCard from '@/components/common/JobCard.vue'
import Button from '../ui/Button.vue'
import Spinner from '../ui/Spinner.vue'

const route = useRoute()
const router = useRouter()
const jobs = useJobsStore()
const { t } = useI18n()

onMounted(async () => {
  jobs.applyQuery(route.query)
  await jobs.load({ page: jobs.page })
})

const pick = (q: any, k: string) =>
  Array.isArray(q?.[k]) ? q[k]?.[0] : q?.[k]

watch(
  () => route.query,
  async (next) => {
    const before = { ...jobs.filters }
    jobs.applyQuery(next)
    const filtersChanged =
      before.q !== jobs.filters.q ||
      before.company !== jobs.filters.company ||
      before.state !== jobs.filters.state ||
      before.salaryMin !== jobs.filters.salaryMin ||
      before.salaryMax !== jobs.filters.salaryMax

    const nextPage = Number(pick(next, 'page') ?? jobs.page)

    if (filtersChanged) {
      await jobs.load({ page: 1 })
    } else {
      await jobs.load({ page: Number.isFinite(nextPage) ? nextPage : 1 })
    }
  },
  { deep: true }
)

watch(
  () => jobs.page,
  (p) => {
    const q = jobs.buildQuery()
    if (q.page !== p) q.page = p
    router.replace({ query: q })
  }
)
</script>

<template>
  <section>
    <!-- <FiltersBar
      :q="jobs.filters.q"
      :location="jobs.filters.state"
      @search="onSearch"
    /> -->

    <div class="mt-6 grid gap-6">
      <div v-if="jobs.loading">Loading…</div>
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
        :disabled="jobs.page <= 1"
        @click="jobs.goToPage(jobs.page - 1)"
        >
          Prev
        </Button>
          <span class="text-sm text-gray-700">
            Page {{ jobs.page }} / {{ jobs.lastPage }}
          </span>
        <Button
        variant="secondary"
        :disabled="jobs.page >= jobs.lastPage"
        @click="jobs.goToPage(jobs.page + 1)"
        >
          Next
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import JobCard from '@/components/common/JobCard.vue'
import Button from '../ui/Button.vue'
// import FiltersBar from '@/components/common/FiltersBar.vue'

const route = useRoute()
const router = useRouter()
const jobs = useJobsStore()

onMounted(async () => {
  jobs.applyQuery(route.query)
  await jobs.load()
})

watch(() => jobs.page, () => {
  router.replace({ query: jobs.buildQuery() })
})

function onSearch(payload: any) {
  jobs.setFilters({ q: payload.q, state: payload.location })
}
</script>

import { defineStore } from 'pinia'
import type { Job } from '@/types/job'
import { fetchJobs, type JobFilters } from '@/api/jobs'

/**
 * Jobs store
 */
export const useJobsStore = defineStore('jobs', {
    state: () => ({
        items: [] as Job[],
        page: 1,
        lastPage: 1,
        total: 0,

        filters: {
            q: '',
            company: '',
            state: '',
            salaryMin: undefined as number | undefined,
            salaryMax: undefined as number | undefined,
        } as Omit<JobFilters, 'page' | 'id'>,
        loading: false,
        error: '' as string | null
    }),

    getters: {
        hasMore: (s) => s.page < s.lastPage,
        isEmpty: (s) => !s.loading && s.items.length === 0
    },

    actions: {
        /**
         * To load job list using the current store state
         */
        async load(params?: Partial<JobFilters>) {
            this.loading = true
            this.error = null
            try {
                const nextPage = params?.page ?? this.page
                const data = await fetchJobs({
                    ...this.filters,
                    page: nextPage,
                    ...params
                })
                this.items = data.data
                this.page = data.current_page
                this.lastPage = data.last_page
                this.total = data.total
            } catch (e: any) {
                this.error = e?.message ?? 'Failed to load jobs'
            } finally {
                this.loading = false
            }
        },

        /**
         * Merge partial filters, reset to page 1, and reload
         */
        async setFilters(partial: Partial<Omit<JobFilters, 'page' | 'id'>>) {
            this.filters = { ...this.filters, ...partial }
            this.page = 1
            await this.load({ page: 1})
        },

        /**
         * Go to target page
         * @params : page number desired
         */
        async goToPage(page: number) {
            if (page < 1 || (this.lastPage && page > this.lastPage)) return
            this.page = page  
        },

        /**
         * Parse route query into store state
         */
        applyQuery(query: Record<string, string | (string | null)[] | null | undefined>) {
            const pick = (k: string) => (Array.isArray(query[k]) ? query[k]?.[0] : query[k]) ?? ''
            const toNum = (v: string) => (v === '' ? undefined : Number(v))

            this.filters.q = String(pick('q') ?? '')
            this.filters.company = String(pick('company') ?? '')
            this.filters.state = String(pick('state') ?? '')
            this.filters.salaryMin = toNum(String(pick('salaryMin') ?? ''))
            this.filters.salaryMax = toNum(String(pick('salaryMax') ?? ''))
            const p = Number(pick('page') ?? '1')
            this.page = Number.isFinite(p) && p > 0 ? p : 1
        },

        /**
         * Build query object to sunc back to URL
         */
        buildQuery(): Record<string, any> {
            return {
                q: this.filters.q || undefined,
                company: this.filters.company || undefined,
                state: this.filters.state || undefined,
                salaryMin: this.filters.salaryMin ?? undefined,
                salaryMax: this.filters.salaryMax ?? undefined,
                page: this.page > 1 ? this.page : undefined,
            }
        }
    }
})
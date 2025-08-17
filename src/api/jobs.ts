import { api } from "./client";
import type { JobsResponse } from "@/types/job";

/**
 * Filters mapped to API query parameters
 * - q : maps to filter[title]
 * - company : maps to filter[company]
 * - state : maps to filter[state]
 * - salaryMin : maps to filter[salary_min]
 * - salaryMax : maps to filter[salary_max]
 * - id : maps to filter[id]
 * - page: maps to ?page=
 */
export type JobFilters = {
    q?: string;
    company?: string;
    state?: string;
    salaryMin?: number;
    salaryMax?: number;
    id?: number;
    page?: number;
};

/**
 * Build request params that match the API's filter format
 */
export function buildParams(f: JobFilters = {}) {
    const p: Record<string, any> = {}
    if(f.page) p.page = f.page
    if(f.id) p['filter[id]'] = f.id
    if(f.q) p['filter[title]'] = f.q
    if (f.company) p['filter[company]'] = f.company
    if (f.state) p['filter[state]'] = f.state
    if (typeof f.salaryMin === 'number') p['filter[salary_min]'] = f.salaryMin
    if (typeof f.salaryMax === 'number') p['filter[salary_max]'] = f.salaryMax
    return p
}

/**
 * Fetch job list with filters & pagination
 * @param filters JobFilters
 * @returns JobResponse payload
 */
export async function fetchJobs(filters: JobFilters = {}) {
    const { data } = await api.get<JobsResponse>('/jobs', { params: buildParams(filters)})
    return data
}
import { describe, it, expect } from 'vitest'
import { buildParams } from '../jobs'

describe('buildParams', () => {
    it('maps basic filters', () => {
        const p = buildParams({ q: 'admin', state: 'Selangor' })
        expect(p).toEqual({
            'filter[title]': 'admin',
            'filter[state]': 'Selangor'
        })
    })

    it('includes salary only when number', () => {
        const p = buildParams({ salaryMin: 2000, salaryMax: 3000 })
        expect(p['filter[salary_min]']).toBe(2000)
        expect(p['filter[salary_max]']).toBe(3000)
    })

    it('supports id and page', () => {
        const p = buildParams({ id: 7, page: 2 })
        expect(p.page).toBe(2)
        expect(p['filter[id]']).toBe(7)
    })
})

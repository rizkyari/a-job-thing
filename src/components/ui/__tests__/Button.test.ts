import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button.vue', () => {
    it('renders slot content', () => {
        const wrapper = mount(Button, { slots: { default: 'Click me' } })
        expect(wrapper.text()).toContain('Click me')
    })

    it('applies primary variant classes by default', () => {
        const wrapper = mount(Button, { slots: { default: 'X' } })
        const cls = wrapper.attributes('class') || ''
        expect(cls).toContain('bg-brand-primary')
        expect(cls).toContain('text-white')
        expect(cls).toContain('border-brand-primary')
    })

    it('applies secondary and ghost variants', () => {
        const secondary = mount(Button, { props: { variant: 'secondary' }, slots: { default: 'S' } })
        const ghost = mount(Button, { props: { variant: 'ghost' }, slots: { default: 'G' } })

        const clsS = secondary.attributes('class') || ''
        const clsG = ghost.attributes('class') || ''

        expect(clsS).toContain('bg-white')
        expect(clsS).toContain('text-black')
        expect(clsS).toContain('border-gray-300')

        expect(clsG).toContain('bg-transparent')
        expect(clsG).toContain('border-transparent')
    })

    it('respects disabled and loading (disables interactions)', async () => {
        const onClick = vi.fn()
        const wrapper = mount(Button, {
            props: { disabled: true },
            attrs: { onClick },
            slots: { default: 'X' },
        })
        await wrapper.trigger('click')
        expect(onClick).not.toHaveBeenCalled()

        const wrapper2 = mount(Button, {
            props: { loading: true },
            attrs: { onClick },
            slots: { default: 'X' },
        })
        await wrapper2.trigger('click')
        expect(onClick).not.toHaveBeenCalled()

        const cls = wrapper.attributes('class') || ''
        expect(cls).toContain('opacity-60')
        expect(cls).toContain('pointer-events-none')
    })

    it('emits click when enabled', async () => {
        const onClick = vi.fn()
        const wrapper = mount(Button, {
            attrs: { onClick },
            slots: { default: 'X' },
        })
        await wrapper.trigger('click')
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})

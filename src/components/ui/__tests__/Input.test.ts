import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Input', () => {
    it('renders and emits updates', async () => {
        const wrapper = mount(Input, { props: { modelValue: '', placeholder: 'Type' } })
        const el = wrapper.get('input')
        await el.setValue('hello')
        expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual(['hello'])
    })

    it('handles number type', async () => {
        const wrapper = mount(Input, { props: { modelValue: '', type: 'number' } })
        await wrapper.get('input').setValue('123')
        expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual([123])
    })
})

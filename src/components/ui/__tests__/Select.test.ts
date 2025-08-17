import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../Select.vue'

const OPTIONS = [
  { label: 'Any type', value: '' },
  { label: 'Full Time', value: 'Full time' },
  { label: 'Part Time', value: 'Part time' },
  { label: 'Contract', value: 'Contract' },
]

describe('Select.vue', () => {
  it('renders options and placeholder', () => {
    const wrapper = mount(Select, {
      props: {
        options: OPTIONS,
        placeholder: 'Job type',
        id: 'type',
        label: 'Job type',
      },
    })
    const select = wrapper.get('select')
    const placeholder = select.find('option[value=""]')
    expect(placeholder.exists()).toBe(true)
    const optionEls = select.findAll('option')
    expect(optionEls.length).toBe(1 + OPTIONS.length)
  })

  it('emits update:modelValue and change with string value', async () => {
    const wrapper = mount(Select, {
      props: {
        options: OPTIONS,
        placeholder: 'Job type',
        modelValue: '',
      },
    })
    const el = wrapper.get('select').element as HTMLSelectElement
    el.value = 'Full time'
    await wrapper.get('select').trigger('change')

    const updates = wrapper.emitted('update:modelValue')
    expect(updates?.[0]?.[0]).toBe('Full time')

    const changes = wrapper.emitted('change')
    expect(changes?.[0]?.[0]).toBe('Full time')
  })

  it('converts numeric option strings to numbers', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: '10', value: 10 },
          { label: '20', value: 20 },
        ],
        modelValue: undefined,
      },
    })
    const select = wrapper.get('select')
    ;(select.element as HTMLSelectElement).value = '20'
    await select.trigger('change')

    const updates = wrapper.emitted('update:modelValue')
    expect(updates?.[0]?.[0]).toBe(20) 
  })

  it('applies disabled and invalid styles', () => {
    const wrapper = mount(Select, {
      props: {
        options: OPTIONS,
        disabled: true,
        invalid: true,
      },
    })
    const classes = wrapper.get('select').attributes('class') || ''
    expect(classes).toContain('opacity-60') 
    expect(classes).toContain('border-red-500')  
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(Card, {
      slots: {
        default: '<p data-test="content">Hello</p>',
      },
    })
    expect(wrapper.get('[data-test="content"]').text()).toBe('Hello')
  })

  it('has base styling classes', () => {
    const wrapper = mount(Card, { slots: { default: 'x' } })
    const cls = wrapper.attributes('class') || ''
    expect(cls).toContain('rounded-2xl')
    expect(cls).toContain('bg-white')
    expect(cls).toContain('shadow')
  })

  it('merges extra classes from parent', () => {
    const wrapper = mount(Card, {
      attrs: { class: 'p-4 my-2' },
      slots: { default: 'x' },
    })
    const cls = wrapper.attributes('class') || ''
    expect(cls).toContain('p-4')
    expect(cls).toContain('my-2')
  })
})

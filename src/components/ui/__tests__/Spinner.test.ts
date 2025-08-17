import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Spinner from '../Spinner.vue'

describe('Spinner.vue', () => {
  it('mounts and renders', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toBeTruthy()
  })

  it('accepts extra classes from parent (styling passthrough)', () => {
    const wrapper = mount(Spinner, { attrs: { class: 'h-5 w-5' } })
    const cls = wrapper.attributes('class') || ''
    expect(cls).toContain('h-5')
    expect(cls).toContain('w-5')
  })
})

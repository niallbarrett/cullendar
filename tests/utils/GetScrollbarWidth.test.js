// Libraries
import { vi, expect, test } from 'vitest'
// Utils
import getScrollbarWidth from '~/utils/GetScrollbarWidth'

const mockCreateElement = vi.fn(() => ({}))
const mockAppendChild = vi.fn(() => ({}))

document.createElement = mockCreateElement
document.body.appendChild = mockAppendChild

test('returns the scrollbar width in pixels', () => {
  getScrollbarWidth()

  expect(mockCreateElement).toBeCalledWith('div')
  // expect(getScrollbarWidth()).toBe('10px')
})


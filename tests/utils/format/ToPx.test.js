// Libraries
import { expect, test } from 'vitest'
// Utils
import toPx from '~/utils/format/ToPx'

test('formats a number as a CSS pixel value', () => {
  expect(toPx(1)).toBe('1px')
})

test('formats a string as a CSS pixel value', () => {
  expect(toPx('2')).toBe('2px')
})

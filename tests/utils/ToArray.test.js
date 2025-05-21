// Libraries
import { expect, test } from 'vitest'
// Utils
import toArray from '~/utils/ToArray'

test('returns the input value wrapped in an array', () => {
  const input = 1

  expect(toArray(input)).toEqual([input])
})

test('returns the same array when input is already an array', () => {
  const input = [1, 2]

  expect(toArray(input)).toEqual(input)
})

test('returns an empty array when input is undefined', () => {
  expect(toArray()).toEqual([])
})

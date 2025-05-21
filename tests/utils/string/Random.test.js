// Libraries
import { expect, test } from 'vitest'
// Utils
import random from '~/utils/string/Random'

test('returns a random string of 9 characters', () => {
  expect(random().length).toBe(9)
})

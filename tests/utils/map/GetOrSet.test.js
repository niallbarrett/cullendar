// Libraries
import { expect, test } from 'vitest'
// Utils
import getOrSet from '~/utils/map/GetOrSet'

test('returns a default map value for a given key', () => {
  const params = [new Map(), 'key', 'value']
  const result = getOrSet(...params)

  expect(result).toBe(params[2])
})

test('returns an existing map value for a given key', () => {
  const params = [new Map([['key', 'value']]), 'key']
  const result = getOrSet(...params)

  expect(result).toBe(params[0].get(params[1]))
})

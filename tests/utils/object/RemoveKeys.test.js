// Libraries
import { expect, test } from 'vitest'
// Utils
import removeKeys from '~/utils/object/RemoveKeys'

test('removes a property from an object', () => {
  const obj = { one: 'one', two: 'two' }

  expect(removeKeys(obj, 'one')).toEqual({ two: 'two' })
})

test('removes multiple properties from an object', () => {
  const obj = { one: 'one', two: 'two', three: 'three' }

  expect(removeKeys(obj, ['one', 'two'])).toEqual({ three: 'three' })
})

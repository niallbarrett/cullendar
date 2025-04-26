import toArray from '../ToArray'

export default function removeKeys(obj, keyOrKeys) {
  const entries = Object.entries(obj)
  const keys = toArray(keyOrKeys)

  return Object.fromEntries(entries.filter(([key]) => !keys.includes(key)))
}

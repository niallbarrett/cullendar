import toArray from '../ToArray'

export default function removeKeys(obj: object, keyOrKeys: string | string[]): object {
  const entries = Object.entries(obj)
  const keys = toArray(keyOrKeys)

  return Object.fromEntries(entries.filter(([key]) => !keys.includes(key)))
}

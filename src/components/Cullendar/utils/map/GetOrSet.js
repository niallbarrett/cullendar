export default function getOrSet(map, key, initValue) {
  if (!map.has(key))
    map.set(key, initValue)

  return map.get(key)
}

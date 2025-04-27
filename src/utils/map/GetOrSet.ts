export default function getOrSet(map: Map<any, any>, key: string, initValue: any): any {
  if (!map.has(key))
    map.set(key, initValue)

  return map.get(key)
}

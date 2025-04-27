export default function toArray(val: any): any[] {
  if (val === undefined)
    return []

  return Array.isArray(val) ? val : [val]
}

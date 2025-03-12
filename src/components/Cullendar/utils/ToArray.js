export default function toArray(val) {
  if (val === undefined)
    return []

  return Array.isArray(val) ? val : [val]
}

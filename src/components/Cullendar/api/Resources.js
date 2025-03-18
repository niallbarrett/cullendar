import toArray from '../utils/ToArray'
import removeKeys from '../utils/object/RemoveKeys'

const EXCLUDED_FIELDS = ['id', 'resources', 'nOrder', 'isGroup', 'maxEvents']

export default function build(resources, eventMap) {
  const sortedGroups = sortByNOrder(resources)

  // TODO: collapsing separate internal map, isOpen
  return sortedGroups.flatMap(r => [r, ...sortByNOrder(toArray(r.resources))].map(r => toResource(r, eventMap.get(r.id))))
}

function toResource(val, events = new Set()) {
  return {
    id: val.id,
    isGroup: !!val.resources,
    maxEvents: Math.max(...Array.from(events.values()).map(v => v.size), 1),
    data: removeKeys(val, EXCLUDED_FIELDS)
  }
}

function sortByNOrder(arr) {
  return arr.toSorted((a, b) => (a.nOrder ?? Number.MAX_SAFE_INTEGER) - (b.nOrder ?? Number.MAX_SAFE_INTEGER))
}

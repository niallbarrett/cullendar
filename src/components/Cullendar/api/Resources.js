// API
import Constants from './Constants'
// Utils
import removeKeys from '../utils/object/RemoveKeys'

export default function build(resources = [], eventMap = new Map()) {
  const sorted = sortByNOrder(resources)
  const result = []

  for (var i = 0; i < sorted.length; i++) {
    const resource = sorted[i]
    const parent = resource.resources ? toGroup(resource, eventMap) : toResource(resource, eventMap.get(resource.id))

    result.push(parent)

    if (parent.isGroup && parent.resources.length)
      result.push(...parent.resources)
  }

  return result
}

function toGroup(val, eventMap) {
  return {
    id: val.id,
    nOrder: val.nOrder,
    isGroup: true,
    resources: sortByNOrder(val.resources.map(v => toResource(v, eventMap.get(v.id)))),
    data: removeKeys(val, Constants.EXCLUDED_RESOURCE_FIELDS)
  }
}

function toResource(val, events = new Set()) {
  return {
    id: val.id,
    nOrder: val.nOrder,
    maxEvents: Math.max(...Array.from(events.values()).map(v => v.size), 1),
    data: removeKeys(val, Constants.EXCLUDED_RESOURCE_FIELDS)
  }
}

function sortByNOrder(arr) {
  return arr.toSorted((a, b) => (a.nOrder ?? Number.MAX_SAFE_INTEGER) - (b.nOrder ?? Number.MAX_SAFE_INTEGER))
}

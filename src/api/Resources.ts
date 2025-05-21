// Libraries
import { reactive } from 'vue'
// Types
import type { InternalResource, InternalResourceGroup, Resource, DateEventsMap, BuildEventsResult, BuildResourcesResult } from '../types'
// API
import Constants from './Constants'
// Utils
import removeKeys from '../utils/object/RemoveKeys'

const collapsedSet = reactive(new Set())

export default function build(resources: Resource[] = [], eventMap: BuildEventsResult = new Map()): BuildResourcesResult {
  const sorted = sortByNOrder(resources)
  const resourceMap = new Map()

  for (var i = 0; i < sorted.length; i++) {
    const resource = sorted[i]
    const parent = resource.resources ? toGroup(resource, eventMap) : toResource(resource, eventMap.get(resource.id))

    resourceMap.set(parent.id, parent)

    if ('isGroup' in parent && !parent.isCollapsed && parent.resources.length) {
      for (var j = 0; j < parent.resources.length; j++) {
        const child = parent.resources[j]
        resourceMap.set(child.id, child)
      }
    }
  }

  return resourceMap
}

function toGroup(val: Resource, eventMap: BuildEventsResult): InternalResourceGroup {
  const isCollapsed = collapsedSet.has(val.id)

  return {
    id: val.id,
    nOrder: val.nOrder,
    isGroup: true,
    isCollapsed,
    resources: sortByNOrder(val.resources!.map(v => toResource(v, eventMap.get(v.id)))),
    data: removeKeys(val, Constants.EXCLUDED_RESOURCE_FIELDS),
    open: () => collapsedSet.delete(val.id),
    close: () => collapsedSet.add(val.id)
  }
}

function toResource(val: Resource, events: DateEventsMap = new Map()): InternalResource {
  return {
    id: val.id,
    nOrder: val.nOrder,
    isEventDroppable: val.isEventDroppable ?? true,
    maxEvents: Math.max(...Array.from(events.values()).map(v => v.size), 1),
    data: removeKeys(val, Constants.EXCLUDED_RESOURCE_FIELDS)
  }
}

function sortByNOrder(arr: Resource[]): Resource[] {
  return arr.slice().sort((a, b) => (a.nOrder ?? Number.MAX_SAFE_INTEGER) - (b.nOrder ?? Number.MAX_SAFE_INTEGER))
}

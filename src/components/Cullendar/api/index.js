import { build as buildResources } from './Resources'

function buildLanes(resources, events) {
  const eventMap = buildEventMap(events)
  const r = buildResources(resources)

  // TODO: Row API isGroup, isExpanded and { data: resource, size: 15 }
  return r.map(resource => ({ ...resource, events: eventMap.get(resource.id) }))
}

function buildEventMap(events) {
  const mappy = new Map()

  events.forEach(event => {
    const resourceIds = Array.isArray(event.resourceId) ? event.resourceId : [event.resourceId]

    resourceIds.forEach(id => {
      const setty = mappy.get(id) || new Set()
      mappy.set(id, setty.add(event))
    })
  })

  return mappy
}


export { buildLanes }

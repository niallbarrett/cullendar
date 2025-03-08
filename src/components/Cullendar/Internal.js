function build(resources, events) {
  const eventMap = buildEventMap(events)

  return resources.map(resource => ({ ...resource, events: eventMap.get(resource.id) }))
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

export { build }

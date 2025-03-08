function build(resources, events) {
  const eventMap = buildEventMap(events)

  console.log(eventMap)

  return resources.map(resource => ({ ...resource, events: eventMap.get(resource.id) }))
}

function buildEventMap(events) {
  const mappy = new Map()

  events.forEach(event => {
    const setty = mappy.get(event.resourceId) || new Set()
    mappy.set(event.resourceId, setty.add(event))
  })

  return mappy
}

export { build }

export default function build(events, resources) {
  function getEvents(resourceId, date) {
    const resourceEvents = events.value.get(resourceId) || new Map()
    const forDate = date ? resourceEvents.get(date) : resourceEvents

    return forDate || new Set()
  }

  function getResource(id) {
    return resources.value.get(id)
  }

  return {
    getResource,
    getEvents
  }
}

export default function build(events) {
  function getEvents(resourceId, date) {
    const resourceEvents = events.value.get(resourceId) || new Map()
    const forDate = date ? resourceEvents.get(date) : resourceEvents

    return forDate || new Set()
  }

  return { getEvents }
}

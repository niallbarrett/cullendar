const NO_GROUPS = 0
const NO_CHILDREN = 0

export default function useDemo(resources, events) {
  function build() {
    const dates = ['2025-03-10']

    const r = Array.from({ length: NO_GROUPS }).map((v, i) => toResourceGroup(i))
    const c = r.flatMap(r => r.resources)
    const e = c.flatMap((r, i) => dates.map(d => toEvent(i, r.id, d)))

    resources.value = r
    events.value = e
  }

  function toResource(groupId, id) {
    return {
      id: `${groupId}-${id}`,
      label: 'Resource ' + (id + 1)
    }
  }
  function toResourceGroup(id) {
    return {
      id: String(id),
      label: 'Group ' + (id + 1),
      resources: Array.from({ length: NO_CHILDREN }).map((v, i) => toResource(id, i)),
      isCollapsed: !!(id % 2)
    }
  }
  function toEvent(id, resourceId, date) {
    return {
      id: String(id),
      start: date + ' 09:00',
      end: date + ' 13:00',
      resourceId
    }
  }
  function addEvent({ resource, date }) {
    const ev = toEvent(events.value.length, resource.id, date)
    ev.start = ev.start.split(' ')[0] + ' 09:15'
    ev.end = ev.end.split(' ')[0] + ' 14:15'

    events.value.push(ev)
  }
  function updateEvent(event) {
    const ev = events.value.find(v => v.id === event.id)

    ev.start = ev.start.replace('09', '10')
  }

  function addResource(date) {
    const resource = toResource(1, resources.value.length)

    resources.value.push(resource)
    addEvent({ resource, date })
  }
  function updateResource(res) {
    const r = resources.value.find(v => v.id === res.id)
    r.label = 'Updated'
  }

  return {
    build,
    addResource,
    updateResource,
    addEvent,
    updateEvent
  }
}

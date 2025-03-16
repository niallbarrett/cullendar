import toArray from '../utils/ToArray'

export default function build(resources, eventMap) {
  // TODO: collapsing and nOrdering
  return resources.flatMap(r => [r, ...toArray(r.resources)].map(r => toResource(r, eventMap.get(r.id))))
}

function toResource(val, events = new Set()) {
  const isGroup = !!val.resources
  const maxEvents = Math.max(...Array.from(events.values()).map(v => v.size), 1)

  return {
    ...val,
    isGroup,
    maxEvents
  }
}

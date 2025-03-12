import toArray from '../utils/ToArray'

function build(resources, eventMap) {
  console.log('build resources', resources, eventMap)

  // TODO: Row API isGroup, isExpanded and { data: resource, size: 15 }
  // TODO: collapsing and nOrdering
  return resources.flatMap(r => [r, ...toArray(r.resources)].map(r => toResource(r, eventMap.get(r.id))))
}

function toResource(val, events) {
  const isGroup = !!val.resources

  return {
    ...val,
    events, // TODO: Better to decouple events?
    isGroup,
    size: isGroup ? 24 : 48
  }
}

export { build }

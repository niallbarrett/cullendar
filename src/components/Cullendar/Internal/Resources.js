function build(arr) {
  const resources = arr.flatMap(val => !val.resources ? [toResource(val)] : [toResource(val), ...val.resources.map(r => toResource(r))])

  return resources.sort((a, b) => b.nOrder - a.nOrder) // TODO: Group nOrder and child nOrder
}

function toResource(val) {
  const isGroup = !!val.resources

  return {
    ...val,
    isGroup,
    class: isGroup ? 'h-6' : 'h-12', // TODO: De-tailwindify,
    size: isGroup ? 24 : 48
  }
}

export { build }

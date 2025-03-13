import toArray from '../utils/ToArray'

function build(events) {
  return events.reduce((acc, event) => { // TODO: Ignore events that fall outside current period?
    toArray(event.resourceId).forEach(id => (acc.get(id) || acc.set(id, new Set()).get(id)).add(event))
    return acc
  }, new Map())
}

export { build }

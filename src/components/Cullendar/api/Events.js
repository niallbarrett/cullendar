import toArray from '../utils/ToArray'

export default function build(events) {
  return events.reduce((acc, event) => {
    const date = event.start.slice(0, 10) // TODO: Timezone shite and an actual date check
    const resourceIds = toArray(event.resourceId)

    resourceIds.forEach(resourceId => {
      if (!acc.has(resourceId))
        acc.set(resourceId, new Map())

      const dateMap = acc.get(resourceId)

      if (!dateMap.has(date))
        dateMap.set(date, new Set())

      dateMap.get(date).add(event)
    })

    return acc
  }, new Map())
}

import toTimezoneDate from '../utils/date/ToTimezoneDate'
import toISODate from '../utils/date/ToIsoDate'
import toArray from '../utils/ToArray'

export default function build(events = [], timezone) {
  return events.reduce((acc, event) => {
    const date = toISODate(toTimezoneDate(event.start, timezone))
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

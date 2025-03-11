// Libraries
import { addWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
// Internal
import { build as buildResources } from './Resources'
// Utils
import toISODate from "../utils/ToISODate"

const DEFAULT_CONFIG = {
  date: toISODate(new Date()),
  timezone: 'Europe/Dublin',
  nWeeks: 1,
  firstDayOfWeek: 1
}

function buildLanes(resources, events) {
  const eventMap = buildEventMap(events)
  const r = buildResources(resources)

  // TODO: Lane API isDate, isGroup and { data: resource, size: 15 }
  return [{ isDate: true, size: 32 }, ...r.map(resource => ({ ...resource, events: eventMap.get(resource.id) }))]
}

function buildEventMap(events) {
  const mappy = new Map()

  events.forEach(event => {
    const resourceIds = Array.isArray(event.resourceId) ? event.resourceId : [event.resourceId]

    resourceIds.forEach(id => {
      const setty = mappy.get(id) || new Set()
      mappy.set(id, setty.add(event))
    })
  })

  return mappy
}

function buildDates(options) {
  const start = startOfWeek(options.date, { weekStartsOn: options.firstDayOfWeek })
  const interval = {
    start,
    end: endOfWeek(addWeeks(start, options.nWeeks - 1), { weekStartsOn: options.firstDayOfWeek })
  }

  const dates = eachDayOfInterval(interval).map(toISODate)

  options?.onView?.({ nWeeks: options.nWeeks, dates })

  return dates
}

export {
  DEFAULT_CONFIG,
  buildLanes,
  buildDates
}

// Libraries
import { addWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
// Composables
import useCullendar from './composables/Cullendar'
// Utils
import toISODate from "./utils/toISODate"

const { dates, startDate, endDate } = useCullendar()

const DEFAULT_CONFIG = {
  date: toISODate(new Date()),
  timezone: 'Europe/Dublin',
  nWeeks: 1,
  firstDayOfWeek: 1
}

function buildLanes(resources, events) {
  const eventMap = buildEventMap(events)

  return resources.map(resource => ({ ...resource, events: eventMap.get(resource.id) }))
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

  dates.value = eachDayOfInterval(interval).map(toISODate)
  startDate.value = dates.value.at(0)
  endDate.value = dates.value.at(-1)

  options?.onView?.({ nWeeks: options.nWeeks, start: startDate.value, end: endDate.value, dates: dates.value })

  return dates.value
}

export {
  DEFAULT_CONFIG,
  buildLanes,
  buildDates
}

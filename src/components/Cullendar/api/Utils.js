import toTimezoneDate from '../utils/date/ToTimezoneDate'

export default function build(view, events) {
  function toUTC(date) {
    return toTimezoneDate(date, 'UTC')
  }

  function toTimezone(date) {
    return toTimezoneDate(date, view.value.timezone)
  }

  function getEvents(resourceId, date) {
    const resourceEvents = events.value.get(resourceId) || new Map()
    const forDate = date ? resourceEvents.get(date) : resourceEvents

    return forDate || new Set()
  }

  return {
    toUTC,
    toTimezone,
    getEvents
  }
}

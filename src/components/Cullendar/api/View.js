// Libraries
import { DateTime, Interval } from 'luxon'
// API
import DEFAULTS from './Defaults'

export default function build(options = {}) {
  const nWeeks = Math.max(options.nWeeks || DEFAULTS.nWeeks, 1)
  const firstDayOfWeek = options.firstDayOfWeek ?? DEFAULTS.firstDayOfWeek

  const start = DateTime.fromISO(options.date).set({ weekday: firstDayOfWeek })
  const end = start.plus({ weeks: nWeeks - 1 }).set({ weekday: firstDayOfWeek + 6 }).endOf('day')
  const dates = Interval.fromDateTimes(start, end).splitBy({ day: 1 }).map(d => d.start.toISODate())

  return {
    start: dates.at(0),
    end: dates.at(-1),
    timezone: options.timezone || DEFAULTS.timezone,
    nWeeks,
    firstDayOfWeek,
    dates
  }
}

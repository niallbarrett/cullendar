// Libraries
import { addWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import DEFAULTS from './Defaults'
// Utils
import toISODate from '../utils/date/ToIsoDate'
import toUTCDate from '../utils/date/ToUtcDate'

export default function build(options = {}) {
  const utcDate = toUTCDate(options.date)
  const nWeeks = Math.max(options.nWeeks || DEFAULTS.nWeeks, 1)
  const firstDayOfWeek = options.firstDayOfWeek ?? DEFAULTS.firstDayOfWeek

  const start = startOfWeek(utcDate, { weekStartsOn: firstDayOfWeek })
  const end = endOfWeek(addWeeks(start, nWeeks - 1), { weekStartsOn: firstDayOfWeek })
  const dates = eachDayOfInterval({
    start,
    end
  }).map(toISODate)

  return {
    start: dates.at(0),
    end: dates.at(-1),
    timezone: options.timezone || DEFAULTS.timezone,
    nWeeks,
    firstDayOfWeek,
    dates
  }
}

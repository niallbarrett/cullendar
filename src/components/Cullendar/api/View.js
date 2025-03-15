// Libraries
import { addWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import DEFAULTS from './Defaults'
// Utils
import toISODate from '../utils/date/ToIsoDate'

export default function build(options) {
  const timezone = options.timezone || DEFAULTS.timezone
  const initialDate = options.date || toISODate(new Date()) // TODO: in timezone
  const nWeeks = Math.max(options.nWeeks || DEFAULTS.nWeeks, 1)
  const firstDayOfWeek = options.firstDayOfWeek ?? DEFAULTS.firstDayOfWeek

  const start = startOfWeek(initialDate, { weekStartsOn: firstDayOfWeek })
  const end = endOfWeek(addWeeks(start, nWeeks - 1), { weekStartsOn: firstDayOfWeek })
  const d = eachDayOfInterval({
    start,
    end
  })

  const dates = d.map(toISODate) // TODO: Timezone

  return {
    start: dates.at(0),
    end: dates.at(-1),
    timezone,
    nWeeks,
    firstDayOfWeek,
    dates
  }
}

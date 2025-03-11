// Libraries
import { addWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
// Utils
import toISODate from "../utils/ToISODate"

function build(options) {
  const start = startOfWeek(options.date, { weekStartsOn: options.firstDayOfWeek })
  const end = endOfWeek(addWeeks(start, options.nWeeks - 1), { weekStartsOn: options.firstDayOfWeek })
  const interval = {
    start,
    end
  }

  const dates = eachDayOfInterval(interval).map(toISODate)

  options?.onView?.({
    start: toISODate(start),
    end: toISODate(end),
    nWeeks: options.nWeeks,
    dates
  })

  return dates
}

export { build }

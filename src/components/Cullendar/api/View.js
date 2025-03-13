// Libraries
import { addWeeks, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
// Utils
import toISODate from '../utils/date/ToIsoDate'

function build(options) {
  const start = startOfWeek(options.date, { weekStartsOn: options.firstDayOfWeek })
  const end = endOfWeek(addWeeks(start, options.nWeeks - 1), { weekStartsOn: options.firstDayOfWeek })
  const d = eachDayOfInterval({
    start,
    end
  })

  console.log(d)
  const dates = d.map(toISODate)

  const view = {
    start: dates.at(0),
    end: dates.at(-1),
    dates
  }

  options?.onView?.(view)

  return view
}

export { build }

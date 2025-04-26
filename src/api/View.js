// Libraries
import { Temporal } from 'temporal-polyfill'
// API
import DEFAULTS from './Defaults'

export default function build(options = {}) {
  const nWeeks = Math.max(options.nWeeks || DEFAULTS.nWeeks, 1)
  const firstDayOfWeek = options.firstDayOfWeek ?? DEFAULTS.firstDayOfWeek

  const date = Temporal.PlainDate.from(options.date || Temporal.Now.plainDateISO())
  const start = date.add({ days: (firstDayOfWeek - date.dayOfWeek) % 7 })
  const dates = Array.from({ length: nWeeks * 7 }).map((_v, i) => start.add({ days: i }).toString())

  return {
    start: dates.at(0),
    end: dates.at(-1),
    timezone: options.timezone || DEFAULTS.timezone,
    nWeeks,
    firstDayOfWeek,
    dates
  }
}

import toISODate from '../utils/ToIsoDate'

const DEFAULTS = {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  nWeeks: 1,
  firstDayOfWeek: 1
}

export default function build(options) {
  return {
    date: options.date || toISODate(new Date()),
    timezone: options.timezone || DEFAULTS.timezone,
    nWeeks: options.nWeeks || DEFAULTS.nWeeks,
    firstDayOfWeek: options.firstDayOfWeek ?? DEFAULTS.firstDayOfWeek,
    onView: options.onView,
    onDateClick: options.onDateClick
  }
}

export { build }

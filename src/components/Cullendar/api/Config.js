import toISODate from '../utils/date/ToIsoDate'

const DEFAULTS = {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  nWeeks: 1,
  firstDayOfWeek: 1,
  colWidth: 160, // TODO: Implement
  rowHeight: 50 // TODO: Implement
}

function build(options) {
  return {
    date: options.date || toISODate(new Date()),
    timezone: options.timezone || DEFAULTS.timezone,
    nWeeks: Math.max(options.nWeeks || DEFAULTS.nWeeks, 1),
    firstDayOfWeek: options.firstDayOfWeek ?? DEFAULTS.firstDayOfWeek,
    onView: options.onView
  }
}

export { build }

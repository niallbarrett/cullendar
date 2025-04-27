export interface DefaultOptions {
  timezone: string
  nWeeks: number
  firstDayOfWeek: number
  daySize: number
  dayHeadSize: number
  eventSize: number
  resourceGroupSize: number
  gap: number
  overscan: number
}

const DEFAULTS: DefaultOptions = {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  nWeeks: 1,
  firstDayOfWeek: 1,
  daySize: 160,
  dayHeadSize: 32,
  eventSize: 48,
  resourceGroupSize: 24,
  gap: 0,
  overscan: 0
}

export default DEFAULTS

import { TZDate } from '@date-fns/tz'

export default function toTimezoneDate(date, timezone) {
  return new TZDate(date ?? new Date(), timezone)
}

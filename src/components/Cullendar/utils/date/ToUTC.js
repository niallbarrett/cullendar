import toTimezoneDate from './ToTimezoneDate'

export default function toUTC(date) {
  return toTimezoneDate(date, 'UTC')
}

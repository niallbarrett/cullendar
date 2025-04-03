import toTimezoneDate from './ToTimezoneDate'

export default function toUTCDate(date) {
  return toTimezoneDate(date, 'UTC')
}

import { format } from 'date-fns'

export default function toISODateString(date) {
  return format(date, 'yyyy-MM-dd')
}

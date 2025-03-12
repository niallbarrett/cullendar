import { format } from 'date-fns'

export default function toISODate(date) {
  return format(date, 'yyyy-MM-dd')
}

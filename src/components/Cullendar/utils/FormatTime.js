import formatDate from './FormatDate'

const OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
}

export default function formatTime(date) {
  return formatDate(date, OPTIONS)
}

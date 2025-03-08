export default function formatDate(date, options) {
  const formatter = new Intl.DateTimeFormat(undefined, options)

  return formatter.format(date)
}

import toPx from "./format/ToPx"

export default function getScrollbarWidth() {
  const div = Object.assign(document.createElement('div'), { style:'overflow:scroll;visibility:hidden;' })
  const el = document.body.appendChild(div)
  const width = el.offsetWidth - el.clientWidth

  el.remove()

  return toPx(width)
}

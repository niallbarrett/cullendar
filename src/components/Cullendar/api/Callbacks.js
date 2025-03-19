export default function build(options = {}) {
  return {
    onView: options.onView || (() => {}),
    onAddEvent: options.onAddEvent || (() => {}),
    onMoveEvent: options.onMoveEvent || (() => {}),
    onBeforeDropEvent: options.onBeforeDropEvent || (() => true)
  }
}

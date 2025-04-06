export default function build(options = {}) {
  return {
    onView: options.onView || (() => {}),
    onAddEvent: options.onAddEvent || (() => {}),
    onMoveEvent: options.onMoveEvent || (() => {}),
    onResizeEvent: options.onResizeEvent || (() => {}),
    onBeforeDropEvent: options.onBeforeDropEvent || (() => true)
  }
}

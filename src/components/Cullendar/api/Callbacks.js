export default function build(options) {
  return {
    onView: options.onView || (() => null),
    onAddEvent: options.onAddEvent || (() => null),
    onMoveEvent: options.onMoveEvent || (() => null),
    onBeforeDropEvent: options.onBeforeDropEvent || (() => true)
  }
}

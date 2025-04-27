import type { BuildCallbacksOptions, BuildCallbacksResult, BuildViewResult, DragDropCallbackPayload, OnResizeEventCallbackPayload } from '../types'

export default function build(options: BuildCallbacksOptions = {}): BuildCallbacksResult {
  return {
    onView: options.onView || ((_: BuildViewResult) => {}),
    onAddEvent: options.onAddEvent || ((_: DragDropCallbackPayload) => {}),
    onMoveEvent: options.onMoveEvent || ((_: DragDropCallbackPayload) => {}),
    onResizeEvent: options.onResizeEvent || ((_: OnResizeEventCallbackPayload) => {}),
    onBeforeDropEvent: options.onBeforeDropEvent || ((_: DragDropCallbackPayload) => true)
  }
}

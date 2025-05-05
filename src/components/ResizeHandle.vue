<template>
  <div
    draggable="true"
    class="cullendar-resize-handle"
    @dragstart.stop.prevent
    @mousedown="onMousedown">
    <slot v-bind="{ isResizing }"/>
  </div>
</template>

<script lang="ts" setup>
// Libraries
import { ref, toRefs, inject } from 'vue'
// Types
import type { Event, InternalResource, BuildApiResult } from '../types'
// API
import Constants from '../api/Constants'

const props = defineProps<{
  event: Event,
  resource: InternalResource,
  date: string
}>()

const api = inject('api') as BuildApiResult
const { elements, view, layout, callbacks, resizeMap } = toRefs(api)

let prevDeltaDays: number = 0

const startX = ref(0)
const daySize = ref(0)
const isResizing = ref(false)

function onMousedown(e: MouseEvent): void {
  const colEl = document.querySelector('.cullendar-timeline-virtual-col') as HTMLElement

  isResizing.value = true
  startX.value = e.x
  daySize.value = colEl.clientWidth

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
  elements.value.calendar.classList.add(Constants.RESIZING_CLASS)
}
function onMousemove(e: MouseEvent): void {
  const deltaX = Math.max(0, e.x - startX.value)
  const deltaDays = Math.ceil(deltaX / (daySize.value + layout.value.gap))

  if (prevDeltaDays === deltaDays)
    return

  prevDeltaDays = deltaDays
  resizeMap.value.set(props.resource.id, getDeltaDays(deltaDays))
}
function onMouseup(): void {
  const dates = resizeMap.value.get(props.resource.id) || []

  prevDeltaDays = 0
  isResizing.value = false
  startX.value = 0
  resizeMap.value.clear()

  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)
  elements.value.calendar.classList.remove(Constants.RESIZING_CLASS)

  if (!dates.length)
    return

  callbacks.value.onResizeEvent({
    event: props.event,
    resource: props.resource,
    dates,
    view: view.value
  })
}
function getDeltaDays(delta: number): string[] {
  const dates = view.value.dates
  const index = dates.indexOf(props.date) + 1

  return dates.slice(index, index + delta)
}
</script>

<style scoped>
  .cullendar-resize-handle {
    width: 16px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    cursor: ew-resize;
  }
</style>

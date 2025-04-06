<template>
  <div
    draggable="true"
    class="cullendar-resize-handle"
    @dragstart.stop.prevent
    @mousedown="onMousedown">
    <slot v-bind="{ isResizing }"/>
  </div>
</template>

<script setup>
// Libraries
import { ref, toRefs, inject } from 'vue'
// API
import Constants from '../api/Constants'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  resource: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

const api = inject('api')
const { view, callbacks, resizeMap } = toRefs(api)

let prevDeltaDays = 0

const startX = ref(0)
const daySize = ref(0)
const isResizing = ref(false)

function onMousedown(e) {
  isResizing.value = true
  startX.value = e.x
  daySize.value = document.querySelector('.cullendar-timeline-virtual-col').clientWidth

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
  document.querySelector('.cullendar').classList.add(Constants.RESIZING_CLASS)
}
function onMousemove(e) {
  const deltaX = Math.max(0, e.x - startX.value)
  const deltaDays = Math.ceil(deltaX / daySize.value)

  if (prevDeltaDays === deltaDays)
    return

  prevDeltaDays = deltaDays
  resizeMap.value.set(props.resource.id, getDeltaDays(deltaDays))
}
function onMouseup() {
  const dates = resizeMap.value.get(props.resource.id)

  prevDeltaDays = 0
  isResizing.value = false
  startX.value = 0
  resizeMap.value.clear()

  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)
  document.querySelector('.cullendar').classList.remove(Constants.RESIZING_CLASS)

  if (!dates.length)
    return

  callbacks.value.onResizeEvent({
    event: props.event,
    resource: props.resource,
    dates,
    view: view.value
  })
}
function getDeltaDays(delta) {
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

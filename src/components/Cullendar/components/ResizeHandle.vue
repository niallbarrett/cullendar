<template>
  <div
    draggable="true"
    class="cullendar-resize-handle"
    @dragstart.stop.prevent
    @mousedown="onMousedown"/>
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

let prevDelta = 0

const x = ref(0)

function onMousedown(e) {
  x.value = e.x

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
  document.querySelector('.cullendar').classList.add(Constants.RESIZING_CLASS)
}
function onMouseup() {
  callbacks.value.onResizeEvent({
    event: props.event,
    resource: props.resource,
    dates: resizeMap.value.get(props.resource.id),
    view: view.value
  })

  resizeMap.value.clear()
  x.value = 0

  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)
  document.querySelector('.cullendar').classList.remove(Constants.RESIZING_CLASS)
}
function onMousemove(e) {
  const DAY_WIDTH = 160 // TODO: Get this value
  const deltaX = Math.max(0, e.x - x.value)
  const deltaDays = Math.ceil(deltaX / DAY_WIDTH)

  if (prevDelta === deltaDays)
    return

  prevDelta = deltaDays
  resizeMap.value.set(props.resource.id, getDeltaDays(deltaDays))
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

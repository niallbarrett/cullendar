<template>
  <div
    draggable="true"
    class="cullendar-resize-handle"
    @dragstart.stop.prevent
    @mousedown="onMousedown"/>
</template>

<script setup>
import { ref, toRefs, inject } from 'vue'

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

const x = ref(0)
const deltaDays = ref(0)

function onMousedown(e) {
  x.value = e.x

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
function onMouseup() {
  callbacks.value.onResizeEvent({
    event: props.event,
    resource: props.resource,
    dates: resizeMap.value.get(props.resource.id),
    view: view.value
  })

  deltaDays.value = 0
  resizeMap.value.clear()
  x.value = 0

  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)
}
function onMousemove(e) {
  const DAY_WIDTH = 160
  const deltaX = Math.max(0, e.x - x.value)

  deltaDays.value = Math.ceil(deltaX / DAY_WIDTH)

  const days = getDeltaDays()
  resizeMap.value.set(props.resource.id, days) // TODO: Only set if changed
}
function getDeltaDays() {
  const dates = view.value.dates
  const index = dates.indexOf(props.date) + 1

  return dates.slice(index, index + deltaDays.value)
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

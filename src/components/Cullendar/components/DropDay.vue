<template>
  <div
    :class="classes"
    @dragenter="onDragenter"
    @dragover.prevent
    @dragleave="onDragleave"
    @drop="onDrop">
    <slot v-bind="{ date, resource, events, isOver }"/>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, toRefs } from 'vue'
import { set } from 'date-fns'
// Utils
import toUTC from '../utils/date/ToUTC'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  resource: {
    type: Object,
    required: true
  },
  events: {
    type: Set,
    required: true
  },
  api: {
    type: Object,
    required: true
  },
  dragoverClass: {
    type: String,
    default: undefined
  }
})

const { view, utils, callbacks } = toRefs(props.api)
const isOver = ref(false)

const classes = computed(() => ({ [`${props.dragoverClass} cullendar-drop-day-is-active`]: isOver.value }))

function onDragenter() {
  isOver.value = true
}
function onDragleave() {
  isOver.value = false
}
function onDrop(e) {
  isOver.value = false

  const data = JSON.parse(e.dataTransfer.getData('text/plain'))

  if (!data.id)
    return callbacks.value.onAddEvent(toPayload(data))

  const times = toNewTimes(data)

  if (!callbacks.value.onBeforeDropEvent(toPayload(data, { times })))
    return

  callbacks.value.onMoveEvent(toPayload(data, { times }))
}
function toNewTimes(event) {
  const utcDate = toUTC(props.date)

  return {
    start: toDate(event.start, utcDate),
    end: toDate(event.end, utcDate)
  }
}
function toDate(date, utcDate) {
  return set(utils.value.toTimezone(date), {
    year: utcDate.getFullYear(),
    month: utcDate.getMonth(),
    date: utcDate.getDate()
  }).toISOString()
}
function toPayload(data, options = {}) {
  return {
    ...options,
    data,
    date: props.date,
    resource: props.resource,
    view: view.value
  }
}
</script>

<style>
  .cullendar-drop-day-is-active * {
    pointer-events: none;
  }
</style>

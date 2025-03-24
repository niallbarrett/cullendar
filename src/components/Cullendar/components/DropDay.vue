<template>
  <div
    :class="classes"
    @dragenter="onDragenter"
    @dragover.prevent
    @dragleave="isOver = false"
    @drop="onDrop">
    <slot v-bind="{ date, resource, events, isOver }"/>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, toRefs } from 'vue'
import { addMinutes, differenceInMinutes, set } from 'date-fns'
// Utils
import toUTC from '../utils/date/ToUTC'
import toISODate from '../utils/date/ToIsoDate'

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
    type: Array,
    required: true
  },
  api: {
    type: Object,
    required: true
  },
  dragoverClass: {
    type: String,
    default: ''
  }
})

const { view, utils, callbacks } = toRefs(props.api)
const isOver = ref(false)

const classes = computed(() => ({ [`${props.dragoverClass} cullendar-drop-day-is-active`]: isOver.value }))

function onDragenter(e) {
  if (e.dataTransfer.types.includes('cullendar-drag-event'))
    isOver.value = true
}
function onDrop(e) {
  if (!e.dataTransfer.types.includes('cullendar-drag-event'))
    return

  isOver.value = false

  const data = JSON.parse(e.dataTransfer.getData('cullendar-drag-event'))

  if (!data.id)
    return callbacks.value.onAddEvent(toPayload(data))

  if (toISODate(utils.value.toTimezone(data.start)) === props.date)
    return

  const times = toNewTimes(data)

  if (!callbacks.value.onBeforeDropEvent(toPayload(data, { times })))
    return

  callbacks.value.onMoveEvent(toPayload(data, { times }))
}
function toNewTimes(event) {
  const duration = differenceInMinutes(event.end, event.start)
  const start = toDate(event.start, toUTC(props.date))

  return {
    start,
    end: addMinutes(start, duration).toISOString()
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

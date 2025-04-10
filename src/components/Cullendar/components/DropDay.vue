<template>
  <div :class="classes">
    <span
      class="cullendar-day-dropzone"
      @dragenter="onDragenter"
      @dragover.prevent
      @dragleave="isDragOver = false"
      @drop="onDrop"/>
    <slot v-bind="{ date, resource, events, isDragOver, isResizeOver }"/>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, toRefs, inject } from 'vue'
import { DateTime, Interval } from 'luxon'
// API
import Constants from '../api/Constants'
// Utils
import toArray from '../utils/ToArray'

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
  dragoverClass: {
    type: String,
    default: ''
  },
  resizeoverClass: {
    type: String,
    default: ''
  }
})

const api = inject('api')
const { view, callbacks, resizeMap } = toRefs(api)

const isDragOver = ref(false)
const isResizeOver = computed(() => !!resizeMap.value.get(props.resource.id)?.includes(props.date))

const classes = computed(() => ({
  [props.dragoverClass]: isDragOver.value,
  [props.resizeoverClass]: isResizeOver.value
}))

function onDragenter(e) {
  if (e.dataTransfer.types.includes(Constants.DATA_TRANSFER_TYPE))
    isDragOver.value = true
}
function onDrop(e) {
  if (!e.dataTransfer.types.includes(Constants.DATA_TRANSFER_TYPE))
    return

  isDragOver.value = false

  const data = JSON.parse(e.dataTransfer.getData(Constants.DATA_TRANSFER_TYPE))

  if (!data.id)
    return callbacks.value.onAddEvent(toPayload({ data }))

  const originDate = DateTime.fromISO(data.start).setZone(view.value.timezone).toISODate()

  if ((originDate === props.date) && toArray(data.resourceId).includes(props.resource.id))
    return

  const times = toNewTimes(data)
  const payload = toPayload({ event: data, times })

  if (!callbacks.value.onBeforeDropEvent(payload))
    return

  callbacks.value.onMoveEvent(payload)
}
function toNewTimes(event) {
  const day = DateTime.fromISO(props.date)
  const start = DateTime.fromISO(event.start).setZone(view.value.timezone)
  const end = DateTime.fromISO(event.end).setZone(view.value.timezone)
  const duration = Interval.fromDateTimes(start, end).length('minutes')

  const newStart = start.set({
    year: day.year,
    month: day.month,
    day: day.day
  })

  return {
    start: newStart.toISO(),
    end: newStart.plus({ minutes: duration }).toISO()
  }
}
function toPayload(options = {}) {
  return {
    ...options,
    date: props.date,
    resource: props.resource,
    view: view.value
  }
}
</script>

<style>
  .cullendar-day-dropzone {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .cullendar-is-dragging .cullendar-day-dropzone {
    pointer-events: all;
    z-index: 1;
  }
</style>

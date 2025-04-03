<template>
  <div :class="classes">
    <span
      class="cullendar-day-dropzone"
      @dragenter="onDragenter"
      @dragover.prevent
      @dragleave="isDragOver = false"
      @drop="onDrop"/>
    <slot v-bind="{ date, resource, events, isDragOver }"/>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, toRefs } from 'vue'
import { addMinutes, differenceInMinutes, set } from 'date-fns'
// Config
import constants from '../api/Constants'
// Utils
import toArray from '../utils/ToArray'
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
const isDragOver = ref(false)

const classes = computed(() => isDragOver.value ? { [props.dragoverClass]: true } : {})

function onDragenter(e) {
  if (e.dataTransfer.types.includes(constants.DATA_TRANSFER_TYPE))
    isDragOver.value = true
}
function onDrop(e) {
  if (!e.dataTransfer.types.includes(constants.DATA_TRANSFER_TYPE))
    return

  isDragOver.value = false

  const data = JSON.parse(e.dataTransfer.getData(constants.DATA_TRANSFER_TYPE))

  if (!data.id)
    return callbacks.value.onAddEvent(toPayload(data))

  if ((toISODate(utils.value.toTimezone(data.start)) === props.date) && toArray(data.resourceId).includes(props.resource.id))
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
    start: start.toISOString(),
    end: addMinutes(start, duration).toISOString()
  }
}
function toDate(date, utcDate) {
  return set(utils.value.toTimezone(date), {
    year: utcDate.getFullYear(),
    month: utcDate.getMonth(),
    date: utcDate.getDate()
  })
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

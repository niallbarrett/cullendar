<template>
  <div
    @dragenter="onDragenter"
    @dragover.prevent
    @dragleave="onDragleave"
    @drop="onDrop">
    <slot v-bind="{ date, resource, events }"/>
  </div>
</template>

<script setup>
// Libraries
import { computed, toRefs } from 'vue'
import { set } from 'date-fns'
// Utils
import toArray from '../utils/ToArray'
import toTimezoneDate from '../utils/date/ToTimezoneDate'

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
  }
})

const { view, layout, callbacks } = toRefs(props.api)

const dragoverClasses = computed(() => [...toArray(layout.value.dragoverClass?.split?.(' ')), 'cullendar-drop-day-is-active'])

function onDragenter(e) {
  e.target.classList.add(...dragoverClasses.value)
}
function onDragleave(e) {
  e.target.classList.remove(...dragoverClasses.value)
}
function onDrop(e) {
  e.target.classList.remove(...dragoverClasses.value)

  const data = JSON.parse(e.dataTransfer.getData('text/plain'))

  if (!data.id)
    return callbacks.value.onAddEvent(toPayload(data))

  const event = toNewEvent(data)

  if (!callbacks.value.onBeforeDropEvent(toPayload(data, { event })))
    return

  callbacks.value.onMoveEvent(toPayload(data, { event }))
}
function toNewEvent(event) {
  const utcDate = toTimezoneDate(props.date, 'UTC')

  return {
    ...event,
    start: toDate(event.start, utcDate),
    end: toDate(event.end, utcDate),
    resourceId: props.resource.id // TODO: May be multiple
  }
}
function toDate(date, utcDate) {
  return set(toTimezoneDate(date, view.value.timezone), {
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

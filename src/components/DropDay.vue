<template>
  <div :class="classes">
    <span
      v-if="droppable && resource.isEventDroppable"
      class="cullendar-day-dropzone"
      @dragenter="onDragenter"
      @dragover.prevent
      @dragleave="isDragOver = false"
      @drop="onDrop"/>
    <slot v-bind="{ date, resource, events, isDragOver, isResizeOver }"/>
  </div>
</template>

<script lang="ts" setup>
// Libraries
import { ref, computed, toRefs, inject } from 'vue'
import { Temporal } from 'temporal-polyfill'
// Types
import type { Event, InternalResource, BuildApiResult, ToPayloadOptions, DragDropNewTimesResult, DragDropCallbackPayload } from '../types'
// API
import Constants from '../api/Constants'
// Utils
import toArray from '../utils/ToArray'

interface Props {
  date: string,
  resource: InternalResource,
  events: Event[],
  droppable?: boolean,
  dragoverClass?: string,
  resizeoverClass?: string
}

const props = withDefaults(defineProps<Props>(), { droppable: true })

const api = inject('api') as BuildApiResult
const { view, callbacks, resizeMap } = toRefs(api)

const isDragOver = ref(false)
const isResizeOver = computed(() => !!resizeMap.value.get(props.resource.id)?.includes(props.date))

const classes = computed(() => [
  isDragOver.value && props.dragoverClass,
  isResizeOver.value && props.resizeoverClass
].filter(Boolean).join(' '))

function onDragenter(e: DragEvent): void {
  if (e.dataTransfer && e.dataTransfer.types.includes(Constants.DATA_TRANSFER_TYPE))
    isDragOver.value = true
}
function onDrop(e: DragEvent): void {
  if (!e.dataTransfer || !e.dataTransfer.types.includes(Constants.DATA_TRANSFER_TYPE))
    return

  isDragOver.value = false

  const data = JSON.parse(e.dataTransfer.getData(Constants.DATA_TRANSFER_TYPE))

  if (!data.id)
    return callbacks.value.onAddEvent(toPayload({ data }))

  const originDate = Temporal.Instant.from(data.start).toZonedDateTimeISO(view.value.timezone).toPlainDate().toString()

  if ((originDate === props.date) && toArray(data.resourceId).includes(props.resource.id))
    return

  const times = toNewTimes(data)
  const payload = toPayload({ event: data, times })

  if (!callbacks.value.onBeforeDropEvent(payload))
    return

  callbacks.value.onMoveEvent(payload)
}
function toNewTimes(event: Event): DragDropNewTimesResult {
  const day = Temporal.PlainDate.from(props.date)
  const start = Temporal.Instant.from(event.start).toZonedDateTimeISO(view.value.timezone)
  const end = Temporal.Instant.from(event.end).toZonedDateTimeISO(view.value.timezone)
  const duration = start.until(end)

  const newStart = start.with({
    year: day.year,
    month: day.month,
    day: day.day
  })

  return {
    start: newStart.toString({ timeZoneName: 'never' }),
    end: newStart.add(duration).toString({ timeZoneName: 'never' })
  }
}
function toPayload(options: ToPayloadOptions = {}): DragDropCallbackPayload {
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

<template>
  <DragEvent
    :data="event"
    :draggable="event.id === '0'"
    drag-class="opacity-50"
    class="ev max-h-12 min-w-0 p-1 flex-1 bg-white border border-black">
    <span class="text-xs">{{ label }}</span>
  </DragEvent>
</template>

<script setup>
// Libraries
import { computed } from 'vue'
// Composables
import useDemo from '@/Demo'
// Components
import DragEvent from './Cullendar/components/DragEvent'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const { api } = useDemo()

const label = computed(() => `${formatTime(new Date(props.event.start)) } ⇢ ${formatTime(new Date(props.event.end))}`)

function formatTime(date) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: api.value.view.timezone
  })

  return formatter.format(date)
}
</script>

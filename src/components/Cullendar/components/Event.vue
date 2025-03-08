<template>
  <div class="ev p-1 flex-1 bg-white border border-slate-200 rounded-xl leading-none">
    <span class="text-xs">{{ label }}</span>
  </div>
</template>

<script setup>
// Libraries
import { computed } from 'vue'
// Utils
import formatTime from '../utils/FormatTime'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const label = computed(() => `${formatTime(new Date(props.event.start)) } ⇢ ${formatTime(new Date(props.event.end))}`)

console.log('rendered an event', props.event.id)
</script>

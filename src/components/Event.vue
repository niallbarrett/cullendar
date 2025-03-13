<template>
  <div class="ev min-w-0 p-1 bg-white border border-black">
    <span class="text-xs">{{ label }}</span>
  </div>
</template>

<script setup>
// Libraries
import { computed } from 'vue'
// Utils
import formatTime from '@/components/Cullendar/utils/FormatTime'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const label = computed(() => `${formatTime(new Date(props.event.start)) } ⇢ ${formatTime(new Date(props.event.end))}`)
</script>

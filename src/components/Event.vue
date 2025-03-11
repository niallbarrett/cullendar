<template>
  <div class="ev min-w-0 p-1 flex flex-col flex-1 bg-white border border-slate-200 rounded-xl leading-none select-none hover:border-blue-500">
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

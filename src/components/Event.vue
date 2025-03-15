<template>
  <div class="ev max-h-12 min-w-0 p-1 flex-1 bg-white border border-black">
    <span class="text-xs">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useDemo from '@/Demo'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const { api } = useDemo()

console.log(api.value)

const label = computed(() => `${formatTime(new Date(props.event.start)) } ⇢ ${formatTime(new Date(props.event.end))}`)

function formatTime() {
  return '00:00'
}
</script>

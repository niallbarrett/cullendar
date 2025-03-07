<template>
  <div class="p-1 text-slate-500">
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: [String, Date],
    required: true
  }
})

const OPTIONS = {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit'
}

const label = computed(() => new Intl.DateTimeFormat(undefined, OPTIONS).format(props.date))
</script>

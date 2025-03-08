<template>
  <div class="py-1 px-2 bg-white text-slate-500">
    {{ label }}
  </div>
</template>

<script setup>
// Libraries
import { computed } from 'vue'
// Utils
import formatDate from '../utils/FormatDate'

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

const label = computed(() => formatDate(new Date(props.date), OPTIONS))
</script>

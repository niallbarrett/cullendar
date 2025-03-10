<template>
  <div class="p-1 bg-white text-slate-500">
    <div class="px-2 py-1 border border-slate-100 rounded-xl truncate">
      {{ label }}
    </div>
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

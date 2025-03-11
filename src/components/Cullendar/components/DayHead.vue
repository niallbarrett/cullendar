<template>
  <div class="cullendar-day-head" :data-date="date">
    <span class="truncate">{{ label }}</span>
  </div>
</template>

<script setup>
// Libraries
import { computed } from 'vue'
// Utils
import formatDate from '../utils/FormatDate'

const props = defineProps({
  date: {
    type: String,
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

<style scoped>
  .cullendar-day-head {
    height: 100%;
    padding: 0 8px;
    display: flex;
    align-items: center;
  }
</style>

<template>
  <div class="cullendar-resources-day">
    <div
      class="cullendar-resources-day-wrapper"
      @click.self="emit('date', { resource, date })">
      <template v-for="event in resource.events" :key="event.id">
        <slot
          v-if="toISODate(event.start) === date"
          v-bind="{ event }"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import toISODate from '@/components/Cullendar/utils/ToISODate'

defineProps({
  resource: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['date'])
</script>

<style scoped>
  .cullendar-resources-day {
    height: 100%;
    padding: 4px;
    display: flex;
  }
  .cullendar-resources-day-wrapper {
    min-width: 0;
    display: flex;
    flex: 1;
  }
</style>

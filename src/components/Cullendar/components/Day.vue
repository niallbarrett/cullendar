<template>
  <div class="h-full p-1 flex">
    <div class="min-w-0 flex flex-1 rounded-xl empty:bg-slate-50 empty:hover:bg-sky-50" @click.self="emit('date', { resource, date })">
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

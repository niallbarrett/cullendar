<template>
  <slot v-bind="{ events }"/>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  resource: {
    type: Object,
    required: true
  },
  events: {
    type: Map,
    required: true
  }
})

const events = computed(() => props.events.get(props.resource.id).get(props.date))
</script>

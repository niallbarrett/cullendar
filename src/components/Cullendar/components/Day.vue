<template>
  <slot v-bind="{ api, events }"/>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  api: {
    type: Object,
    required: true
  },
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

const { utils } = toRefs(props.api)

const events = computed(() => utils.value.getEvents(props.resource.id, props.date))
</script>

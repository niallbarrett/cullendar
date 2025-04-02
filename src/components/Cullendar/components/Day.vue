<template>
  <slot v-bind="{ api, events: chronological }"/>
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
  }
})

const { utils } = toRefs(props.api)

const events = computed(() => utils.value.getEvents(props.resource.id, props.date))
const chronological = computed(() => Array.from(events.value.values()).sort((a, b) => Date.parse(a.start) - Date.parse(b.start)))
</script>

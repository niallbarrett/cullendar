<template>
  <slot v-bind="{ events: chronological }"/>
</template>

<script setup>
import { computed, toRefs, inject } from 'vue'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  resource: {
    type: Object,
    required: true
  }
})

const api = inject('api')
const { utils } = toRefs(api)

const events = computed(() => utils.value.getEvents(props.resource.id, props.date))
const chronological = computed(() => Array.from(events.value.values()).sort((a, b) => Date.parse(a.start) - Date.parse(b.start)))
</script>

<template>
  <slot v-bind="{ events: chronological }"/>
</template>

<script lang="ts" setup>
// Libraries
import { computed, toRefs, inject } from 'vue'
// Types
import type { Event, InternalResource, BuildApiResult } from '../types'

const props = defineProps<{
  date: string,
  resource: InternalResource
}>()

const api = inject('api') as BuildApiResult
const { utils } = toRefs(api)

const events = computed<Set<Event>>(() => utils.value.getEvents(props.resource.id, props.date))
const chronological = computed<Event[]>(() => Array.from(events.value.values()).sort((a, b) => Date.parse(a.start) - Date.parse(b.start)))
</script>

<template>
  <div class="h-screen p-12">
    <span>{{ startDate }}</span>
    <span>{{ endDate }}</span>
    <button @click="test">Test</button>
    <Cullendar
      :resources="resources"
      :events="events"
      :config="config"/>
  </div>
</template>

<script setup>
// Libraries
import { ref, reactive } from 'vue'
// Composables
import useCullendar from '@/components/Cullendar/composables/Cullendar'
// Components
import Cullendar from '@/components/Cullendar'

const resources = ref([])
const events = ref([])
const config = reactive({
  nWeeks: 2,
  onDateClick: addEvent,
  onEventClick: viewEvent
})

const { startDate, endDate } = useCullendar()

buildDemo()

function buildDemo() {
  const r = Array.from({ length: 1000 }).map((v, i) => toResource(i))
  const e = r.map((r, i) => toEvent(i, r.id))

  resources.value = r
  events.value = e
  // events.value = [toEvent(0, ['0', '1', '2'])]
}

function toResource(id) {
  return {
    id: String(id),
    title: 'Resource ' + (id + 1)
  }
}
function toEvent(id, resourceId) {
  return {
    id: String(id),
    start: '2025-03-08 09:00',
    end: '2025-03-08 13:00',
    resourceId
  }
}
function addEvent({ resource, date }) {
  const ev = toEvent(events.value.length, resource.id)
  ev.start = date + ' 09:15'
  ev.end = date + ' 14:15'

  events.value.push(ev)
}
function viewEvent({ event }) {
  alert(JSON.stringify(event))
}
function test() {
  config.nWeeks = 3
  // const ev = events.value[0]
  // const st = ev.start.split(' ')

  // ev.start = st[0] + ' 10:15'
}
</script>

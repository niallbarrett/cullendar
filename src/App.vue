<template>
  <div class="h-screen p-12">
    <input v-model="nWeeks" type="number" min="1"/>
    <Cullendar
      :resources="resources"
      :events="events"
      :config="config"
      class="border border-black rounded-xl"/>
  </div>
</template>

<script setup>
// Libraries
import { ref, reactive } from 'vue'
// Composables
import useCullendar from '@/components/Cullendar/composables/Cullendar'
// Components
import Cullendar from '@/components/Cullendar'

const nWeeks = ref(1)
const resources = ref([])
const events = ref([])
const config = reactive({
  nWeeks,
  onDateClick: addEvent,
  onEventClick: viewEvent,
  onView: (e) => buildDemo(e.dates)
})

const { startDate, endDate } = useCullendar()

function buildDemo(dates) {
  const r = Array.from({ length: 1 }).map((v, i) => toResourceGroup(i))
  const e = r.flatMap((r, i) => dates.slice(1).map(d => toEvent(i, r.id + '-1', d)))

  resources.value = r
  events.value = e
}

function toResourceGroup(id) {
  return {
    id: String(id),
    label: 'Group ' + (id + 1),
    resources: Array.from({ length: 10 }).map((v, i) => toResource(id, i))
  }
}
function toResource(groupId, id) {
  return {
    id: `${groupId}-${id}`,
    label: 'Resource ' + (id + 1)
  }
}

function toEvent(id, resourceId, date) {
  return {
    id: String(id),
    start: date + ' 09:00',
    end: date + ' 13:00',
    resourceId
  }
}
function addEvent({ resource, date }) {
  const ev = toEvent(events.value.length, resource.id, date)
  ev.start = ev.start.split(' ')[0] + ' 09:15'
  ev.end = ev.end.split(' ')[0] + ' 14:15'

  events.value.push(ev)
}
function viewEvent({ event }) {
  alert(JSON.stringify(event))
}
</script>

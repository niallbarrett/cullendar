<template>
  <div class="h-screen p-12">
    <input v-model="nWeeks" type="number" min="1"/>
    <Cullendar
      :resources="resources"
      :events="events"
      :config="config"
      class="bg-white border border-black rounded-xl text-sm">
      <template #dayHead="{ date }">
        <div class="h-full px-2 flex items-center text-slate-500">
          <span class="truncate">{{ date }}</span>
        </div>
      </template>
      <template #resourceGroup="{ resource }">
        <div class="h-full px-2 flex items-center text-xs text-slate-500">
          <span class="truncate">{{ resource.label }}</span>
        </div>
      </template>
      <template #resource="{ resource }">
        <div class="h-full px-2 flex items-center gap-1">
          <span class="size-6 rounded-full bg-slate-100"/>
          <span class="truncate">{{ resource.label }}</span>
        </div>
      </template>
      <template #event="{ event }">
        <Event :event="event"/>
      </template>
    </Cullendar>
  </div>
</template>

<script setup>
// Libraries
import { ref, reactive } from 'vue'
// Components
import Cullendar from '@/components/Cullendar'
import Event from './components/Event'

const nWeeks = ref(1)
const resources = ref([])
const events = ref([])
const config = reactive({
  nWeeks,
  onDateClick: addEvent,
  onView: (e) => buildDemo(e.dates)
})

function buildDemo(dates) {
  const r = Array.from({ length: 10 }).map((v, i) => toResourceGroup(i))
  const c = r.flatMap(r => r.resources)
  const e = c.flatMap((r, i) => dates.slice(1).map(d => toEvent(i, r.id, d)))

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
</script>

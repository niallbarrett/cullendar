<template>
  <div class="h-screen p-12">
    <div class="flex">
      <input v-model="date" type="date"/>
      <input v-model="nWeeks" type="number" min="1"/>
      <input v-model="firstDayOfWeek" type="number" min="1"/>
    </div>
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
        <div class="h-full px-2 flex items-center text-slate-500" @click="onTest(resource)">
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

const NO_GROUPS = 5
const NO_CHILDREN = 5

const date = ref('2025-03-12')
const nWeeks = ref(1)
const firstDayOfWeek = ref(1)

const resources = ref([])
const events = ref([])
const config = reactive({
  date,
  nWeeks,
  firstDayOfWeek,
  onDateClick: addEvent,
  onView: (e) => console.log('view', e)
})

buildDemo()

function buildDemo() {
  const dates = ['2025-03-10']

  const r = Array.from({ length: NO_GROUPS }).map((v, i) => toResourceGroup(i))
  const c = r.flatMap(r => r.resources)
  const e = c.flatMap((r, i) => dates.map(d => toEvent(i, r.id, d)))

  resources.value = r
  events.value = e
}

function toResourceGroup(id) {
  return {
    id: String(id),
    label: 'Group ' + (id + 1),
    resources: Array.from({ length: NO_CHILDREN }).map((v, i) => toResource(id, i)),
    isCollapsed: !!(id % 2)
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
function onTest(res) {
  const r = resources.value.find(v => v.id === res.id)

  r.isCollapsed = !r.isCollapsed
}
</script>

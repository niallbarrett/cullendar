<template>
  <div class="h-screen p-12 flex flex-col gap-1 ">
    <div class="p-2 flex border border-black">
      <input v-model="date" type="date"/>
      <input v-model="nWeeks" type="number" min="1"/>
      <input v-model="firstDayOfWeek" type="number" min="0"/>
      <input v-model="daySize" type="number" min="0"/>
      <input v-model="dayHeadSize" type="number" min="0"/>
      <select v-model="timezone">
        <option v-for="zone in ZONES" :key="zone" :value="zone">{{ zone }}</option>
      </select>
      <DragEvent :data="dragEvent" drag-class="bg-blue-500" class="p-0.5 bg-black text-white">
        09:00 - 10:25
      </DragEvent>
    </div>
    <Cullendar
      :cullendar="cullendar"
      class="flex-1 bg-white border border-black text-sm">
      <template #dayHead="{ date }">
        <div class="h-full px-2 flex items-center bg-white text-slate-500">
          <span class="truncate">{{ date }}</span>
        </div>
      </template>
      <template #resourceGroup="{ resource }">
        <div class="h-full px-2 flex items-center text-slate-500">
          <span class="truncate">{{ resource.data.label }}</span>
        </div>
      </template>
      <template #resource="{ resource }">
        <div class="h-full px-2 flex items-center gap-1">
          <span class="size-6 rounded-full bg-slate-100"/>
          <span class="truncate">{{ resource.data.label }}</span>
        </div>
      </template>
      <template #day="slot">
        <DropDay
          v-slot="{ events }"
          v-bind="slot"
          class="h-full flex flex-col justify-start">
          <Event
            v-for="event in events"
            :key="event.id"
            :event="event"/>
        </DropDay>
      </template>
    </Cullendar>
  </div>
</template>

<script setup>
// Libraries
import { ref, reactive } from 'vue'
import { create } from '@/components/Cullendar/api'
// Composables
import useDemo from './Demo'
// Components
import Cullendar from '@/components/Cullendar'
import Event from './components/Event'
import DropDay from './components/Cullendar/components/DropDay'
import DragEvent from './components/Cullendar/components/DragEvent'

const ZONES = ['Europe/Dublin', 'Asia/Shanghai', 'America/New_York', 'Antarctica/McMurdo', 'Asia/Kamchatka', 'Pacific/Pago_Pago', 'Asia/Kolkata']

const date = ref('2025-03-10')
const nWeeks = ref(1)
const firstDayOfWeek = ref(1)
const timezone = ref(ZONES[0])

const daySize = ref(160)
const dayHeadSize = ref(40)

const dragEvent = { start: '09:00', end: '10:25' }

const resources = ref([
  { id: '2', label: 'Order 3', resources: [{ id: '2-0', label: 'Child 1' }] },
  { id: '0', label: 'Order 2', nOrder: 1, resources: [{ id: '0-0', label: 'Child 1' }] },
  { id: '1', label: 'Order 1', nOrder: 0, resources: [{ id: '1-0', label: 'Child 2', nOrder: 1 }, { id: '1-1', label: 'Child 1', nOrder: 0 }] },
])
const events = ref([
  { id: '0', resourceId: '0-0', start: '2025-03-12T01:00:00.000Z', end: '2025-03-12T02:00:00.000Z' },
  { id: '1', resourceId: '1-0', start: '2025-03-12T23:00:00.000Z', end: '2025-03-12T23:30:00.000Z' }
])

const options = reactive({
  resources,
  events,
  view: {
    date,
    timezone,
    nWeeks,
    firstDayOfWeek
  },
  layout: {
    daySize,
    dayHeadSize,
    resourcesClass: 'w-64',
    dragoverClass: 'bg-slate-100'
  },
  callbacks: {
    onView: (e) => console.log('VIEW CHANGED', e),
    onBeforeDropEvent,
    onMoveEvent,
    onAddEvent
  }
})

const { api: cullendar } = useDemo()
cullendar.value = create(options)

function onBeforeDropEvent(e) {
  console.log(e)
  return true
}
function onAddEvent(e) {
  console.log(e)
}
function onMoveEvent(e) {
  const ev = events.value.find(event => event.id === e.event.id)

  ev.start = e.event.start
  ev.end = e.event.end
  ev.resourceId = e.event.resourceId
  console.log(e)
}
</script>

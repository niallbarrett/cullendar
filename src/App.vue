<template>
  <div class="h-screen p-12 flex flex-col gap-1">
    <div class="p-2 flex border border-black">
      <input v-model="date" type="date"/>
      <input v-model="nWeeks" type="number" min="1"/>
      <input v-model="firstDayOfWeek" type="number" min="0"/>
      <input v-model="daySize" type="number" min="0"/>
      <input v-model="dayHeadSize" type="number" min="0"/>
      <select v-model="timezone">
        <option v-for="zone in ZONES" :key="zone" :value="zone">{{ zone }}</option>
      </select>
      <DragEvent :data="{ start: '00:00', duration: 480 }" drag-class="bg-blue-500" class="p-0.5 bg-black text-white">
        00:00 - 08:00
      </DragEvent>
      <DragEvent :data="{ start: '23:00', duration: 420 }" drag-class="bg-blue-500" class="p-0.5 bg-black text-white">
        23:00 - 06:00
      </DragEvent>
    </div>
    <Cullendar
      :cullendar="cullendar"
      class="gap-x-2 flex-1 bg-white border border-black text-sm">
      <template #dayHead="{ date }">
        <div class="h-full px-2 flex items-center bg-white text-slate-500">
          <span class="truncate">{{ date }}</span>
        </div>
      </template>
      <template #resourceGroup="{ resource }">
        <div class="h-full px-2 flex items-center text-slate-500" @click="resource.isCollapsed ? resource.open() : resource.close()">
          <span class="truncate">{{ resource.data.label }}</span>
        </div>
      </template>
      <template #resource="{ resource }">
        <div class="h-full px-2 flex items-center gap-1" @click="onTest(resource)">
          <span class="size-6 rounded-full bg-slate-100"/>
          <span class="truncate">{{ resource.data.label }}</span>
        </div>
      </template>
      <template #day="slot">
        <DropDay
          v-slot="{ date, resource, events }"
          v-bind="slot"
          class="h-full flex flex-col justify-start"
          dragover-class="bg-red-500"
          resizeover-class="bg-purple-500">
          <Event
            v-for="event in events"
            :key="event.id"
            :event="event"
            :resource="resource"
            :date="date"/>
        </DropDay>
      </template>
    </Cullendar>
  </div>
</template>

<script setup>
// Libraries
import { ref, reactive } from 'vue'
// import { DateTime, Interval } from 'luxon'
import create from '@/components/Cullendar/api'
// Composables
import useDemo from './Demo'
// Components
import Cullendar from '@/components/Cullendar'
import Event from './components/Event'
import DropDay from './components/Cullendar/components/DropDay'
import DragEvent from './components/Cullendar/components/DragEvent'

const ZONES = ['Europe/Dublin', 'Asia/Shanghai', 'America/New_York', 'Antarctica/McMurdo', 'Asia/Kamchatka', 'Pacific/Pago_Pago', 'Asia/Kolkata']

const date = ref('2025-04-11')
const nWeeks = ref(1)
const firstDayOfWeek = ref(1)
const timezone = ref(ZONES[0])

const daySize = ref(160)
const dayHeadSize = ref(40)

const resources = ref([
  { id: '2', label: 'Order 3', resources: [{ id: '2-0', label: 'Child 1' }] },
  { id: '0', label: 'Order 2', nOrder: 2, resources: [{ id: '0-0', label: 'Child 1' }] },
  { id: '1', label: 'Order 1', nOrder: 1, resources: [{ id: '1-0', label: 'Child 2', nOrder: 1 }, { id: '1-1', label: 'Child 1', nOrder: 0 }] },
  { id: '3', label: 'Unassigned', nOrder: 0 }
])
const events = ref([
  { id: '0', resourceId: '3', start: '2025-04-07T00:00:00.000Z', end: '2025-04-07T01:00:00.000Z' },
  { id: '1', resourceId: '0-0', start: '2025-04-07T22:00:00.000Z', end: '2025-04-08T00:00:00.000Z' }
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
    gap: 5,
    resourcesClass: 'w-64'
  },
  callbacks: {
    onView: (e) => console.log('VIEW CHANGED', e),
    onBeforeDropEvent,
    onMoveEvent,
    onAddEvent,
    onResizeEvent
  }
})

const { api: cullendar } = useDemo()
cullendar.value = create(options)

function onBeforeDropEvent(e) {
  console.log('on before drop event', e)
  return true
}
function onAddEvent(e) {
  console.log(e)
  // const start = toDay(e.date, e.data.start, e.view.timezone)
  // const end = start.plus({ minutes: e.data.duration })

  // const event = {
  //   id: events.value.length,
  //   start: start.toISO(),
  //   end: end.toISO(),
  //   resourceId: e.resource.id
  // }

  // events.value.push(event)
}
function onMoveEvent(e) {
  const ev = events.value.find(event => event.id === e.event.id)

  ev.start = e.times.start
  ev.end = e.times.end
  ev.resourceId = e.resource.id
}
function onResizeEvent(e) {
  console.log(e)
  // const start = DateTime.fromISO(e.event.start).setZone(e.view.timezone)
  // const end = DateTime.fromISO(e.event.end).setZone(e.view.timezone)
  // const duration = Interval.fromDateTimes(start, end).length('minutes')

  // e.dates.forEach(date => {
  //   const newStart = setDate(start, date)
  //   const newEnd = newStart.plus({ minutes: duration })

  //   const event = {
  //     id: events.value.length,
  //     start: newStart.toISO(),
  //     end: newEnd.toISO(),
  //     resourceId: e.resource.id
  //   }

  //   events.value.push(event)
  // })
}
// function toDay(day, time, timezone) {
//   const date = DateTime.fromISO(day)
//   const [hour, minute] = time.split(':')

//   return DateTime.fromObject({
//     year: date.year,
//     month: date.month,
//     day: date.day,
//     hour,
//     minute
//   }, { zone: timezone })
// }
// function setDate(date, day) {
//   const dayo = DateTime.fromISO(day)

//   return date.set({
//     year: dayo.year,
//     month: dayo.month,
//     day: dayo.day
//   })
// }
function onTest(resource) {
  const yo = cullendar.value.utils.getEvents(resource.id)
  const jo = cullendar.value.utils.getResource(resource.id)

  console.log(yo, jo)
}
</script>

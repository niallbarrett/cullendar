<template>
  <div class="h-screen p-12 flex flex-col gap-1 ">
    <div class="p-2 flex border border-black">
      <input v-model="date" type="date"/>
      <input v-model="nWeeks" type="number" min="1"/>
      <input v-model="firstDayOfWeek" type="number" min="0"/>
      <input v-model="colWidth" type="number" min="0"/>
      <input v-model="headHeight" type="number" min="0"/>
      <select v-model="timezone">
        <option v-for="zone in ZONES" :key="zone" :value="zone">{{ zone }}</option>
      </select>
    </div>
    <Cullendar
      :cullendar="cullendar"
      class="flex-1 bg-white border border-black text-sm">
      <template #dayHead="{ date }">
        <div class="h-full px-2 flex items-center text-slate-500" @click="addResource(date)">
          <span class="truncate">{{ date }}</span>
        </div>
      </template>
      <template #resourceGroup="{ resource }">
        <div class="h-full px-2 flex items-center text-slate-500">
          <span class="truncate">{{ resource.label }}</span>
        </div>
      </template>
      <template #resource="{ resource }">
        <div class="h-full px-2 flex items-center gap-1" @click="updateResource(resource)">
          <span class="size-6 rounded-full bg-slate-100"/>
          <span class="truncate">{{ resource.label }}</span>
        </div>
      </template>
      <template #day="{ resource, events }">
        <div>
          <Event v-for="event in events" :key="event.id" :event="event" @click="addEvent({ resource, date })"/>
        </div>
      </template>
      <!-- <template #event="{ event, resource, date }">
        <Event :event="event" @click="addEvent({ resource, date })"/>
      </template> -->
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

const ZONES = ['Europe/Dublin', 'Asia/Shanghai', 'America/New_York']

const date = ref('2025-03-12')
const nWeeks = ref(1)
const firstDayOfWeek = ref(1)
const timezone = ref(ZONES[0])

const colWidth = ref(160)
const headHeight = ref(40)

const resources = ref([{ id: '0', label: 'Hello' }])
const events = ref([
  { id: '0', resourceId: '0', start: '2025-03-12T09:00:00.000Z', end: '2025-03-12T10:30:00.000Z' },
  { id: '1', resourceId: '0', start: '2025-03-13T09:00:00.000Z', end: '2025-03-13T10:30:00.000Z' }
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
    colWidth,
    headHeight
  },
  callbacks: { onView: (e) => console.log('VIEW CHANGED', e) }
})

const cullendar = create(options)
const { addResource, updateResource, addEvent } = useDemo(resources, events)
</script>

<template>
  <div class="h-screen p-12">
    <div class="flex">
      <input v-model="date" type="date"/>
      <input v-model="nWeeks" type="number" min="1"/>
      <input v-model="firstDayOfWeek" type="number" min="0"/>
      <select v-model="timezone">
        <option v-for="zone in ZONES" :key="zone" :value="zone">{{ zone }}</option>
      </select>
    </div>
    <Cullendar
      :cullendar="cullendar"
      class="bg-white border border-black rounded-xl text-sm">
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
      <template #event="{ event }">
        <Event :event="event" @click="updateEvent(event)"/>
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

const ZONES = ['Europe/Dublin', 'Asia/Shanghai', 'America/New_York']

const date = ref('2025-03-12')
const nWeeks = ref(1)
const firstDayOfWeek = ref(1)
const timezone = ref(ZONES[0])

const resources = ref([{ id: '0', label: 'Hello' }])
const events = ref([{ id: '0', resourceId: '0', start: '2025-03-12T09:00:00.000Z', end: '2025-03-12T10:30:00.000Z' }])
const options = reactive({
  date,
  timezone,
  nWeeks,
  firstDayOfWeek,
  onView: (e) => console.log('view', e)
})

const cullendar = create(resources, events, options)
const { addResource, updateResource, updateEvent } = useDemo(resources, events)
console.log(cullendar)
</script>

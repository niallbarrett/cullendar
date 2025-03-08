<template>
  <div class="h-screen p-20">
    <Cullendar
      :resources="resources"
      :events="events"
      :config="config"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Cullendar from '@/components/Cullendar'

const { r, e } = buildDemo()

const resources = ref(r)
const events = ref(e)

const config = {
  onDateClick: addEvent
}

function buildDemo() {
  const r = Array.from({ length: 10000 }).map((v, i) => toResource(i))
  const e = r.map((r, i) => toEvent(i, r.id))

  return { r, e }
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
function addEvent(date, resource) {
  const ev = toEvent(events.value.length, resource.id)
  ev.start = date + ' 09:15'
  ev.end = date + ' 14:15'

  events.value.push(ev)
}
</script>

<template>
  <div class="h-screen p-20">
    <button @click="onTest">Test</button>
    <Cullendar :resources="resources"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Cullendar from '@/components/Cullendar'

const resources = ref(Array.from({ length: 1000 }).map((v, i) => toResource(i)))

function toResource(id) {
  return {
    id,
    events: [1, 2, 3, 4, 5]
  }
}

function onTest() {
  resources.value.push(toResource(resources.value.length))
}
</script>

<template>
  <div
    @dragenter="onDragenter"
    @dragover="onDragover"
    @dragleave="onDragleave"
    @drop="onDrop">
    <slot v-bind="{ date, resource, events }"/>
  </div>
</template>

<script setup>
const props = defineProps({
  date: {
    type: String,
    required: true
  },
  resource: {
    type: Object,
    required: true
  },
  events: {
    type: Set,
    required: true
  },
  callbacks: {
    type: Object,
    required: true
  }
})

function onDragenter(e) {
  e.target.classList.add('bg-red-500')
}
function onDragover(e) {
  // const data = e.dataTransfer.types
  const isAllowed = true //data.id === '1'

  if (isAllowed) e.preventDefault()
  // console.log('dragover', e)
}
function onDragleave(e) {
  e.target.classList.remove('bg-red-500')
}
function onDrop(e) {
  e.target.classList.remove('bg-red-500')
  const data = JSON.parse(e.dataTransfer.getData('event-type'))

  // TODO: old and new event
  // TODO: Split into two callbacks for new and moved
  props.callbacks.onDrop?.({ data, date: props.date, resource: props.resource })
}
</script>

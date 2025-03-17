<template>
  <div draggable="true" @dragstart="onDragstart">
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

function onDragstart(e) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('event-type', JSON.stringify(props.event))

  console.log('drag start', e, props.event)
}
</script>

<template>
  <div
    draggable="true"
    @dragstart.stop="onDragstart"
    @dragend.stop="onDragend">
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

function onDragstart(e) {
  e.target.classList.add('opacity-10')
  e.dataTransfer.effectAllowed = 'move' // TODO: depending on new or not
  e.dataTransfer.setData('event-type', JSON.stringify(props.data))

  console.log('drag start', e, props.data)
}
function onDragend(e) {
  e.target.classList.remove('opacity-10')
}
</script>

<template>
  <div
    :draggable="draggable"
    @dragstart.stop="onDragstart"
    @dragend.stop="onDragend">
    <slot/>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  dragClass: {
    type: String,
    default: undefined
  },
  draggable: {
    type: Boolean,
    default: true
  }
})

const dragClasses = computed(() => props.dragClass?.split?.(' ') || [])

function onDragstart(e) {
  e.target.classList.add(...dragClasses.value)

  e.dataTransfer.effectAllowed = props.data.id ? 'move' : 'copy'
  e.dataTransfer.setData('text/plain', JSON.stringify(props.data))
}
function onDragend(e) {
  e.target.classList.remove(...dragClasses.value)
}
</script>

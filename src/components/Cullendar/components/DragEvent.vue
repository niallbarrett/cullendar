<template>
  <div
    :draggable="draggable"
    class="cullendar-drag-event"
    @dragstart.stop="onDragstart"
    @dragend.stop="onDragend">
    <slot/>
  </div>
</template>

<script setup>
// Libraries
import { computed } from 'vue'
// Config
import constants from '../api/Constants'

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
  document.querySelector('.cullendar').classList.add(constants.DRAGGING_CLASS)

  e.target.classList.add(...dragClasses.value)

  e.dataTransfer.effectAllowed = props.data.id ? 'move' : 'copy'
  e.dataTransfer.setData(constants.DATA_TRANSFER_TYPE, JSON.stringify(props.data))
}
function onDragend(e) {
  document.querySelector('.cullendar').classList.remove(constants.DRAGGING_CLASS)

  e.target.classList.remove(...dragClasses.value)
}
</script>

<style scoped>
  .cullendar-drag-event {
    user-select: none;
  }
</style>

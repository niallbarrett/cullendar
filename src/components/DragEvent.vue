<template>
  <div
    draggable="true"
    class="cullendar-drag-event"
    @dragstart.stop="onDragstart"
    @dragend.stop="onDragend">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
// Libraries
import { computed } from 'vue'
// Config
import constants from '../api/Constants'

const props = defineProps<{
  data: object | Event,
  dragClass?: string
}>()

const dragClasses = computed(() => props.dragClass?.split?.(' ') || [])

function onDragstart(e: DragEvent): void {
  if (!e.dataTransfer)
    return

  const el = document.querySelector('.cullendar') as HTMLElement
  const target = e.target as HTMLElement

  target.classList.add(...dragClasses.value)

  e.dataTransfer.effectAllowed = 'id' in props.data ? 'move' : 'copy'
  e.dataTransfer.setData(constants.DATA_TRANSFER_TYPE, JSON.stringify(props.data))

  setTimeout(() => { el.classList.add(constants.DRAGGING_CLASS) }, 0)
}
function onDragend(e: DragEvent): void {
  const el = document.querySelector('.cullendar') as HTMLElement
  const target = e.target as HTMLElement

  target.classList.remove(...dragClasses.value)
  el.classList.remove(constants.DRAGGING_CLASS)
}
</script>

<style scoped>
  .cullendar-drag-event {
    position: relative;
    user-select: none;
  }
</style>

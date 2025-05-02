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
// Utils
import toPx from '../utils/format/ToPx'

const props = defineProps<{
  data: object | Event,
  dragClass?: string,
  ghostClass?: string
}>()

let ghost: HTMLElement | null

const dragClasses = computed(() => props.dragClass?.split?.(' ') || [])
const ghostClasses = computed(() => props.ghostClass?.split?.(' ') || [])

function onDragstart(e: DragEvent): void {
  if (!e.dataTransfer)
    return

  const el = document.querySelector('.cullendar') as HTMLElement
  const target = e.target as HTMLElement
  const targetRect = target.getBoundingClientRect()

  ghost = setGhost(target, targetRect)
  target.classList.add(...dragClasses.value)

  e.dataTransfer.setDragImage(ghost, e.clientX - targetRect.left, e.clientY - targetRect.top)
  e.dataTransfer.effectAllowed = 'id' in props.data ? 'move' : 'copy'
  e.dataTransfer.setData(constants.DATA_TRANSFER_TYPE, JSON.stringify(props.data))

  requestAnimationFrame(() => el.classList.add(constants.DRAGGING_CLASS))
}
function onDragend(e: DragEvent): void {
  const el = document.querySelector('.cullendar') as HTMLElement
  const target = e.target as HTMLElement

  target.classList.remove(...dragClasses.value)
  el.classList.remove(constants.DRAGGING_CLASS)

  if (ghost)
    ghost.remove()
}
function setGhost(el: HTMLElement, position: DOMRect): HTMLElement {
  const clone = el.cloneNode(true) as HTMLElement

  clone.classList.add('cullendar-ghost-event', ...ghostClasses.value)
  clone.style.height = toPx(position.height)
  clone.style.width = toPx(position.width)

  document.body.appendChild(clone)

  return clone
}
</script>

<style scoped>
  .cullendar-drag-event {
    position: relative;
    user-select: none;
  }
  .cullendar-ghost-event {
    position: fixed;
    left: -9999px;
  }
</style>

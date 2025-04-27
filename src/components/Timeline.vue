<template>
  <RowVirtualiser
    :layout="layout"
    :wrapper-style="wrapperStyle"
    :class="['cullendar-timeline', layout.timelineClass]">
    <template #wrapper>
      <div class="cullendar-timeline-head">
        <div
          v-for="col in virtualColumns"
          :key="col.index"
          class="cullendar-timeline-virtual-col"
          :style="toHeadStyle(col)">
          <slot name="head" v-bind="{ date: columns[col.index] }"/>
        </div>
      </div>
    </template>
    <template #default="{ row, data }">
      <div
        v-for="col in virtualColumns"
        :key="col.index"
        class="cullendar-timeline-virtual-col"
        :style="toColStyle(row, col)">
        <slot v-bind="{ resource: data, date: columns[col.index] }"/>
      </div>
    </template>
  </RowVirtualiser>
</template>

<script lang="ts" setup>
// Libraries
import { ref, computed, toRefs, watch, onMounted, onUnmounted, inject, type CSSProperties } from 'vue'
import { useVirtualizer, type VirtualItem } from '@tanstack/vue-virtual'
// Types
import type { BuildApiResult } from '../types'
// Utils
import toPx from '../utils/format/ToPx'
// Components
import RowVirtualiser from './RowVirtualiser'

const props = defineProps<{ columns: string[] }>()

const api = inject('api') as BuildApiResult
const { layout } = toRefs(api)

let observer: ResizeObserver
const el = ref()
const daySize = ref(layout.value.daySize)

const options = computed(() => ({
  horizontal: true,
  count: props.columns.length,
  getScrollElement: () => el.value,
  estimateSize: () => daySize.value,
  gap: layout.value.gap,
  overscan: layout.value.overscan
}))

const virtualizer = useVirtualizer(options)

const virtualColumns = computed(() => virtualizer.value.getVirtualItems())
const totalSizeColumns = computed(() => virtualizer.value.getTotalSize())
const wrapperStyle = computed(() => ({ width: toPx(totalSizeColumns.value) }))

watch([() => props.columns, () => layout.value.daySize], () => updateDaySize())

onMounted(() => {
  el.value = document.querySelector('.cullendar-timeline') as HTMLElement
  observer = new ResizeObserver(([entry]) => entry && updateDaySize(entry.contentRect.width))

  observer.observe(el.value)
})
onUnmounted(() => observer.unobserve(el.value))

function updateDaySize(rectWidth?: number): void {
  const clientWidth = rectWidth ?? el.value.clientWidth
  const totalGap = layout.value.gap * (props.columns.length - 1)
  const totalWidth = clientWidth - totalGap
  const newDaySize = Math.max(layout.value.daySize, Math.floor(totalWidth / props.columns.length))

  if (newDaySize === daySize.value)
    return

  daySize.value = newDaySize
  virtualizer.value.measure()
}
function toHeadStyle(col: VirtualItem): CSSProperties {
  return {
    height: toPx(layout.value.dayHeadSize),
    width: toPx(daySize.value),
    transform: `translateX(${toPx(col.start)}) translateY(0)`
  }
}
function toColStyle(row: VirtualItem, col: VirtualItem): CSSProperties {
  return {
    width: toPx(daySize.value),
    height: toPx(row.size),
    transform: `translateX(${toPx(col.start)}) translateY(${toPx(row.start)})`
  }
}
</script>

<style scoped>
  .cullendar-timeline {
    flex: 1;
    overflow: scroll;
  }
  .cullendar-timeline-virtual-col {
    position: absolute;
    top: 0;
    left: 0;
  }
  .cullendar-timeline-head {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>

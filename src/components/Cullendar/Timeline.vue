<template>
  <div ref="el" class="cullendar-timeline">
    <div
      class="cullendar-timeline-wrapper"
      :style="wrapperStyle">
      <div class="cullendar-timeline-head">
        <div
          v-for="col in virtualColumns"
          :key="col.index"
          class="cullendar-timeline-virtual-col"
          :style="toHeadStyle(col)">
          <slot name="head" v-bind="{ date: columns[col.index] }"/>
        </div>
      </div>
      <template v-for="row in virtualRows" :key="row.index">
        <div
          v-for="col in virtualColumns"
          :key="col.index"
          class="cullendar-timeline-virtual-col"
          :style="toColStyle(row, col)">
          <slot v-bind="{ resource: rows[row.index], date: columns[col.index] }"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, watch, onMounted } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
// Utils
import toPx from '@/components/Cullendar/utils/ToPx'

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  layout: {
    type: Object,
    required: true
  }
})

const el = ref()
const colSize = ref(props.layout.colWidth)

const rowOptions = computed(() => ({ // todo move to api layer
  count: props.rows.length,
  getScrollElement: () => el.value,
  estimateSize: (i) => props.rows[i].size,
  overscan: 0,
  paddingStart: props.layout.headHeight
}))
const colOptions = computed(() => ({
  horizontal: true,
  count: props.columns.length,
  getScrollElement: () => el.value,
  estimateSize: () => colSize.value,
  overscan: 0
}))

const rowVirtualizer = useVirtualizer(rowOptions)
const columnVirtualizer = useVirtualizer(colOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSizeRows = computed(() => rowVirtualizer.value.getTotalSize())
const virtualColumns = computed(() => columnVirtualizer.value.getVirtualItems())
const totalSizeColumns = computed(() => columnVirtualizer.value.getTotalSize())
const wrapperStyle = computed(() => ({
  height: toPx(totalSizeRows.value),
  width: toPx(totalSizeColumns.value)
}))

watch(() => props.layout.colWidth, () => setColSize())
watch(() => props.rows, () => rowVirtualizer.value.measure())

onMounted(() => setColSize())

function setColSize() {
  colSize.value = Math.max(props.layout.colWidth, Math.round(el.value?.clientWidth / props.columns.length))
  columnVirtualizer.value.measure()
}
function toHeadStyle(col) {
  return {
    height: toPx(props.layout.headHeight),
    width: toPx(colSize.value),
    transform: `translateX(${toPx(col.start)}) translateY(0)`,
    background: '#fff'
  }
}
function toColStyle(row, col) {
  return {
    width: toPx(colSize.value),
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
  .cullendar-timeline-wrapper {
    position: relative;
  }
  .cullendar-timeline-head {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .cullendar-timeline-virtual-col {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

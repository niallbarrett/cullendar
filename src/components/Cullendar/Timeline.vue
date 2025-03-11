<template>
  <div ref="el" class="cullendar-timeline">
    <div
      class="cullendar-timeline-wrapper"
      :style="{ height: `${totalSizeRows}px`, width: `${totalSizeColumns}px` }">

      <template v-for="row in virtualRows" :key="row.index">
        <div
          v-for="col in virtualColumns"
          :key="col.index"
          class="cullendar-timeline-virtual-col"
          :style="toStyle(row, col)">
          <slot v-bind="{ resource: rows[row.index], date: columns[col.index] }"/>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  }
})

const el = ref(null)

const rowOptions = computed(() => ({
  count: props.rows.length,
  getScrollElement: () => el.value,
  estimateSize: (i) => props.rows[i].size,
  overscan: 0
}))
const colOptions = computed(() => ({
  horizontal: true,
  count: props.columns.length,
  getScrollElement: () => el.value,
  estimateSize: () => 160, // TODO: Lane info
  overscan: 0
}))

const rowVirtualizer = useVirtualizer(rowOptions)
const columnVirtualizer = useVirtualizer(colOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSizeRows = computed(() => rowVirtualizer.value.getTotalSize())
const virtualColumns = computed(() => columnVirtualizer.value.getVirtualItems())
const totalSizeColumns = computed(() => columnVirtualizer.value.getTotalSize())

function toStyle(row, col) {
  return {
    width: '160px', // TODO: Variable width when smaller
    height: `${props.rows[row.index].size}px`,
    transform: `translateX(${col.start}px) translateY(${row.start}px)`
  }
}
</script>

<style scoped>
  .cullendar-timeline {
    flex: 1;
    overflow: auto;
  }
  .cullendar-timeline-wrapper {
    position: relative;
  }
  .cullendar-timeline-virtual-col {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<template>
  <div ref="el" class="cullendar-timeline">
    <div
      class="cullendar-timeline-wrapper"
      :style="{ height: `${totalSizeRows}px`, width: `${totalSizeColumns}px` }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.index">
        <div
          v-for="virtualColumn in virtualColumns"
          :key="virtualColumn.index"
          class="cullendar-timeline-virtual-col"
          :style="{ width: `160px`, height: `${rows[virtualRow.index].size}px`, transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)` }">
          <slot v-bind="{ resource: rows[virtualRow.index], date: columns[virtualColumn.index] }"/>
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

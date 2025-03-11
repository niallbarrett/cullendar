<template>
  <div ref="parentRef" class="overflow-auto" @click="onLog">
    <div
      :style="{
        height: `${totalSizeRows}px`,
        width: `${totalSizeColumns}px`,
        position: 'relative',
      }"
    >
      <template v-for="virtualRow in virtualRows" :key="virtualRow.index">
        <div
          v-for="virtualColumn in virtualColumns"
          :key="virtualColumn.index"
          class="absolute top-0 left-0"
          :style="{
            width: `${columns[virtualColumn.index]}px`,
            height: `${rows[virtualRow.index].size}px`,
            transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
          }">
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
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
})

const parentRef = ref(null)

const rowOptions = computed(() => ({
  count: props.rows.length,
  getScrollElement: () => parentRef.value,
  estimateSize: (i) => props.rows[i].size,
  overscan: 0
}))
const colOptions = computed(() => ({
  horizontal: true,
  count: props.columns.length,
  getScrollElement: () => parentRef.value,
  estimateSize: () => 160,//props.columns[i],
  overscan: 0
}))

const rowVirtualizer = useVirtualizer(rowOptions)
const columnVirtualizer = useVirtualizer(colOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSizeRows = computed(() => rowVirtualizer.value.getTotalSize())
const virtualColumns = computed(() => columnVirtualizer.value.getVirtualItems())
const totalSizeColumns = computed(() => columnVirtualizer.value.getTotalSize())

function onLog() {
  console.log(rowVirtualizer.value, columnVirtualizer.value, totalSizeColumns.value, totalSizeRows.value)
}
</script>

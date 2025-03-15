<template>
  <div ref="el" class="cullendar-resources">
    <div class="cullendar-resources-wrapper" :style="wrapperStyle">
      <div
        v-for="row in virtualRows"
        :key="row.index"
        class="cullendar-resources-virtual-row"
        :style="toStyle(row)">
        <slot v-bind="{ resource: rows[row.index] }"/>
      </div>
    </div>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, watch } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
// Utils
import toPx from '@/components/Cullendar/utils/ToPx'

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  layout: {
    type: Object,
    required: true
  }
})

const el = ref(null)

const options = computed(() => ({
  count: props.rows.length,
  getScrollElement: () => el.value,
  estimateSize: i => props.rows[i].size,
  overscan: 0,
  paddingStart: props.layout.headHeight
}))

const rowVirtualizer = useVirtualizer(options)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
const wrapperStyle = computed(() => ({ height: toPx(totalSize.value) }))

watch(() => props.rows, () => rowVirtualizer.value.measure())

function toStyle(row) {
  return {
    height: toPx(row.size),
    transform: `translateY(${toPx(row.start)})`
  }
}
</script>

<style scoped>
  .cullendar-resources {
    width: 240px;
    overflow: scroll auto;
  }
  .cullendar-resources-wrapper {
    width: 100%;
    position: relative;
  }
  .cullendar-resources-virtual-row {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

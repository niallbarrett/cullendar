<template>
  <div ref="el">
    <div class="cullendar-row-virtualiser-wrapper" :style="wrapperStyle">
      <slot name="wrapper"/>
      <slot
        v-for="row in virtualRows"
        :key="row.index"
        v-bind="{ row, data: rows[row.index] }"/>
    </div>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, watch } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
// Utils
import toPx from '../utils/format/ToPx'

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  layout: {
    type: Object,
    required: true
  },
  wrapperStyle: {
    type: Object,
    default: undefined
  }
})

const el = ref(null)

const options = computed(() => ({
  count: props.rows.length,
  getScrollElement: () => el.value,
  estimateSize,
  overscan: 0,
  paddingStart: props.layout.dayHeadSize
}))

const virtualizer = useVirtualizer(options)

const virtualRows = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())
const wrapperStyle = computed(() => ({
  height: toPx(totalSize.value),
  ...props.wrapperStyle
}))

watch(() => props.rows, () => virtualizer.value.measure())

function estimateSize(index) {
  const resource = props.rows[index]

  if (resource.isGroup)
    return props.layout.resourceGroupSize

  return resource.maxEvents * props.layout.eventSize
}
</script>

<style scoped>
  .cullendar-row-virtualiser-wrapper {
    position: relative;
  }
</style>

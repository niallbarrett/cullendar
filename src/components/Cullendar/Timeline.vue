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

<script setup>
// Libraries
import { ref, computed, toRefs, watch, onMounted, inject } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
// Utils
import toPx from './utils/format/ToPx'
// Components
import RowVirtualiser from './components/RowVirtualiser'

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})

const api = inject('api')
const { elements, layout } = toRefs(api)

const daySize = ref(layout.value.daySize)

const options = computed(() => ({
  horizontal: true,
  count: props.columns.length,
  getScrollElement: () => elements.value.timeline,
  estimateSize: () => daySize.value,
  overscan: 0
}))

const virtualizer = useVirtualizer(options)

const virtualColumns = computed(() => virtualizer.value.getVirtualItems())
const totalSizeColumns = computed(() => virtualizer.value.getTotalSize())
const wrapperStyle = computed(() => ({ width: toPx(totalSizeColumns.value) }))

watch(() => layout.value.daySize, () => setDaySize('watch day size'))
watch(totalSizeColumns, () => setDaySize('total size'))

onMounted(() => setDaySize('mounted'))

function setDaySize(src) {
  console.log(src, elements.value.timeline)
  daySize.value = Math.max(layout.value.daySize, Math.floor(elements.value.timeline?.clientWidth / props.columns.length))
  virtualizer.value.measure()
}
function toHeadStyle(col) {
  return {
    height: toPx(layout.value.dayHeadSize),
    width: toPx(daySize.value),
    transform: `translateX(${toPx(col.start)}) translateY(0)`
  }
}
function toColStyle(row, col) {
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

<template>
  <div ref="el" class="cullendar-resources">
    <div class="cullendar-resources-wrapper" :style="{ height: `${totalSize}px` }">
      <div
        v-for="virtualRow in virtualRows"
        :key="virtualRow.index"
        class="cullendar-resources-virtual-row"
        :style="{ height: `${virtualRow.size}px`, transform: `translateY(${virtualRow.start}px)` }">
        <slot v-if="!rows[virtualRow.index].isDate" v-bind="{ resource: rows[virtualRow.index] }"/>
      </div>
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
  }
})

const el = ref(null)

const options = computed(() => ({
  count: props.rows.length,
  getScrollElement: () => el.value,
  estimateSize: i => props.rows[i].size,
  overscan: 1
}))

const rowVirtualizer = useVirtualizer(options)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
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

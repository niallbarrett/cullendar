<template>
  <div ref="parentRef" class="overflow-y-auto">
    <div class="w-full relative" :style="{ height: `${totalSize}px` }">
      <div
        v-for="virtualRow in virtualRows"
        :key="virtualRow.index"
        class="w-full absolute top-0 left-0"
        :style="{
          height: `${virtualRow.size}px`,
          transform: `translateY(${virtualRow.start}px)`,
        }">
        <slot v-bind="{ resource: rows[virtualRow.index] }"/>
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
    default: () => [],
  },
})

const parentRef = ref(null)

const options = computed(() => ({
  count: props.rows.length,
  getScrollElement: () => parentRef.value,
  estimateSize: (i) => props.rows[i].size,
  overscan: 1
}))

const rowVirtualizer = useVirtualizer(options)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
</script>

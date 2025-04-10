<template>
  <RowVirtualiser
    v-slot="{ row, data }"
    :layout="layout"
    :class="['cullendar-resources', layout.resourcesClass]">
    <div class="cullendar-resources-virtual-row" :style="toStyle(row)">
      <slot v-bind="{ resource: data }"/>
    </div>
  </RowVirtualiser>
</template>

<script setup>
// Libraries
import { inject, toRefs } from 'vue'
// Utils
import toPx from '../utils/format/ToPx'
// Components
import RowVirtualiser from './RowVirtualiser'

const api = inject('api')
const { layout } = toRefs(api)

function toStyle(row) {
  return {
    height: toPx(row.size),
    transform: `translateY(${toPx(row.start)})`
  }
}
</script>

<style scoped>
  .cullendar-resources {
    overflow: scroll auto;
    scrollbar-width: none;
  }
  .cullendar-resources-virtual-row {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

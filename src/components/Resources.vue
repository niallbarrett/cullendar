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

<script lang="ts" setup>
// Libraries
import { inject, toRefs, type CSSProperties } from 'vue'
// Types
import type { VirtualItem } from '@tanstack/vue-virtual'
import type { BuildApiResult } from '../types'
// Utils
import toPx from '../utils/format/ToPx'
// Components
import RowVirtualiser from './RowVirtualiser'

const api = inject('api') as BuildApiResult
const { layout } = toRefs(api)

function toStyle(row: VirtualItem): CSSProperties {
  return {
    height: toPx(row.size),
    transform: `translateY(${toPx(row.start)})`
  }
}
</script>

<style scoped>
  .cullendar-resources {
    margin-bottom: var(--scrollbar-width);
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

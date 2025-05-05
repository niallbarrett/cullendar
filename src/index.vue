<template>
  <div
    :id="id"
    :style="{'--scrollbar-width': getScrollbarWidth() }"
    class="cullendar">
    <Resources
      v-slot="{ resource }"
      :rows="rows">
      <slot v-if="'isGroup' in resource" name="resourceGroup" v-bind="{ resource }"/>
      <slot v-else name="resource" v-bind="{ resource }"/>
    </Resources>
    <Timeline
      :rows="rows"
      :columns="view.dates">
      <template #head="{ date }">
        <slot name="dayHead" v-bind="{ date }"/>
      </template>
      <template #default="{ resource, date }">
        <Day
          v-if="!('isGroup' in resource)"
          v-slot="{ events }"
          :date="date"
          :resource="resource">
          <slot name="day" v-bind="{ resource, date, events }">
            <slot
              v-for="event in events"
              :key="event.id"
              name="event"
              v-bind="{ resource, event, date }"/>
          </slot>
        </Day>
      </template>
    </Timeline>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
// Libraries
import { computed, toRefs, provide, onMounted } from 'vue'
// Types
import type { InternalResource, InternalResourceGroup, BuildApiResult } from './types'
// Utils
import getScrollbarWidth from './utils/GetScrollbarWidth'
// Components
import Timeline from './components/Timeline.vue'
import Resources from './components/Resources.vue'
import Day from './components/Day.vue'

const props = defineProps<{ cullendar: BuildApiResult }>()

provide('api', props.cullendar)

const { id, elements, view, resources } = toRefs(props.cullendar)

const rows = computed<(InternalResource | InternalResourceGroup)[]>(() => Array.from(resources.value.values()))

onMounted(() => {
  elements.value.timeline.addEventListener('scroll', onScroll)
  elements.value.resources.addEventListener('scroll', onScroll)
})

function onScroll(e: Event): void {
  const target = e.target as HTMLElement
  const syncTarget = target.classList.contains('cullendar-timeline') ? elements.value.resources : elements.value.timeline

  syncTarget.removeEventListener('scroll', onScroll)
  syncTarget.scrollTop = target.scrollTop

  requestAnimationFrame(() => syncTarget.addEventListener('scroll', onScroll))
}

defineOptions({ name: 'Cullendar' })
</script>

<style scoped>
  .cullendar {
    height: 100%;
    display: flex;
    overflow: hidden;
  }
  .cullendar-is-resizing {
    cursor: ew-resize;
  }
</style>

<template>
  <div class="cullendar" :style="{'--scrollbar-width': getScrollbarWidth() }">
    <Resources
      v-slot="{ resource }"
      ref="resourcesRef"
      :rows="rows"
      @scroll.passive="syncScroll('resources', $event)">
      <slot v-if="resource.isGroup" name="resourceGroup" v-bind="{ resource }"/>
      <slot v-else name="resource" v-bind="{ resource }"/>
    </Resources>
    <Timeline
      ref="timelineRef"
      :rows="rows"
      :columns="view.dates"
      @scroll.passive="syncScroll('timeline', $event)">
      <template #head="{ date }">
        <slot name="dayHead" v-bind="{ date }"/>
      </template>
      <template #default="{ resource, date }">
        <Day
          v-if="!resource.isGroup"
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
import { ref, computed, toRefs, provide } from 'vue'
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

let frame: number | null = null

const resourcesRef = ref()
const timelineRef = ref()

const { view, resources } = toRefs(props.cullendar)

const rows = computed<(InternalResource | InternalResourceGroup)[]>(() => Array.from(resources.value.values()))

function syncScroll(source: 'resources' | 'timeline', e: Event): void {
  if (frame)
    cancelAnimationFrame(frame)

  frame = requestAnimationFrame(() => {
    frame = null

    const target = source === 'resources' ? timelineRef : resourcesRef
    const targetEl = target.value.$el as HTMLElement
    const sourceEl = e.target as HTMLElement

    targetEl.scrollTop = sourceEl.scrollTop
  })
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

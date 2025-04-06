<template>
  <div class="cullendar">
    <Resources
      v-slot="{ resource }"
      ref="resourcesRef"
      :rows="resources"
      @scroll.passive="syncScroll('resources', $event)">
      <slot v-if="resource.isGroup" name="resourceGroup" v-bind="{ resource }"/>
      <slot v-else name="resource" v-bind="{ resource }"/>
    </Resources>
    <Timeline
      ref="timelineRef"
      :rows="resources"
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

<script setup>
// Libraries
import { ref, toRefs, provide } from 'vue'
// Components
import Timeline from './Timeline'
import Resources from './Resources'
import Day from './components/Day'

const props = defineProps({
  cullendar: {
    type: Object,
    required: true
  }
})

provide('api', props.cullendar)

const resourcesRef = ref()
const timelineRef = ref()

const { view, resources } = toRefs(props.cullendar)

function syncScroll(source, e) {
  const target = source === 'resources' ? timelineRef : resourcesRef

  target.value.$el.scrollTop = e.target.scrollTop
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

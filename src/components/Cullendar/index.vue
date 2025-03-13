<template>
  <div class="cullendar">
    <Resources
      v-slot="{ resource }"
      ref="resourcesRef"
      :rows="resources"
      :head-height="layout.headHeight"
      @scroll.passive="syncScroll('resources', $event)">
      <slot v-if="resource.isGroup" name="resourceGroup" v-bind="{ resource }"/>
      <slot v-else name="resource" v-bind="{ resource }"/>
    </Resources>

    <Timeline
      ref="timelineRef"
      :rows="resources"
      :columns="view.dates"
      :column-width="layout.colWidth"
      :head-height="layout.headHeight"
      @scroll.passive="syncScroll('timeline', $event)">

      <template #dayHead="{ date }">
        <slot name="dayHead" v-bind="{ date }"/>
      </template>

      <template #day="{ resource, date }">
        <slot v-if="!resource.isGroup" name="day" v-bind="{ resource, date }">
          <template v-for="event in resource.events" :key="event.id">
            <slot
              v-if="isOnDay(event.start, date)"
              name="event"
              v-bind="{ resource, event, date }"/>
          </template>
        </slot>
      </template>

    </Timeline>
    <slot/>
  </div>
</template>

<script setup>
// Libraries
import { ref, toRefs, defineOptions } from 'vue'
// Utils
// import toTimezoneDate from './utils/date/ToTimezoneDate'
// Components
import Timeline from './Timeline'
import Resources from './Resources'

const props = defineProps({
  cullendar: {
    type: Object,
    required: true
  }
})

const resourcesRef = ref()
const timelineRef = ref()

const { layout, view, resources } = toRefs(props.cullendar)

function syncScroll(source, e) {
  const target = source === 'resources' ? timelineRef : resourcesRef

  target.value.$el.scrollTop = e.target.scrollTop
}
function isOnDay(start, date) {
  return start.slice(0, 10) === date // TODO: Timezone and an actual check
}

defineOptions({ name: 'Cullendar' })
</script>

<style scoped>
  .cullendar {
    height: 100%;
    display: flex;
    overflow: hidden;
  }
</style>

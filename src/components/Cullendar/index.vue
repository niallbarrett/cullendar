<template>
  <div class="cullendar">
    <Resources
      v-slot="{ resource }"
      ref="resourcesRef"
      :rows="lanes"
      @scroll="syncScroll('resources', $event)">
      <slot v-if="resource.isGroup" name="resourceGroup" v-bind="{ resource }"/>
      <slot v-else name="resource" v-bind="{ resource }"/>
    </Resources>

    <Timeline
      ref="timelineRef"
      :rows="lanes"
      :columns="dates"
      @scroll="syncScroll('timeline', $event)">

      <template #dayHead="{ date }">
        <slot name="dayHead" v-bind="{ date }"/>
      </template>

      <template #day="{ resource, date }">
        <slot v-if="!resource.isGroup" name="day" v-bind="{ resource, date }">

          <div
            class="cullendar-resources-day"
            @click.self="onDateClick({ resource, date })">
            <template v-for="event in resource.events" :key="event.id">
              <slot
                v-if="toISODate(event.start) === date"
                name="event"
                v-bind="{ resource, event, date }"/>
            </template>
          </div>

        </slot>
      </template>

    </Timeline>
    <slot/>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, defineOptions } from 'vue'
import { DEFAULT_CONFIG, buildLanes, buildDates } from './Internal'
// Utils
import toISODate from '@/components/Cullendar/utils/ToISODate'
// Components
import Timeline from './Timeline'
import Resources from './Resources'

const props = defineProps({
  resources: {
    type: Array,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  },
  config: {
    type: Object,
    default: () => ({})
  }
})

const resourcesRef = ref()
const timelineRef = ref()

const options = computed(() => ({ ...DEFAULT_CONFIG, ...props.config }))
const dates = computed(() => buildDates(options.value))
const lanes = computed(() => buildLanes(props.resources, props.events))

function syncScroll(source, e) {
  const target = source === 'resources' ? timelineRef : resourcesRef

  target.value.$el.scrollTop = e.target.scrollTop
}
function onDateClick(payload) {
  props.config?.onDateClick?.(payload)
}

defineOptions({ name: 'Cullendar' })
</script>

<style scoped>
  .cullendar {
    height: 100%;
    display: flex;
    overflow: hidden;
  }
  .cullendar-resources-day {
    height: 100%;
    display: flex;
  }
</style>

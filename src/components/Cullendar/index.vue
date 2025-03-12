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
      :columns="dates"
      @scroll.passive="syncScroll('timeline', $event)">

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
// Utils
import toISODate from './utils/date/ToIsoDate'
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

const dates = computed(() => props.cullendar.view.value.dates)
const resources = computed(() => props.cullendar.resources.value)

function syncScroll(source, e) {
  const target = source === 'resources' ? timelineRef : resourcesRef

  target.value.$el.scrollTop = e.target.scrollTop
}
function onDateClick(payload) {
  console.log(payload) // TODO: Hook up to API
  // props.cullendar?.onDateClick?.(payload)
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

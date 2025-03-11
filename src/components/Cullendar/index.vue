<template>
  <div class="cullendar">
    <Resources
      v-slot="{ resource }"
      ref="jo"
      :rows="lanes"
      @scroll="e => onScroll(true, e)">

      <slot v-if="resource.isGroup" name="resourceGroup" v-bind="{ resource }">
        <ResourceGroup :resource="resource"/>
      </slot>

      <slot v-else name="resource" v-bind="{ resource }">
        <Resource :resource="resource"/>
      </slot>

    </Resources>

    <Timeline
      v-slot="{ resource, date }"
      ref="yo"
      :rows="lanes"
      :columns="dates"
      @scroll="e => onScroll(false, e)">

      <DayHead v-if="resource.isDate" :date="date"/>

      <Day
        v-else-if="!resource.isGroup"
        v-slot="{ event }"
        :resource="resource"
        :date="date"
        @date="onDateClick">
        <slot name="event" v-bind="{ resource, event, date }"/>
      </Day>

    </Timeline>
  </div>
</template>

<script setup>
// Libraries
import { ref, computed, defineOptions } from 'vue'
import { DEFAULT_CONFIG, buildLanes, buildDates } from './Internal'
// Components
import Timeline from './Timeline'
import Resources from './Resources'
import DayHead from './components/DayHead'
import Day from './components/Day'
import ResourceGroup from './components/ResourceGroup'
import Resource from './components/Resource'

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
  },
  loading: {
    type: Boolean, // TODO: Loading state
    default: false
  }
})

const jo = ref()
const yo = ref()

const options = computed(() => ({ ...DEFAULT_CONFIG, ...props.config }))
const dates = computed(() => buildDates(options.value))
const lanes = computed(() => buildLanes(props.resources, props.events))

function onScroll(reffy, e) {
  const t = reffy ? yo.value : jo.value

  t.$el.scrollTop = e.target.scrollTop
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
</style>

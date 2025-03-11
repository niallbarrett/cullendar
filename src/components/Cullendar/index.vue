<template>
  <div class="h-full flex bg-white text-sm overflow-hidden">

    <VirtualRow
      v-slot="{ resource }"
      ref="jo"
      :rows="lanes"
      class="w-60"
      @scroll="e => onScroll(true, e)">

      <slot v-if="resource.isGroup" name="resourceGroup" v-bind="{ resource }">
        <ResourceGroup :resource="resource"/>
      </slot>

      <slot v-else name="resource" v-bind="{ resource }">
        <Resource :resource="resource"/>
      </slot>

    </VirtualRow>

    <VirtualGrid
      v-slot="{ resource, date }"
      ref="yo"
      :rows="lanes"
      :columns="dates"
      class="flex-1"
      @scroll="e => onScroll(false, e)">

      <DayHead v-if="resource.isDate" :date="date"/>

      <Day
        v-else-if="!resource.isGroup"
        v-slot="{ event }"
        :resource="resource"
        :date="date"
        @date="onDateClick">
        <slot name="event" v-bind="{ resource, event, date }">
          <Event :event="event"/>
        </slot>
      </Day>

    </VirtualGrid>

  </div>
</template>

<script setup>
// Libraries
import { ref, computed, defineOptions } from 'vue'
import { DEFAULT_CONFIG, buildLanes, buildDates } from './Internal'
// Components
import VirtualGrid from './components/VirtualGrid'
import VirtualRow from './components/VirtualRow'
import DayHead from './components/DayHead'
import Day from './components/Day'
import ResourceGroup from './components/ResourceGroup'
import Resource from './components/Resource'
import Event from './components/Event'

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

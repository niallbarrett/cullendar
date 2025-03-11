<template>
  <div class="h-full flex bg-white text-sm overflow-hidden">

    <VirtualRow
      v-slot="{ resource }"
      ref="jo"
      :rows="lanes"
      class="w-60"
      @scroll="e => onScroll(yo, e)">

      <ResourceGroup v-if="resource.isGroup" :resource="resource"/>
      <Resource v-else :resource="resource"/>

    </VirtualRow>

    <VirtualGrid
      v-slot="{ resource, date }"
      ref="yo"
      :rows="lanes"
      :columns="dates"
      class="flex-1"
      @scroll="e => onScroll(jo, e)">

      <template v-if="!resource.isGroup">
        <template v-for="event in resource.events" :key="event.id">
          <slot v-if="toISODate(event.start) === date" name="event" v-bind="{ resource, event, date }">
            {{ event.id }}
          </slot>
        </template>
      </template>

    </VirtualGrid>

  </div>
</template>

<script setup>
// Libraries
import { ref, computed, defineOptions } from 'vue'
import { DEFAULT_CONFIG, buildLanes, buildDates } from './Internal'
// Utils
import toISODate from './utils/ToISODate'
// Components
import VirtualGrid from './components/VirtualGrid'
import VirtualRow from './components/VirtualRow'
import ResourceGroup from './components/ResourceGroup'
import Resource from './components/Resource'
// import Event from './components/Event'

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

const jo = ref()
const yo = ref()

const options = computed(() => ({ ...DEFAULT_CONFIG, ...props.config }))
const dates = computed(() => buildDates(options.value))
const lanes = computed(() => buildLanes(props.resources, props.events))

function onScroll(reffy, e) {
  console.log(reffy)
  // console.log(reffy.value)
  // reffy.value.$el.scrollTop = e.target.scrollTop // TODO: Sync the two
}
function onClick(resource, date) {
  console.log(resource, date)
}

defineOptions({ name: 'Cullendar' })
</script>

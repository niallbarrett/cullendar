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

      <div v-if="!resource.isGroup" class="h-full p-1 flex">
        <div class="min-w-0 flex flex-1 rounded-xl empty:bg-slate-50 empty:hover:bg-sky-50" @click.self="onDateClick({ resource, date })">
          <template v-for="event in resource.events" :key="event.id">
            <slot v-if="toISODate(event.start) === date" name="event" v-bind="{ resource, event, date }">
              <Event :event="event"/>
            </slot>
          </template>
        </div>
      </div>

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

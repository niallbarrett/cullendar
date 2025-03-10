<template>
  <div class="h-full flex flex-col bg-white text-sm overflow-hidden">

    <div v-bind="containerProps" class="flex-1 overflow-auto">

      <div class="min-w-full w-max flex sticky top-0 z-1">

        <div class="w-60 sticky left-0 shrink-0 bg-white"/>

        <slot
          v-for="date in dates"
          name="dayHead"
          v-bind="{ date }">
          <DayHead
            :date="date"
            class="min-w-40 flex-1"/>
        </slot>

      </div>

      <div v-bind="wrapperProps">

        <div
          v-for="{ index, data: resource } in list"
          :key="index"
          :class="['x h-12 min-w-full w-max flex', { '!h-6': resource.isGroup }]">

          <slot v-if="resource.isGroup" name="resourceGroup" v-bind="{ resource }">
            <ResourceGroup :resource="resource" class="w-60 sticky left-0"/>
          </slot>

          <slot v-else name="resource" v-bind="{ resource }">
            <Resource :resource="resource" class="w-60 sticky left-0"/>
          </slot>

          <!-- TODO: Implement the visible math logic bitz -->
          <!-- TODO: visible dates! -->
          <div v-if="!resource.isGroup" class="flex flex-1">

            <div v-for="date in dates" :key="date" class="h-full min-w-40 p-1 flex flex-1">

              <div
                class="flex gap-px flex-1 rounded-xl empty:bg-slate-50 empty:hover:bg-sky-50"
                @click.self="onDateClick({ resource, date })">

                <template v-for="event in resource.events" :key="event.id">
                  <slot v-if="toISODate(event.start) === date" name="event" v-bind="{ resource, event, date  }">
                    <Event
                      :event="event"
                      @click="onEventClick({ resource, event, date })"/>
                  </slot>
                </template>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup>
// Libraries
import { computed, defineOptions } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { DEFAULT_CONFIG, buildLanes, buildDates } from './Internal'
// Utils
import toISODate from './utils/toISODate'
// Components
import DayHead from './components/DayHead'
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

const options = computed(() => ({ ...DEFAULT_CONFIG, ...props.config }))
const dates = computed(() => buildDates(options.value))
const lanes = computed(() => buildLanes(props.resources, props.events))

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(lanes, { itemHeight: i => lanes.value[i].isGroup ? 24 : 48 })

function onDateClick(payload) {
  props.config?.onDateClick?.(payload)
}
function onEventClick(payload) {
  props.config?.onEventClick?.(payload)
}

defineOptions({ name: 'Cullendar' })
</script>

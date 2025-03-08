<template>
  <div class="h-full flex flex-col border border-slate-100 rounded-xl overflow-hidden text-sm">

    <div v-bind="containerProps" class="flex-1 overflow-auto">

      <div class="flex sticky top-0">
        <div class="w-60 sticky left-0 bg-white border-r border-slate-100 z-1 shrink-0"/>

        <template v-for="date in dates">
          <slot name="dayHead" v-bind="{ date }">
            <DayHead :key="date" :date="date" class="min-w-48 flex-1"/>
          </slot>
        </template>

      </div>

      <div v-bind="wrapperProps">

        <!-- Resource lane -->
        <div
          v-for="{ index, data: resource } in list"
          :key="index"
          class="x h-12 flex">

          <!--Resource slot -->
          <div class="w-60 p-2 flex items-center gap-1 sticky left-0 bg-white border-r border-slate-100 shrink-0 z-1">
            <span class="size-6 rounded-full bg-slate-100"/>
            <span class="truncate">{{ resource.title }}</span>
          </div>

          <!-- For each day -->
          <div v-for="date in dates" :key="date" class="h-full min-w-48 p-1 flex flex-1">

            <div class="flex gap-px flex-1 rounded-xl empty:bg-slate-50 empty:hover:bg-sky-50" @click.self="onDateClick({ resource, date })">

              <template v-for="event in resource.events" :key="event.id">
                <slot v-if="toISODate(event.start) === date" name="event" v-bind="{ resource, event, date  }">
                  <Event :event="event" @click="onEventClick({ resource, event, date })"/>
                </slot>
              </template>

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
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import { build } from './Internal'
// Utils
import toISODate from './utils/toISODate'
// Components
import DayHead from './components/DayHead'
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

const OPTIONS = {
  view: 'week',
  firstDayOfWeek: 1
}

const test = computed(() => build(props.resources, props.events))
const dates = eachDayOfInterval({ start: startOfWeek(new Date(), { weekStartsOn: OPTIONS.firstDayOfWeek }), end: endOfWeek(new Date(), { weekStartsOn: OPTIONS.firstDayOfWeek }) }).map(toISODate)

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(test, { itemHeight: 48 })

function onDateClick(payload) {
  props.config?.onDateClick?.(payload)
}
function onEventClick(payload) {
  props.config?.onEventClick?.(payload)
}

defineOptions({ name: 'Cullendar' })
</script>

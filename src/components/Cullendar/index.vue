<template>
  <div class="h-full flex flex-col border border-slate-100 rounded-xl overflow-hidden text-sm">

    <div v-bind="containerProps" class="flex-1 overflow-auto">

      <div class="w-fit flex sticky top-0 bg-white">
        <div class="w-60 sticky left-0 bg-white border-r border-slate-100 z-1"/>

        <template v-for="date in dates">
          <slot name="dayHead" v-bind="{ date }">
            <DayHead :key="date" :date="date" class="w-52"/>
          </slot>
        </template>

      </div>

      <div v-bind="wrapperProps">

        <div v-for="{ index, data } in list" :key="index" class="x h-12 w-fit flex">

          <!--Resource slot -->
          <div class="w-60 p-2 flex items-center gap-1 sticky left-0 bg-white border-r border-slate-100 z-1">
            <span class="size-6 rounded-full bg-slate-100" @click="scrollTo(500)"/>
            <span class="truncate">{{ data.title }}</span>
          </div>

          <!-- For each day -->
          <div v-for="(date, index) in dates" :key="date" class="h-full w-52 p-1 flex">

            <div class="flex gap-px flex-1 rounded-xl empty:bg-slate-50 empty:hover:bg-sky-50" @click="onDateClick(date, data)">

              <template v-for="event in data.events" :key="event.id">
                <Event v-if="toISODate(event.start) === date" :event="event"/>
              </template>

            </div>

            <!-- Empty slot -->
            <!-- <div class="flex items-center justify-center flex-1 bg-slate-50 text-slate-500 rounded-lg">+</div> -->
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

function onDateClick(date, resource) {
  props.config?.onDateClick?.(date, resource)
}

defineOptions({ name: 'Cullendar' })
</script>

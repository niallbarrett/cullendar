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

          <div class="w-60 p-2 flex items-center gap-1 sticky left-0 bg-white border-r border-slate-100 z-1">
            <span class="size-6 rounded-full bg-slate-100"/>
            <span class="truncate">Resource {{ index }}</span>
          </div>

          <div v-for="date in dates" :key="date" class="h-full w-52 p-1 flex">
            <div class="flex items-center justify-center flex-1 bg-slate-50 rounded-lg">+</div>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup>
// Libraries
import { defineOptions } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
// Components
import DayHead from './DayHead'

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
    default: undefined
  }
})

const OPTIONS = {
  view: 'week',
  firstDayOfWeek: 1
}

const { list, containerProps, wrapperProps } = useVirtualList(props.resources, { itemHeight: 48 })

const dates = eachDayOfInterval({ start: startOfWeek(new Date(), { weekStartsOn: OPTIONS.firstDayOfWeek }), end: endOfWeek(new Date(), { firstDayOfWeek: OPTIONS.weekStartsOn }) })

defineOptions({ name: 'Cullendar' })
</script>

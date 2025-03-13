// Libraries
import { computed, unref, watch } from 'vue'
// API
import { build as buildView } from './View'
import { build as buildLayout } from './Layout'
import { build as buildEvents } from './Events'
import { build as buildResources } from './Resources'

function create(r, events, options) {
  const view = computed(() => buildView(options.view))
  const layout = computed(() => buildLayout(options.layout))

  const eventMap = computed(() => buildEvents(unref(events)))
  const resources = computed(() => buildResources(unref(r), eventMap.value))

  watch(view, () => options?.callbacks?.onView?.(view.value))

  // util lads for times?

  return {
    view,
    layout,
    resources
  }
}

export { create }

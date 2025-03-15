// Libraries
import { computed, reactive, unref, watch } from 'vue'
// API
import buildView from './View'
import buildLayout from './Layout'
import buildEvents from './Events'
import buildResources from './Resources'

function create(options) {
  const view = computed(() => buildView(options.view))
  const layout = computed(() => buildLayout(options.layout))

  const events = computed(() => buildEvents(unref(options.events)))
  const resources = computed(() => buildResources(unref(options.resources), events.value))

  watch(view, () => options?.callbacks?.onView?.(view.value))

  // util lads for times?

  const api = reactive({
    view,
    layout,
    resources,
    events
  })

  return api
}

export { create }

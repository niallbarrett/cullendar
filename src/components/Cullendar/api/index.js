// Libraries
import { computed, reactive, unref, watch } from 'vue'
// API
import buildView from './View'
import buildLayout from './Layout'
import buildEvents from './Events'
import buildResources from './Resources'
import buildCallbacks from './Callbacks'

function create(options) {
  const view = computed(() => buildView(options.view))
  const layout = computed(() => buildLayout(options.layout))

  const events = computed(() => buildEvents(unref(options.events), view.value.timezone))
  const resources = computed(() => buildResources(unref(options.resources), events.value))

  const callbacks = computed(() => buildCallbacks(options.callbacks))

  watch(view, () => callbacks.value.onView(view.value))

  const api = reactive({
    view,
    layout,
    events,
    resources,
    callbacks
  })

  return api
}

export { create }

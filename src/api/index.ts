// Libraries
import { ref, computed, reactive, unref, watch } from 'vue'
// Types
import type { BuildApiOptions, BuildApiResult } from '../types'
// Utils
import randomString from '../utils/string/Random'
// API
import buildView from './View'
import buildLayout from './Layout'
import buildEvents from './Events'
import buildResources from './Resources'
import buildCallbacks from './Callbacks'
import buildUtils from './Utils'

export default function create(options: BuildApiOptions = {}): BuildApiResult {
  const id = randomString()
  const elements = ref()
  const resizeMap = ref(new Map())

  const view = computed(() => buildView(options.view))
  const layout = computed(() => buildLayout(options.layout))

  const events = computed(() => buildEvents(unref(options.events), view.value.timezone))
  const resources = computed(() => buildResources(unref(options.resources), events.value))

  const callbacks = computed(() => buildCallbacks(options.callbacks))
  const utils = buildUtils(events, resources)

  watch(view, () => callbacks.value.onView(view.value))

  const api: BuildApiResult = reactive({
    id,
    elements,
    view,
    layout,
    events,
    resources,
    callbacks,
    utils,
    resizeMap
  })

  return api
}

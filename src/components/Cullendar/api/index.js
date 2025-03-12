// Libraries
import { computed, unref } from 'vue'
// API
import { build as buildConfig } from "./Config"
import { build as buildView } from './View'
import { build as buildEvents } from './Events'
import { build as buildResources } from './Resources'

function create(r, events, options) {
  const config = computed(() => buildConfig(options))
  const view = computed(() => buildView(config.value))

  const eventMap = computed(() => buildEvents(unref(events)))
  const resources = computed(() => buildResources(unref(r), eventMap.value))

  return {
    config,
    view,
    resources
  }
}

export { create }

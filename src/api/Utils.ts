import type { ComputedRef } from 'vue'
import type { Event, Resource, BuildEventsResult, BuildResourcesResult, BuildUtilsResult } from '../types'

export default function build(events: ComputedRef<BuildEventsResult>, resources: ComputedRef<BuildResourcesResult>): BuildUtilsResult {
  function getEvents(resourceId: string, date: string): Set<Event> {
    const resourceEvents = events.value.get(resourceId) || new Map()
    const forDate = date ? resourceEvents.get(date) : resourceEvents

    return forDate || new Set()
  }

  function getResource(id: string): Resource | undefined {
    return resources.value.get(id)
  }

  return {
    getResource,
    getEvents
  }
}

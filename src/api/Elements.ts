// Types
import type { BuildElementsResult } from '../types'
// API
import Constants from './Constants'

export default function build(id: string): BuildElementsResult {
  const calendar = document.getElementById(id) as HTMLElement

  return {
    calendar,
    timeline: calendar.querySelector(Constants.TIMELINE_SELECTOR) as HTMLElement,
    resources: calendar.querySelector(Constants.RESOURCES_SELECTOR) as HTMLElement
  }
}

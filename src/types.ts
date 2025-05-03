import { type ComputedRef, type Ref, type UnwrapRef } from 'vue'

export interface Event {
  id: string,
  start: string,
  end: string,
  resourceId: string | string[]
}

export interface Resource {
  id: string,
  nOrder?: number,
  isEventDroppable?: boolean,
  resources?: Resource[]
}

export interface InternalResource {
  id: string,
  nOrder?: number,
  isEventDroppable: boolean,
  maxEvents: number,
  data: object
}

export interface InternalResourceGroup {
  id: string,
  nOrder?: number,
  isGroup: true,
  isCollapsed: boolean,
  resources: Resource[],
  data: object,
  open: () => void,
  close: () => void
}

export interface BuildApiOptions {
  view?: BuildViewOptions,
  layout?: BuildLayoutOptions,
  events?: Event[],
  resources?: Resource[],
  callbacks?: BuildCallbacksOptions
}

export interface BuildApiResult extends UnwrapRef<{
  id: Ref<string>,
  elements: Ref<BuildElementsResult>,
  view: ComputedRef<BuildViewResult>,
  layout: ComputedRef<BuildLayoutResult>,
  events: ComputedRef<BuildEventsResult>,
  resources: ComputedRef<BuildResourcesResult>,
  callbacks: ComputedRef<BuildCallbacksResult>,
  utils: BuildUtilsResult,
  resizeMap: Ref<Map<string, string[]>>
}> {}

export interface BuildViewOptions {
  nWeeks?: number,
  firstDayOfWeek?: number,
  date?: string,
  timezone?: string
}

export interface BuildViewResult {
  start: string,
  end: string,
  timezone: string,
  nWeeks: number,
  firstDayOfWeek: number,
  dates: string[]
}

export interface BuildElementsResult {
  calendar: HTMLElement,
  timeline: HTMLElement,
  resources: HTMLElement
}

export interface BuildLayoutOptions {
  daySize?: number,
  dayHeadSize?: number,
  eventSize?: number,
  resourceGroupSize?: number,
  resourcesClass?: string,
  timelineClass?: string,
  gap?: number,
  overscan?: number
}

export interface BuildLayoutResult {
  daySize: number,
  dayHeadSize: number,
  eventSize: number,
  resourceGroupSize: number,
  resourcesClass?: string,
  timelineClass?: string,
  gap: number,
  overscan: number
}

export interface BuildCallbacksOptions {
  onView?: () => void,
  onAddEvent?: () => void,
  onMoveEvent?: () => void,
  onResizeEvent?: () => void,
  onBeforeDropEvent?: () => boolean
}

export interface BuildCallbacksResult {
  onView: (view: BuildViewResult) => void;
  onAddEvent: (payload: DragDropCallbackPayload) => void;
  onMoveEvent: (payload: DragDropCallbackPayload) => void;
  onResizeEvent: (payload: OnResizeEventCallbackPayload) => void;
  onBeforeDropEvent: (payload: DragDropCallbackPayload) => boolean;
}

export interface BuildUtilsResult {
  getEvents: (resourceId: string, date: string) => Set<Event>,
  getResource: (id: string) => Resource | undefined
}

export type DateEventsMap = Map<string, Set<Event>>

export type BuildEventsResult = Map<string, DateEventsMap>

export type BuildResourcesResult = Map<string, InternalResourceGroup | InternalResource>

export interface DragDropNewTimesResult {
  start: string,
  end: string
}

export interface ToPayloadOptions {
  data?: object,
  event?: Event,
  times?: DragDropNewTimesResult
}

export interface DragDropCallbackPayload extends ToPayloadOptions {
  date: string,
  resource: InternalResource,
  view: BuildViewResult
}

export interface OnResizeEventCallbackPayload {
  event: Event,
  resource: InternalResource,
  dates: string[],
  view: BuildViewResult
}

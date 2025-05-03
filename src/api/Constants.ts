const EXCLUDED_RESOURCE_FIELDS = ['id', 'nOrder', 'isGroup', 'isCollapsed', 'resources', 'maxEvents']
const DATA_TRANSFER_TYPE = 'cullendar-drag-event'

const TIMELINE_SELECTOR = '.cullendar-timeline'
const RESOURCES_SELECTOR = '.cullendar-resources'

const DRAGGING_CLASS = 'cullendar-is-dragging'
const RESIZING_CLASS = 'cullendar-is-resizing'

export interface ConstantOptions {
  EXCLUDED_RESOURCE_FIELDS: string[],
  DATA_TRANSFER_TYPE: string,
  TIMELINE_SELECTOR: string,
  RESOURCES_SELECTOR: string,
  DRAGGING_CLASS: string,
  RESIZING_CLASS: string
}

const CONSTANTS: ConstantOptions = {
  EXCLUDED_RESOURCE_FIELDS,
  DATA_TRANSFER_TYPE,
  TIMELINE_SELECTOR,
  RESOURCES_SELECTOR,
  DRAGGING_CLASS,
  RESIZING_CLASS
}

export default CONSTANTS

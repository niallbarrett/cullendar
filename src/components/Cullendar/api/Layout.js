import DEFAULTS from './Defaults'

export default function build(options) {
  return {
    daySize: options.daySize ?? DEFAULTS.daySize,
    dayHeadSize: options.dayHeadSize ?? DEFAULTS.dayHeadSize,
    eventSize: options.eventSize ?? DEFAULTS.eventSize,
    resourceGroupSize: options.resourceGroupSize ?? DEFAULTS.resourceGroupSize,
    resourcesClass: options.resourcesClass,
    timelineClass: options.timelineClass
  }
}

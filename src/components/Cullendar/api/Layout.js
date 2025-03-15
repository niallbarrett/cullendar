import DEFAULTS from './Defaults'

export default function build(options) {
  return {
    colWidth: options.colWidth ?? DEFAULTS.colWidth,
    headHeight: options.headHeight ?? DEFAULTS.headHeight
  }
}

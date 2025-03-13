import DEFAULTS from './Defaults'

function build(options) {
  return {
    colWidth: options.colWidth ?? DEFAULTS.colWidth,
    headHeight: options.headHeight ?? DEFAULTS.headHeight
  }
}

export { build }

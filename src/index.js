// API
import create from './api'
// Components
import Cullendar from './index.vue'
import DragEvent from './components/DragEvent'
import DropDay from './components/DropDay'
import ResizeHandle from './components/ResizeHandle'

export default { install: app => app.component('Cullendar', Cullendar) }

export {
  Cullendar,
  DragEvent,
  DropDay,
  ResizeHandle,
  create
}

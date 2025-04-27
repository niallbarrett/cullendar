// API
import create from './api'
// Types
import type { App } from 'vue'
// Components
import Cullendar from './index.vue'
import DragEvent from './components/DragEvent.vue'
import DropDay from './components/DropDay.vue'
import ResizeHandle from './components/ResizeHandle.vue'

export default { install: (app: App) => app.component('Cullendar', Cullendar) }

export {
  Cullendar,
  DragEvent,
  DropDay,
  ResizeHandle,
  create
}

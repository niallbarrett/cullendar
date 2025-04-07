// API
import create from '@/components/Cullendar/api'
// Components
import Cullendar from '@/components/Cullendar'
import DragEvent from '@/components/Cullendar/components/DragEvent'
import DropDay from '@/components/Cullendar/components/DropDay'
import ResizeHandle from '@/components/Cullendar/components/ResizeHandle'

export default { install: app => app.component('Cullendar', Cullendar) }

export {
  Cullendar,
  DragEvent,
  DropDay,
  ResizeHandle,
  create
}

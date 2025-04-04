import Cullendar from '@/components/Cullendar'
import DragEvent from '@/components/Cullendar/components/DragEvent'
import DropDay from '@/components/Cullendar/components/DropDay'
import create from '@/components/Cullendar/api'

export default { install: app => app.component('Cullendar', Cullendar) }

export {
  Cullendar,
  DragEvent,
  DropDay,
  create
}

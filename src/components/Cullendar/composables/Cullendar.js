import { ref } from 'vue'

const dates = ref([])
const startDate = ref()
const endDate = ref()

export default function useCullendar() {
  return {
    dates,
    startDate,
    endDate
  }
}

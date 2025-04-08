import Constants from './Constants'

export default function build() {
  return {
    calendar: document.querySelector(`.${Constants.CALENDAR_CLASS}`),
    timeline: document.querySelector(`.${Constants.TIMELINE_CLASS}`)
  }
}

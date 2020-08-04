import moment from 'moment'

export const localTimezone = (t: string): string => {
  return moment.parseZone(t).local().format()
}

import moment from 'moment'

export const localTimezone = (t: string): string => {
  return moment.parseZone(t).local().format()
}

export const pareZoneFormat = (date: string, format: string): string => {
  return moment.parseZone(date).local().format(format)
}

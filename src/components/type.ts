type FormatString = { format(...replacements: string[]): string }

export type TagData = {
  [key: string]: Array<string>
}

export type Task = {
  title: string
  location: string
  'start-time': FormatString
  'end-time': FormatString
  tag: string
  des: string
}

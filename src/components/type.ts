type FormatString = { format(...replacements: string[]): string }

export type TagColor = {
  [key: string]: string
}

export type Task = {
  title: string
  location: string
  'start-time': FormatString
  'end-time': FormatString
  tag: string
  des: string
}

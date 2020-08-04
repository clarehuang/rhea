type FormatString = { format(...replacements: string[]): string }

export type TagData = {
  [key: string]: Array<string>
}

export type TaskData = Array<Task>

export type Task = {
  title: string
  location: string
  range: Array<string>
  tag: string
  des: string
  status: string
}

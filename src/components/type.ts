type FormatString = { format(...replacements: string[]): string }

export type TagData = {
  [key: string]: Array<string>
}

export type TaskData = Array<Task>

export type Task = {
  _id?: string
  __v?: number
  title: string
  location: string
  range: Array<string>
  tag: string
  des: string
  status?: string
}

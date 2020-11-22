type FormatString = { format(...replacements: string[]): string }

export type TagData = {
  [key: string]: Array<string>
}

export type Task = {
  _id?: string
  __v?: number
  title: string
  location: string
  range: Array<string>
  startDate?: string
  tag: string
  des: string
  status?: string
}

export type TaskData = Array<Task>

export type CheckingListItem = {
  _id?: string
  __v?: number
  content: string
  pickedDate: string
  checked: boolean
}

export type CheckingListItemData = Array<CheckingListItem>

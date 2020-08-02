import { default as AddTask } from './addTask/addTask'
import { default as TagFilter } from './tagFilter/tagFilter'
import { default as TaskTimeline } from './taskTimeline/taskTimeline'
import { TagData } from '../type'

//TODO: replace with tag dataset
const Tags: TagData = {
  all: ['All', '#d7d7d7'],
  home: ['Home', '#a11a0f'],
  work: ['Work', '#dc833c'],
  finance: ['Finance', '#49af99'],
  other: ['Other', '#4a413f'],
}

export { AddTask, TagFilter, Tags, TaskTimeline }

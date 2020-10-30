import React, { useState } from 'react'
import { Button, Popover } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { default as AddTask } from './addTask'
import { default as TagFilter } from './tagFilter'
import { default as TaskTimeline } from './taskTimeline'
import { TagData } from '../type'
import './todo.less'

//TODO: replace with tag dataset
export const Tags: TagData = {
  all: ['All', '#d7d7d7'],
  home: ['Home', '#a11a0f'],
  work: ['Work', '#dc833c'],
  finance: ['Finance', '#49af99'],
  other: ['Other', '#4a413f'],
}

const Todo = (): JSX.Element => {
  const [visible, isVisible] = useState(false)
  const [tag, setTag] = useState('all')
  const content = (
    <AddTask
      onOpen={(visible: boolean): void => {
        isVisible(visible)
      }}
    />
  )
  const handleVisible = (): void => {
    isVisible((old) => !old)
  }
  const handleTag = (input: string): void => {
    setTag(input)
  }
  return (
    <div className="planner-container">
      <Popover content={content} trigger="click" visible={visible} onVisibleChange={handleVisible}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="primary-button task-btn-sm"
        >
          <span className="btn-content">ADD NEW TASK</span>
        </Button>
      </Popover>
      <TagFilter selectedTag={tag} tagData={Tags} onSelectTag={handleTag} />
      <TaskTimeline filterValue={tag} />
    </div>
  )
}

export default Todo

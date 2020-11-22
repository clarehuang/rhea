import React, { useState } from 'react'
import { Button, Popover } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { default as AddTask } from './addTask'
import { default as TagFilter } from './tagFilter'
import { default as TaskTimeline } from './taskTimeline'
import { default as CheckingList } from './checkingList'
import { TagData, CheckingListItemData } from '../type'
import './todo.less'

//TODO: replace with tag dataset
export const Tags: TagData = {
  all: ['All', '#d7d7d7'],
  home: ['Home', '#a11a0f'],
  work: ['Work', '#dc833c'],
  finance: ['Finance', '#49af99'],
  other: ['Other', '#4a413f'],
}

// TODO: replace with real data
const checkListItemData: CheckingListItemData = [
  {
    _id: 'check_aaa_111',
    content: 'Tomato x 10',
    pickedDate: '2020-11-20',
    checked: false,
  },
  {
    _id: 'check_bbb_222',
    content: 'Egg x 2 boxes',
    pickedDate: '2020-11-20',
    checked: false,
  },
  {
    _id: 'check_ccc_333',
    content: 'Pork 1.5lb',
    pickedDate: '2020-11-20',
    checked: true,
  },
  {
    _id: 'check_ddd_444',
    content: 'Eggplant x 3',
    pickedDate: '2020-11-20',
    checked: false,
  },
  {
    _id: 'check_eee_555',
    content: 'Milk x 2 bottles',
    pickedDate: '2020-11-21',
    checked: false,
  },
]

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
    <div className="container__todo">
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
      <div className="container__layout__todo">
        <TaskTimeline filterValue={tag} />
        <CheckingList data={checkListItemData} />
      </div>
    </div>
  )
}

export default Todo

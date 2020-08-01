import React, { useState } from 'react'
import { Button, Popover } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { AddTask, TagFilter, Tags } from './index'
import './planner.less'

const Planner = (): JSX.Element => {
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
        <Button type="primary" icon={<PlusOutlined />} size="large" className="primary-button">
          ADD NEW TASK
        </Button>
      </Popover>
      <TagFilter initialTag={tag} selectedTag={tag} tagData={Tags} onSelectTag={handleTag} />
    </div>
  )
}

export default Planner

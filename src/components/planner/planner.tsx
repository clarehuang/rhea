import React, { useState } from 'react'
import { Button, Popover } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { AddTask } from './addTask'
import './planner.less'

const Planner = (): JSX.Element => {
  const [visible, isVisible] = useState(false)
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
  return (
    <div className="planner-container">
      <Popover content={content} trigger="click" visible={visible} onVisibleChange={handleVisible}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="primary-button"
          onClick={(): void => {
            console.log('Add new task')
          }}
        >
          ADD NEW TASK
        </Button>
      </Popover>
    </div>
  )
}

export default Planner

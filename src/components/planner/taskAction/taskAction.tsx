import React from 'react'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import clsx from 'clsx'

interface TaskActionProps {
  children?: React.ReactNode
}

const TaskAction: React.FC<TaskActionProps> = () => {
  return (
    <div className="task-timeline-action">
      <Button
        shape="circle"
        icon={<DeleteOutlined />}
        size="large"
        value="delete"
        className={clsx('task-timeline-action-delete text-danger')}
      />
      <Button
        shape="circle"
        icon={<EditOutlined />}
        size="large"
        value="edit"
        className={clsx('task-timeline-action-edit text-gray-700')}
      />
      <Button
        shape="circle"
        icon={<CheckOutlined />}
        size="large"
        value="check"
        className={clsx('task-timeline-action-check text-success')}
      />
    </div>
  )
}

export default TaskAction

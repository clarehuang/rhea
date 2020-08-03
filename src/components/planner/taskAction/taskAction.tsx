import React, { useState } from 'react'
import { Button } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import clsx from 'clsx'

interface TaskActionProps {
  status?: string
  onSelectStatus?: (status: string) => void
  children?: React.ReactNode
}

const TaskAction: React.FC<TaskActionProps> = ({ status, ...props }) => {
  const [currentStatus, setStatus] = useState(status ? status : 'default')
  let previousStatus = ''
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent): void => {
    previousStatus = currentStatus
    const value = e.currentTarget.value
    if (
      e.nativeEvent instanceof MouseEvent ||
      (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.keyCode === 32)
    ) {
      value === 'confirm' ? setStatus('default') : setStatus(value)
      props.onSelectStatus?.(value)

      // delete
      if (previousStatus === 'delete' && value === 'confirm') {
        console.log('Delete this task')
      }
      // edit
      if (previousStatus === 'edit' && value === 'confirm') {
        console.log('Save edits')
      }

      // line through card content
      if (value !== 'default' && value === 'check') {
        const sibling = e.currentTarget.parentElement.previousElementSibling
        sibling.style.textDecoration = 'line-through'
      }
      if (value !== 'default' && value === 'undo') {
        const sibling = e.currentTarget.parentElement.previousElementSibling
        sibling.style.textDecoration = 'none'
      }
    }
  }
  const actualProps = { ...props }
  delete actualProps.onSelectStatus
  return (
    <div className="task-timeline-action">
      <Button
        shape="circle"
        icon={<DeleteOutlined />}
        size="large"
        value="delete"
        className={clsx('task-timeline-action-delete text-danger', {
          hidden:
            currentStatus !== 'default' && currentStatus !== 'check' && currentStatus !== 'undo',
        })}
        onClick={handleClick}
      />
      <Button
        shape="circle"
        icon={<EditOutlined />}
        size="large"
        value="edit"
        className={clsx('task-timeline-action-edit text-gray-700', {
          hidden:
            currentStatus !== 'default' && currentStatus !== 'check' && currentStatus !== 'undo',
        })}
        onClick={handleClick}
      />
      <Button
        shape="circle"
        icon={<CheckOutlined />}
        size="large"
        value="check"
        className={clsx('task-timeline-action-check text-success', {
          hidden:
            (currentStatus !== 'default' && currentStatus === 'check') ||
            (currentStatus !== 'default' && currentStatus === 'delete') ||
            (currentStatus !== 'default' && currentStatus === 'edit'),
        })}
        onClick={handleClick}
      />
      <Button
        shape="circle"
        icon={<UndoOutlined />}
        size="large"
        value="undo"
        className={clsx('task-timeline-action-check text-success', {
          hidden: currentStatus === 'default' || currentStatus !== 'check',
        })}
        onClick={handleClick}
      />
      <Button
        shape="circle"
        icon={<CloseOutlined />}
        size="large"
        value="default"
        className={clsx('task-timeline-action-delete text-danger', {
          hidden:
            currentStatus === 'default' || currentStatus === 'check' || currentStatus === 'undo',
        })}
        onClick={handleClick}
      />
      <Button
        shape="circle"
        icon={<CheckOutlined />}
        size="large"
        value="confirm"
        className={clsx('task-timeline-action-check text-success', {
          hidden:
            currentStatus === 'default' || currentStatus === 'check' || currentStatus === 'undo',
        })}
        onClick={handleClick}
      />
    </div>
  )
}

export default TaskAction

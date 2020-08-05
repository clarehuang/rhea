import React, { useState } from 'react'
import { Button } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import clsx from 'clsx'
import ajax from '../../../client/utils/ajax'

interface TaskActionProps {
  status?: string
  onSelectStatus?: (status: string) => void
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
        const elem = e.target as HTMLButtonElement
        const task = elem.closest('.ant-timeline-item')
        console.log('Save edits', task.id)
        ajax({
          url: '/api/task',
          method: 'PATCH',
          data: { _id: task.id },
          success(res, status) {
            console.log('res type is', res)
          },
          fail(res, status) {
            //TODO : finish fail action, indluding error handling
            console.log(status, res)
            console.log('post task fails')
          },
        })
      }

      // line through card content
      if (value !== 'default' && value === 'check') {
        const sibling = e.currentTarget.parentElement.previousElementSibling
        sibling.style.textDecoration = 'line-through'

        const elem = e.target as HTMLButtonElement
        const task = elem.closest('.ant-timeline-item')
        console.log('Save edits', task.id)
        ajax({
          url: '/api/task',
          method: 'PATCH',
          data: { _id: task.id, status: task.status },
          success(res, status) {
            console.log('res type is', res)
          },
          fail(res, status) {
            //TODO : finish fail action, indluding error handling
            console.log(status, res)
            console.log('post task fails')
          },
        })
      }
      if (value !== 'default' && value === 'undo') {
        const sibling = e.currentTarget.parentElement.previousElementSibling
        sibling.style.textDecoration = 'none'

        const elem = e.target as HTMLButtonElement
        const task = elem.closest('.ant-timeline-item')
        console.log('Save edits', task.id)
        ajax({
          url: '/api/task',
          method: 'PATCH',
          data: { _id: task.id, status: task.status },
          success(res, status) {
            console.log('res type is', res)
          },
          fail(res, status) {
            //TODO : finish fail action, indluding error handling
            console.log(status, res)
            console.log('post task fails')
          },
        })
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
        icon={<CloseCircleOutlined />}
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
        icon={<CheckCircleOutlined />}
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

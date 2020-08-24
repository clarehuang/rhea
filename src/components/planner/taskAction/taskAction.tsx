import React, { useState } from 'react'
import { Button } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  UndoOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import ajax from '../../../client/utils/ajax'

interface TaskActionProps {
  // passed down from the outside component which is TaskTimeline
  status?: string
  itemId?: string
  onSelectStatus?: (status: string, e: React.MouseEvent | React.KeyboardEvent) => void
}

const TaskAction: React.FC<TaskActionProps> = ({ status, itemId, ...props }) => {
  const globalState = useSelector((state) => state)
  console.log('global state is ', globalState.activeForm?.id)
  const dispatch = useDispatch()
  const [currentStatus, setStatus] = useState(status ? status : 'default')
  let previousStatus = ''
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent): void => {
    previousStatus = currentStatus
    const elem = e.currentTarget as HTMLButtonElement
    const value = elem.value
    if (
      e.nativeEvent instanceof MouseEvent ||
      (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.keyCode === 32)
    ) {
      value === 'confirm' ? setStatus('default') : setStatus(value)
      props.onSelectStatus?.(value, e)
      // TASK ACTION: DELETE
      if (previousStatus === 'delete' && value === 'confirm') {
        document.getElementById(itemId).remove()
        ajax({
          url: '/api/task',
          method: 'DELETE',
          data: { _id: itemId },
          success(res, status) {
            console.log('res type is', res)
          },
          fail(res, status) {
            //TODO : finish fail action, indluding error handling
            console.log(res)
            console.log('post task fails')
          },
        })
      }
      // TASK ACTION: EDIT
      if (previousStatus === 'edit' && value === 'confirm') {
        const values = globalState.activeForm?.formRef?.current?.getFieldsValue()
        ajax({
          url: '/api/task',
          method: 'PATCH',
          data: { _id: itemId, ...values },
          success(res, status) {
            console.log('res type is', res)
            dispatch({ type: 'TASK_EDIT', editedId: itemId, updatedValues: values })
          },
          fail(res, status) {
            //TODO : finish fail action, indluding error handling
            console.log(status, res)
            console.log('post task fails')
          },
        })
        dispatch({ type: 'SET_ACTIVEFORM', id: null, ref: null })
      }
      // TASK ACTION: CHECK
      if (value === 'check' || value === 'undo') {
        ajax({
          url: '/api/task',
          method: 'PATCH',
          data: { _id: itemId, status: `${currentStatus === 'check' ? 'default' : 'check'}` },
          success(res, status) {
            dispatch({ type: 'TASK_CHECK', checkedID: itemId })
          },
          fail(res, status) {
            //TODO : finish fail action, indluding error handling
            console.log(status, res)
            console.log('post task fails')
          },
        })
      }
      // TASK ACTION: CANCEl, RETURN DEFAULT
      if (
        (previousStatus === 'edit' && value === 'default') ||
        (previousStatus === 'delete' && value === 'default')
      ) {
        dispatch({ type: 'SET_ACTIVEFORM', id: null, ref: null })
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
            currentStatus === 'check' || currentStatus === 'delete' || currentStatus === 'edit',
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

import React from 'react'
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
import { pareZoneFormat } from '../../client/utils/utils'
import clsx from 'clsx'
import ajax from '../../client/utils/ajax'
import { deleteTasks, editTasks, checkTasks } from '../../action/task'

interface TaskActionProps {
  status?: string
  itemId?: string
}

const TaskAction: React.FC<TaskActionProps> = ({ status, itemId }) => {
  const activeForm = useSelector((state) => state.activeForm)
  const activeStatus = useSelector((state) => state.activeStatus)
  const dispatch = useDispatch()
  const currentStatus =
    activeStatus?.value === null ||
    typeof activeStatus?.value === 'undefined' ||
    activeStatus?.value.length === 0
      ? status
      : activeStatus?.value
  let previousStatus = ''

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent): void => {
    previousStatus = currentStatus
    const elem = e.currentTarget as HTMLButtonElement
    const value = elem.value
    if (
      e.nativeEvent instanceof MouseEvent ||
      (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.keyCode === 32)
    ) {
      value === 'confirm'
        ? dispatch({ type: 'SET_ACTIVESTATUS', statusValue: 'default', _id: '' })
        : dispatch({ type: 'SET_ACTIVESTATUS', statusValue: value, _id: itemId })

      // TASK ACTION: DELETE
      if (previousStatus === 'delete' && value === 'confirm') {
        document.getElementById(itemId).remove()
        dispatch(deleteTasks(itemId))
      }
      // TASK ACTION: EDIT
      if (previousStatus === 'edit' && value === 'confirm') {
        const values = activeForm?.formRef?.current?.getFieldsValue()
        const startDate = pareZoneFormat(values.range[0], 'YYYY-MM-DD')
        dispatch({ type: 'SET_PICKEDDATE', pickedDate: startDate })
        dispatch(editTasks(itemId, values, startDate))
        dispatch({ type: 'SET_ACTIVEFORM', id: null, ref: null })
      }
      // TASK ACTION: CHECK
      if (value === 'check' || value === 'undo') {
        dispatch(checkTasks(itemId, currentStatus))
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

  return (
    <div className="task-timeline-action">
      <Button
        value="delete"
        shape="circle"
        icon={<DeleteOutlined />}
        size="large"
        className={clsx('task-timeline-action-delete text-danger', {
          hidden:
            currentStatus !== 'default' && currentStatus !== 'check' && currentStatus !== 'undo',
        })}
        onClick={handleClick}
      />
      <Button
        value="edit"
        shape="circle"
        icon={<EditOutlined />}
        size="large"
        className={clsx('task-timeline-action-edit text-gray-700', {
          hidden:
            currentStatus !== 'default' && currentStatus !== 'check' && currentStatus !== 'undo',
        })}
        onClick={handleClick}
      />
      <Button
        value="check"
        shape="circle"
        icon={<CheckOutlined />}
        size="large"
        className={clsx('task-timeline-action-check text-success', {
          hidden:
            currentStatus === 'check' || currentStatus === 'delete' || currentStatus === 'edit',
        })}
        onClick={handleClick}
      />
      <Button
        value="undo"
        shape="circle"
        icon={<UndoOutlined />}
        size="large"
        className={clsx('task-timeline-action-check text-success', {
          hidden: currentStatus === 'default' || currentStatus !== 'check',
        })}
        onClick={handleClick}
      />
      <Button
        value="default"
        shape="circle"
        icon={<CloseCircleOutlined />}
        size="large"
        className={clsx('task-timeline-action-delete text-danger', {
          hidden:
            currentStatus === 'default' || currentStatus === 'check' || currentStatus === 'undo',
        })}
        onClick={handleClick}
      />
      <Button
        value="confirm"
        shape="circle"
        icon={<CheckCircleOutlined />}
        size="large"
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

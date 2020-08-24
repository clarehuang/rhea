import React, { useState, useEffect, useRef, createRef } from 'react'
import { Timeline } from 'antd'
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { TaskAction } from '../index'
import { TaskData } from '../../type'
import EditTask from '../editTask/editTask'
import clsx from 'clsx'
import ajax from '../../../client/utils/ajax'
import { localTimezone } from '../../../client/utils'
import moment from 'moment'

interface TaskTimelineProps {
  filterValue: string
  children?: React.ReactNode
}

const TaskTimeline: React.FC<TaskTimelineProps> = ({ filterValue }) => {
  const tasks = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [actionStatus, setActionState] = useState('')

  const RenderTimeline = (items: TaskData, filterTagValue: string): React.ReactNode => {
    return items.map((item, index: number) => (
      <Timeline.Item
        label={`${moment(localTimezone(item.range[0])).format('hh:mm a')} - ${moment(
          localTimezone(item.range[1])
        ).format('hh:mm a')}`}
        className={clsx(`task-${item.tag}`, {
          hidden: filterTagValue !== 'all' && filterTagValue !== item.tag,
        })}
        key={`task-timeline-${index}`}
        id={item._id}
      >
        <div className="task-timeline-card">
          <div
            className={clsx(`task-timeline-card-content task-content--${item._id}`, {
              'line-through': item.status === 'check',
            })}
          >
            <h3>{item.title}</h3>
            <p>{item.des}</p>
            <a href="/planner" className="text-info">
              <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
              {item.location}
            </a>
          </div>
          <EditTask
            className={clsx(`task-timeline-edit-form task-edit-form--${item._id}`)}
            fieldsValue={item}
            itemId={item._id}
            style={{ display: 'none' }}
            actionStatus={actionStatus}
          />
          <TaskAction
            status={item.status}
            itemId={item._id}
            onSelectStatus={(value, e) => {
              document.querySelector(`.task-content--${item._id}`).style.display =
                value === 'edit' ? 'none' : 'block'
              document.querySelector(`.task-edit-form--${item._id}`).style.display =
                value === 'edit' ? 'block' : 'none'

              setActionState(`${value}--${item._id}`)
            }}
          />
        </div>
      </Timeline.Item>
    ))
  }
  useEffect(() => {
    setLoading(true)
    ajax({
      url: '/api/task',
      method: 'GET',
      data: {},
      success(res: object, status) {
        setLoading(false)
        const tasks = res as Array<object>
        dispatch({ type: 'TASK_GET', allTasks: tasks })

        // TODO: add new tag color
        // for (let i = 0; i < Object.keys(Tags).length; i++) {
        //   const key = Object.keys(Tags)[i]
        //   const list = document.querySelectorAll(
        //     `.task-${key} .ant-timeline-item-head.ant-timeline-item-head-blue`
        //   )
        //   list.forEach((item) => (item.style.backgroundColor = Tags[key][1]))
        // }
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        console.log(status, res)
        console.log('post task fails')
      },
    })
  }, [])
  if (isLoading) {
    return (
      <h3>
        <LoadingOutlined style={{ marginRight: '1rem' }} />
        Loading...
      </h3>
    )
  }
  return (
    <div className="task-timeline">
      <Timeline mode="left">{RenderTimeline(tasks, filterValue)}</Timeline>
    </div>
  )
}

export default TaskTimeline

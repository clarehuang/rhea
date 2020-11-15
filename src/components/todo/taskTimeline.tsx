import React, { useEffect } from 'react'
import { Timeline } from 'antd'
import { EnvironmentOutlined, LoadingOutlined, CalendarOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { default as TaskAction } from './taskAction'
import { TaskData } from '../type'
import EditTask from './editTask'
import clsx from 'clsx'
import { loadTasks } from '../../action/task'
import { localTimezone } from '../../client/utils/utils'
import moment from 'moment'

interface TaskTimelineProps {
  filterValue: string
  children?: React.ReactNode
}

const TaskTimeline: React.FC<TaskTimelineProps> = ({ filterValue }) => {
  const tasks = useSelector((state) => state.tasks)
  const activeStatus = useSelector((state) => state.activeStatus)
  const pickedDate = useSelector((state) => state.pickedDate)
  const isLoadingTasks = useSelector((state) => state.isLoadingTasks)
  const dispatch = useDispatch()
  const i = Math.floor(Math.random() * Math.floor(2))

  const RenderTimeline = (items: TaskData, filterTagValue: string): React.ReactNode => {
    return items.map((item, index: number) => {
      return (
        <Timeline.Item
          label={`${moment(localTimezone(item.range[0])).format('hh:mm a')} - ${moment(
            localTimezone(item.range[1])
          ).format('hh:mm a')}`}
          className={clsx(`task-timeline-li task-${item.tag}`, {
            hidden: filterTagValue !== 'all' && filterTagValue !== item.tag,
          })}
          key={`task-timeline-${index}`}
          id={item._id}
          onMouseLeave={(e): void => {
            const elem = e.target as HTMLLIElement
            if (elem.tagName !== 'INPUT' && elem.tagName !== 'TEXTAREA') {
              dispatch({ type: 'SET_ACTIVESTATUS', statusValue: null, _id: '' })
            }
          }}
        >
          <div className="task-timeline-card">
            {`${activeStatus?.value}--${activeStatus?._id}` === `edit--${item._id}` ? (
              <EditTask
                className={clsx(`task-timeline-edit-form task-edit-form--${item._id}`, {})}
                fieldsValue={item}
                itemId={item._id}
              />
            ) : (
              <div
                className={clsx(`task-timeline-card-content task-content--${item._id}`, {
                  'line-through': item.status === 'check',
                })}
              >
                <h3>{item.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{item.des}</p>
                <a
                  href={item.location ? `http://maps.google.com/?q=${item.location}` : null}
                  target="blank"
                  className="text-info"
                >
                  <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
                  {item.location}
                </a>
              </div>
            )}
            <TaskAction status={item.status} itemId={item._id} />
          </div>
        </Timeline.Item>
      )
    })
  }
  useEffect(() => {
    dispatch(loadTasks(pickedDate))
  }, [pickedDate])
  if (isLoadingTasks) {
    return (
      <h3>
        <LoadingOutlined style={{ marginRight: '1rem' }} />
        Loading...
      </h3>
    )
  }
  return (
    <div className="task-timeline">
      {tasks.length !== 0 ? (
        <Timeline mode="left">{RenderTimeline(tasks, filterValue)}</Timeline>
      ) : (
        <div className="task-timeline__default __container">
          <div className="__mask">
            <h1>ADD NEW PLAN</h1>
            <img className="__default__img" src={`/task-timeline-${i}.jpg`} alt="Add new todo!" />
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskTimeline

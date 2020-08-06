import React, { useState, useEffect } from 'react'
import { Timeline } from 'antd'
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons'
import { Tags, TaskAction } from '../index'
import { TaskData } from '../../type'
import clsx from 'clsx'
import ajax from '../../../client/utils/ajax'
import { localTimezone } from '../../../client/utils'
import moment from 'moment'

interface TaskTimelineProps {
  filterValue: string
  children?: React.ReactNode
}
const RenderTimeline = (items: TaskData, filterTagValue: string): React.ReactNode => {
  items.sort(function (a, b) {
    console.log('moment format - month', moment(localTimezone(a.range[0])).format('MMM'))
    console.log('moment format - date', moment(localTimezone(a.range[0])).format('DD'))
    console.log('moment format - year', moment(localTimezone(a.range[0])).format('YYYY'))
    return (
      parseInt(moment(localTimezone(a.range[0])).format('X')) -
      parseInt(moment(localTimezone(b.range[0])).format('X'))
    )
  })
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
      data-status={item.status}
    >
      <div className="task-timeline-card">
        <div
          className={clsx('task-timeline-card-content', {
            'line-through': item.status === 'check',
          })}
        >
          <h3>{item.title}</h3>
          <p>{item.des}</p>
          <a href="/planner" className="text-info">
            <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
            {item.location}
            {item.status}
          </a>
        </div>
        <TaskAction status={item.status} />
      </div>
    </Timeline.Item>
  ))
}

const TaskTimeline: React.FC<TaskTimelineProps> = ({ filterValue }) => {
  const [isLoading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    setLoading(true)
    ajax({
      url: '/api/task',
      method: 'GET',
      data: {},
      success(res, status) {
        setLoading(false)
        console.log('res type is', typeof res, 'res is ', res)
        setTasks(res)
        for (let i = 0; i < Object.keys(Tags).length; i++) {
          const key = Object.keys(Tags)[i]
          const list = document.querySelectorAll(
            `.task-${key} .ant-timeline-item-head.ant-timeline-item-head-blue`
          )
          list.forEach((item) => (item.style.backgroundColor = Tags[key][1]))
        }
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

import React, { useState, useEffect } from 'react'
import { Timeline } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import { Tags, TaskAction } from '../index'
import { TaskData } from '../../type'
import clsx from 'clsx'

interface TaskTimelineProps {
  filterValue: string
  children?: React.ReactNode
}

const data: TaskData = [
  {
    title: 'Grocery Trip',
    location: 'Fremont, CA',
    range: [],
    tag: 'home',
    des:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status: 'default',
  },
  {
    title: 'Meeting with Bob',
    location: 'San Jose, CA',
    range: [],
    tag: 'work',
    des:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    status: 'default',
  },
  {
    title: 'Grocery Trip',
    location: 'Fremont, CA',
    range: [{ d: '09:00 - 12:00' }],
    tag: 'home',
    des:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    status: 'default',
  },
  {
    title: 'Check Stock Market',
    location: 'Milpitas, CA',
    range: [],
    tag: 'finance',
    des:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    status: 'default',
  },
]

const TaskTimeline: React.FC<TaskTimelineProps> = ({ filterValue }) => {
  const [actionStatus, setActionStatus] = useState('default')
  const handleSelectStatus = (status: string): void => {
    setActionStatus(status)
  }
  const RenderTimeline = (items: TaskData): React.ReactNode => {
    return items.map((item, index: number) => (
      <Timeline.Item
        label="09:00 - 12:00"
        className={clsx(`task-${item.tag}`, {
          hidden: filterValue !== 'all' && filterValue !== item.tag,
        })}
        key={`task-timeline-${index}`}
      >
        <div className="task-timeline-card">
          <div
            className={clsx('task-timeline-card-content', {
              // 'line-through': actionStatus === 'check',
            })}
          >
            <h3>{item.title}</h3>
            <p>{item.des}</p>
            <a href="/planner" className="text-info">
              <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
              {item.location}
            </a>
          </div>
          <TaskAction status={actionStatus} onSelectStatus={handleSelectStatus} />
        </div>
      </Timeline.Item>
    ))
  }
  useEffect(() => {
    for (let i = 0; i < Object.keys(Tags).length; i++) {
      const key = Object.keys(Tags)[i]
      const list = document.querySelectorAll(
        `.task-${key} .ant-timeline-item-head.ant-timeline-item-head-blue`
      )
      list.forEach((item) => (item.style.backgroundColor = Tags[key][1]))
    }
  }, [])
  return (
    <div className="task-timeline">
      <Timeline mode="left">{RenderTimeline(data)}</Timeline>
    </div>
  )
}

export default TaskTimeline

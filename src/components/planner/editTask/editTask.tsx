import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import clsx from 'clsx'
import { localTimezone } from '../../../client/utils'
import { Tags } from '../index'
import { Task } from '../../type'

const { RangePicker } = DatePicker

interface EditTaskProps {
  className?: string
  id?: string
  itemId?: string
  style?: React.CSSProperties
  visible?: boolean
  fieldsValue: Task
  // dispatch formref
  actionStatus?: string
}

const { Option } = Select
const { TextArea } = Input
const EditTask: React.FC<EditTaskProps> = ({
  className,
  fieldsValue,
  style,
  itemId,
  actionStatus,
}) => {
  const [tagColorPicked, setTagColorPicked] = useState(Tags[fieldsValue.tag][1])
  const formRef: React.Ref<FormInstance> = useRef(null)
  const config = {
    title: {
      rules: [{ required: true, message: 'Please enter the title of the task.' }],
    },
    location: {
      rules: [{ required: false }],
    },
    range: {
      rules: [{ required: true, message: 'Please enter the date and time.' }],
    },
    tag: {
      rules: [{ required: false }],
    },
    des: {
      rules: [{ required: false }],
    },
    status: {
      rules: [{ required: false }],
    },
  }
  const dispatch = useDispatch()

  const handleTagChange = (value: string): void => {
    setTagColorPicked(Tags[value][1])
  }

  useEffect(() => {
    const elem = document.getElementById(`edit_task--${itemId}`) as HTMLElement
    elem?.style.setProperty('--color-tag', tagColorPicked)
    if (actionStatus === `edit--${itemId}`) {
      dispatch({ type: 'SET_ACTIVEFORM', id: itemId, ref: formRef })
    }
  }, [tagColorPicked, actionStatus])

  return (
    <Form
      name={`edit_task--${itemId}`}
      className={clsx(`add-task-form`, className)}
      style={Object.assign({ paddingTop: '1rem' }, style)}
      ref={formRef}
      initialValues={{
        title: fieldsValue.title,
        location: fieldsValue.location,
        tag: fieldsValue.tag,
        des: fieldsValue.des,
        range: [
          moment(localTimezone(fieldsValue.range[0])),
          moment(localTimezone(fieldsValue.range[1])),
        ],
      }}
    >
      <Form.Item name="title" {...config.title}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="location" {...config.location}>
        <Input type="Location" placeholder="Location" />
      </Form.Item>
      <Form.Item name="range" {...config.range}>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          style={{ marginRight: 0 }}
          minuteStep={5}
        />
      </Form.Item>
      <Form.Item name="des" {...config.des}>
        <TextArea
          placeholder="Description"
          autoSize={{ minRows: 5, maxRows: 8 }}
          className="task-des"
        />
      </Form.Item>
      <Form.Item name="tag" style={{ width: '40%' }} {...config.tag}>
        <Select onChange={handleTagChange} className="tag-select" bordered={false}>
          <Option value="home">Home</Option>
          <Option value="work">Work</Option>
          <Option value="finance">Finance</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

// EditTask.displayName = 'EditTask'
export default EditTask

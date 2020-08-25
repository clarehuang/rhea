import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import clsx from 'clsx'
import { localTimezone } from '../../../client/utils'
import { Tags } from '../index'
import { Task } from '../../type'
import { taskFormConfig } from '../config'

const { RangePicker } = DatePicker

interface EditTaskProps {
  className?: string
  id?: string
  itemId?: string
  style?: React.CSSProperties
  visible?: boolean
  fieldsValue: Task
}

const { Option } = Select
const { TextArea } = Input
const EditTask: React.FC<EditTaskProps> = ({ className, fieldsValue, style, itemId }) => {
  const [tagColorPicked, setTagColorPicked] = useState(Tags[fieldsValue.tag][1])
  const formRef: React.Ref<FormInstance> = useRef(null)
  const activeStatus = useSelector((state) => state.activeStatus)
  const dispatch = useDispatch()

  const handleTagChange = (value: string): void => {
    setTagColorPicked(Tags[value][1])
  }
  useEffect(() => {
    const elem = document.getElementById(`edit_task--${itemId}`) as HTMLElement
    elem?.style.setProperty('--task-color-tag', tagColorPicked)
    if (`${activeStatus?.value}--${activeStatus?._id}` === `edit--${itemId}`) {
      dispatch({ type: 'SET_ACTIVEFORM', id: itemId, ref: formRef })
    }
  }, [tagColorPicked, activeStatus])

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
      <Form.Item name="range" {...taskFormConfig.range}>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          style={{ marginRight: 0 }}
          minuteStep={5}
        />
      </Form.Item>
      <Form.Item name="title" {...taskFormConfig.title}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="location" {...taskFormConfig.location}>
        <Input type="Location" placeholder="Location" />
      </Form.Item>
      <Form.Item name="des" {...taskFormConfig.des}>
        <TextArea
          placeholder="Description"
          autoSize={{ minRows: 5, maxRows: 8 }}
          className="task-des"
        />
      </Form.Item>
      <Form.Item name="tag" style={{ width: '40%' }} {...taskFormConfig.tag}>
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

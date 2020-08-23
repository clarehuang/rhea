import React, { useEffect, useState, useRef, CSSProperties } from 'react'
import { Form, Input, Button, Row, Select, DatePicker } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { Store } from 'antd/lib/form/interface'
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
  style?: CSSProperties
  visible?: boolean
  fieldsValue: Task
  onSetValue?: (values: Task) => void
}

const { Option } = Select
const { TextArea } = Input
const EditTask: React.FC<EditTaskProps> = ({ className, fieldsValue, style, itemId, ...props }) => {
  console.log('fieldValue range[0] is ', typeof localTimezone(fieldsValue.range[0]))
  props.onSetValue?.({
    title: 'edit test',
    location: 'edit test',
    range: [],
    tag: 'home',
    des: 'This is an edit des.',
  })
  const formRef: React.Ref<FormInstance> = useRef(null)
  const [tagColorPicked, setTagColorPicked] = useState(Tags[fieldsValue.tag][1])
  useEffect(() => {
    const elem = document.getElementById(`edit_task--${itemId}`) as HTMLElement
    elem.style.setProperty('--color-tag', tagColorPicked)
  }, [tagColorPicked])

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

  const handleFinish = (fieldsValue: Store): void => {
    const values = {
      ...fieldsValue,
      title: fieldsValue['title'],
      location:
        typeof fieldsValue['location'] === 'undefined'
          ? 'No location specified.'
          : fieldsValue['location'],
      range: fieldsValue['range'],
      tag: fieldsValue['tag'],
      des:
        typeof fieldsValue['des'] === 'undefined'
          ? 'Add description through edit.'
          : fieldsValue['des'],
      status: 'default',
    }
    formRef?.current.resetFields()
    console.log('onHandleFinish from edit status', values)

    setTagColorPicked(Tags[formRef?.current.getFieldsValue().tag][1])
  }
  const handleFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo)
  }

  const handleTagChange = (value: string): void => {
    setTagColorPicked(Tags[value][1])
  }

  console.log('test fields', formRef.current?.getFieldsValue())
  return (
    <Form
      name={`edit_task--${itemId}`}
      className={clsx(`add-task-form`, className)}
      onFinishFailed={handleFinishFailed}
      style={Object.assign({ paddingTop: '1rem' }, style)}
      ref={formRef}
      initialValues={{
        title: fieldsValue.title,
        location: fieldsValue.location,
        tag: fieldsValue.tag,
        des: fieldsValue.des,
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
          defaultValue={[
            moment(localTimezone(fieldsValue.range[0])),
            moment(localTimezone(fieldsValue.range[1])),
          ]}
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

export default EditTask

import React, { useEffect, useState, useRef, CSSProperties } from 'react'
import { Form, Input, Button, Row, Select, DatePicker } from 'antd'
import { useDispatch } from 'react-redux'
import { pareZoneFormat } from '../../client/utils/utils'
import { FormInstance } from 'antd/lib/form'
import { Store } from 'antd/lib/form/interface'
import { Tags } from './todo'
import { Task } from '../type'
import { taskFormConfig } from './config'
import { addTasks } from '../../action/task'
import ajax from '../../client/utils/ajax'

const { RangePicker } = DatePicker

interface AddTaskProps {
  selectedTagColor?: string
  id?: string
  style?: CSSProperties
  visible?: boolean
  onOpen?: (visible: boolean) => void
}

const { Option } = Select
const { TextArea } = Input
const AddTask: React.FC<AddTaskProps> = ({ selectedTagColor = Tags['home'][1], onOpen }) => {
  const dispatch = useDispatch()

  const formRef: React.Ref<FormInstance> = useRef(null)
  const [tagColorPicked, setTagColorPicked] = useState(selectedTagColor)
  useEffect(() => {
    const root = document.documentElement as HTMLElement
    root.style.setProperty('--task-color-tag', tagColorPicked)
  }, [tagColorPicked])

  const handleReset = (): void => {
    formRef?.current.resetFields()
    onOpen?.(false)
    setTagColorPicked(Tags[formRef?.current.getFieldsValue().tag][1])
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
    console.log(values)
    const startDate = pareZoneFormat(values.range[0], 'MM-DD-YYYY')
    dispatch({ type: 'SET_PICKEDDATE', pickedDate: startDate })
    formRef?.current.resetFields()
    onOpen?.(false)
    dispatch(addTasks(values, startDate))
    setTagColorPicked(Tags[formRef?.current.getFieldsValue().tag][1])
  }
  const handleFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo)
  }

  const handleTagChange = (value: string): void => {
    console.log('check tag ', value)
    setTagColorPicked(Tags[value][1])
  }
  const [textareaValue, setTextareaValue] = useState()

  return (
    <Form
      name="add_task"
      className="add-task-form"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      style={{ paddingTop: '1rem' }}
      ref={formRef}
      initialValues={{
        tag: 'home',
      }}
    >
      <Form.Item name="title" {...taskFormConfig.title}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="location" {...taskFormConfig.location}>
        <Input type="Location" placeholder="Location" />
      </Form.Item>

      <Form.Item name="range" {...taskFormConfig.range}>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          style={{ marginRight: 0 }}
          minuteStep={5}
        />
      </Form.Item>
      <Form.Item name="des" {...taskFormConfig.des}>
        <TextArea
          placeholder="Description"
          autoSize={{ minRows: 5, maxRows: 8 }}
          className="task-des"
          onPressEnter={(e) => {
            console.log('press enter', e.currentTarget.value)
          }}
          value={textareaValue}
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

      <Row className="add-task-buttons">
        <Form.Item>
          <Button className="outline-button" onClick={handleReset}>
            CANCEL
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="primary-button">
            SAVE
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default AddTask

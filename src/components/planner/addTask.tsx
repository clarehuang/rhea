import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, Button, TimePicker, Row, Select } from 'antd'
import { TagColor } from '../type'
import './planner.less'
import ajax from '../../client/utils/ajax'
import { FormInstance } from 'antd/lib/form'
import { Store } from 'antd/lib/form/interface'

// TODO: replace with real data
const tagColor: TagColor = {
  home: '#a11a0f',
  work: '#dc833c',
}

interface AddTaskProps {
  selectedTagColor?: string
  id?: string
  onOpen?: (visible: boolean) => void
}

const { Option } = Select
const { TextArea } = Input
const AddTask: React.FC<AddTaskProps> = ({ selectedTagColor = tagColor['home'], onOpen }) => {
  const formRef: React.Ref<FormInstance> = useRef(null)
  const [tagColorPicked, setTagColorPicked] = useState(selectedTagColor)
  useEffect(() => {
    const elem = document.querySelector('.add-task-form') as HTMLElement
    elem.style.setProperty('--color-tag', tagColorPicked)
  }, [tagColorPicked])

  const config = {
    title: {
      rules: [{ required: true, message: 'Please enter the title of the task.' }],
    },
    location: {
      rules: [{ required: false }],
    },
    startTime: {
      rules: [{ required: true, message: 'Missing.' }],
    },
    endTime: {
      rules: [{ required: true, message: 'Missing.' }],
    },
    tag: {
      rules: [{ required: false }],
    },
    des: {
      rules: [{ required: false }],
    },
  }

  const handleReset = (): void => {
    formRef?.current.resetFields()
  }
  // const handleSubmit = (): void => {}
  const handleFinish = (fieldsValue: Store): void => {
    const values = {
      ...fieldsValue,
      title: fieldsValue['title'],
      location: fieldsValue['location'],
      'start-time': fieldsValue['start-time'].format('hh:mm a'),
      'end-time': fieldsValue['end-time'].format('hh:mm a'),
      tag: fieldsValue['tag'],
      des: fieldsValue['des'],
    }
    formRef?.current.resetFields()
    onOpen?.(false)
    console.log('Received values of form: ', values)
    ajax({
      url: '/api/task/planner',
      method: 'POST',
      data: values,
      success(res, status) {
        //TODO : finish success action, indluding redirect to home page
        console.log(status, res)
        console.log('post task sucess')
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        console.log(status, res)
        console.log('post task fails')
      },
    })
  }
  const handleFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo)
  }

  const handleTagChange = (value: string): void => {
    setTagColorPicked(tagColor[value])
  }

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
      <Form.Item name="title" {...config.title}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="location" {...config.location}>
        <Input type="Location" placeholder="Location" />
      </Form.Item>
      <Row style={{ justifyContent: 'flex-start' }}>
        <Form.Item name="start-time" {...config.startTime}>
          <TimePicker use12Hours format="hh:mm a" minuteStep={5} placeholder="Start Time" />
        </Form.Item>
        <Form.Item name="end-time" {...config.endTime}>
          <TimePicker use12Hours format="hh:mm a" minuteStep={5} placeholder="End Time" />
        </Form.Item>
        <Form.Item name="tag" style={{ width: '99px' }} {...config.tag}>
          <Select onChange={handleTagChange} className="tag-select" bordered={false}>
            <Option value="home">Home</Option>
            <Option value="work">Work</Option>
          </Select>
        </Form.Item>
      </Row>
      <Form.Item name="des" {...config.des}>
        <TextArea
          placeholder="Description"
          autoSize={{ minRows: 5, maxRows: 8 }}
          className="task-des"
        />
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

export { AddTask }

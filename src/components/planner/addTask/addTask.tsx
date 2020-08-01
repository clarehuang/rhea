import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, Button, Row, Select, DatePicker } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { Store } from 'antd/lib/form/interface'
import { Tags } from '../index'
import ajax from '../../../client/utils/ajax'

const { RangePicker } = DatePicker

interface AddTaskProps {
  selectedTagColor?: string
  id?: string
  visible?: boolean
  onOpen?: (visible: boolean) => void
}

const { Option } = Select
const { TextArea } = Input
const AddTask: React.FC<AddTaskProps> = ({ selectedTagColor = Tags['home'][1], onOpen }) => {
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
    range: {
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
    onOpen?.(false)
    setTagColorPicked(Tags[formRef?.current.getFieldsValue().tag][1])
  }
  const handleFinish = (fieldsValue: Store): void => {
    const values = {
      ...fieldsValue,
      title: fieldsValue['title'],
      location: fieldsValue['location'],
      range: fieldsValue['range'],
      tag: fieldsValue['tag'],
      des: fieldsValue['des'],
    }
    formRef?.current.resetFields()
    onOpen?.(false)
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
    setTagColorPicked(Tags[formRef?.current.getFieldsValue().tag][1])
  }
  const handleFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo)
  }

  const handleTagChange = (value: string): void => {
    setTagColorPicked(Tags[value][1])
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

      <Form.Item name="range" {...config.range}>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          style={{ marginRight: 0 }}
          use12Hours={true}
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

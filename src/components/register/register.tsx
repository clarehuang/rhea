import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import ajax from '../../client/utils/ajax'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

type AccountType = { username: string; password: string }

const Register = () => {
  const onFinish = ({ username, password }: AccountType) => {
    ajax({
      url: '/api/user/register',
      method: 'POST',
      data: {
        username,
        password,
      },
      success(res, status) {
        //TODO : finish success action, indluding redirect to home page
        console.log(status, res)
      },
      fail(res, status) {
        //TODO : finish fail action, indluding error handling
        console.log(status, res)
      },
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <h1>Register</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: '400px' }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register

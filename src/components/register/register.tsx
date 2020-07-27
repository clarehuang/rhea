import React from 'react'
import { Form, Input, Button } from 'antd'
import ajax from '../../client/utils/ajax'
import { Store } from 'antd/lib/form/interface'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

type AccountType = { username: string; password: string; values?: Store }

const Register = () => {
  const handleFinish = ({ username, password }: AccountType): void => {
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

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <h1>Register</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Create An Account
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Register

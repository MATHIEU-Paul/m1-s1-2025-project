import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Tabs,
  Typography,
  message,
} from 'antd'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from './useAuth'

type AuthMode = 'login' | 'register'

type AuthModalProps = {
  open: boolean
  mode: AuthMode
  onClose: () => void
}

type AuthFormValues = {
  username: string
  password: string
  confirmPassword?: string
}

export function AuthModal({ open, mode, onClose }: AuthModalProps) {
  const [activeMode, setActiveMode] = useState<AuthMode>(mode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { login, register } = useAuth()
  const [form] = Form.useForm<AuthFormValues>()

  const modalTitle = useMemo(
    () => (activeMode === 'login' ? 'Log in' : 'Sign up'),
    [activeMode],
  )

  useEffect(() => {
    if (open) {
      setActiveMode(mode)
    }
  }, [mode, open])

  const onFinish = async (values: AuthFormValues) => {
    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      if (activeMode === 'login') {
        await login(values.username, values.password)
        message.success('Logged in successfully')
      } else {
        await register(values.username, values.password)
        message.success('Account created and logged in')
      }

      form.resetFields()
      onClose()
    } catch (error) {
      const fallbackMessage =
        activeMode === 'login'
          ? 'Unable to log in with these credentials.'
          : 'Unable to create this account.'

      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message
        if (typeof apiMessage === 'string') {
          setErrorMessage(apiMessage)
        } else if (
          Array.isArray(apiMessage) &&
          typeof apiMessage[0] === 'string'
        ) {
          setErrorMessage(apiMessage[0])
        } else {
          setErrorMessage(fallbackMessage)
        }
      } else {
        setErrorMessage(fallbackMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      className="auth-modal"
      open={open}
      title={modalTitle}
      onCancel={() => {
        setErrorMessage(null)
        form.resetFields()
        onClose()
      }}
      footer={null}
      destroyOnHidden
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Text type="secondary">
          Create a demo account or log in with an existing one.
        </Typography.Text>

        <Tabs
          activeKey={activeMode}
          onChange={key => {
            setErrorMessage(null)
            setActiveMode(key as AuthMode)
            form.resetFields()
          }}
          items={[
            { key: 'login', label: 'Log in' },
            { key: 'register', label: 'Sign up' },
          ]}
        />

        {errorMessage && <Alert type="error" message={errorMessage} showIcon />}

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Username is required.' },
              { min: 3, message: 'Minimum 3 characters.' },
              {
                pattern: /^[a-zA-Z0-9_.-]+$/,
                message: 'Use only letters, numbers, ., _, and -.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required.' },
              { min: 6, message: 'Minimum 6 characters.' },
            ]}
          >
            <Input.Password
              autoComplete={
                activeMode === 'login' ? 'current-password' : 'new-password'
              }
            />
          </Form.Item>

          {activeMode === 'register' ? (
            <Form.Item
              label="Confirm password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password.' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(new Error('Passwords do not match.'))
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
          ) : null}

          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            {activeMode === 'login' ? 'Log in' : 'Sign up'}
          </Button>
        </Form>
      </Space>
    </Modal>
  )
}

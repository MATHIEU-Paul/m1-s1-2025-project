import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Space } from 'antd'
import { useState } from 'react'
import type { CreateClientModel } from '../ClientModel'

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setIsOpen(false)
  }

  const handleCreate = () => {
    onCreate({
      firstName,
      lastName,
      email: email || undefined,
    })
    onClose()
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Client
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={handleCreate}
        okButtonProps={{
          disabled: !firstName?.length || !lastName?.length,
        }}
        title="Create New Client"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}

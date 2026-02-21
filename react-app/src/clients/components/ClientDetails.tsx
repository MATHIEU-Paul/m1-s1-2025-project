import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Button, Card, Input, List, Skeleton, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { isLoading, client, purchases, loadClient, updateClient } = useClientDetailsProvider(id)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    loadClient()
  }, [id])

  useEffect(() => {
    if (client) {
      setFirstName(client.firstName)
      setLastName(client.lastName)
      setEmail(client.email || '')
    }
  }, [client])

  useEffect(() => {
    if (client) {
      setHasChanges(
        firstName !== client.firstName ||
        lastName !== client.lastName ||
        email !== (client.email || '')
      )
    }
  }, [firstName, lastName, email, client])

  const handleSave = () => {
    updateClient({
      firstName,
      lastName,
      email: email || undefined,
    })
    setHasChanges(false)
  }

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%', padding: '1rem' }}>
      <Link to="/clients">
        <ArrowLeftOutlined /> Back to Clients
      </Link>
      
      <Card title="Client Information" style={{ marginTop: '1rem' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label style={{ fontWeight: 'bold' }}>First Name:</label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 'bold' }}>Last Name:</label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 'bold' }}>Email:</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Optional"
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          {hasChanges && (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              style={{ marginTop: '1rem' }}
            >
              Save Changes
            </Button>
          )}
        </Space>
      </Card>

      <Card 
        title={`Purchased Books (${purchases.length})`}
        style={{ marginTop: '1rem' }}
      >
        {purchases.length === 0 ? (
          <Typography.Text type="secondary">
            No books purchased yet
          </Typography.Text>
        ) : (
            <List></List> // Placeholder for future implementation of purchase list
        )}
      </Card>
    </Space>
  )
}

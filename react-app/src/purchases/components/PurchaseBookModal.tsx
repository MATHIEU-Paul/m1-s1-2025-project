import { Button, DatePicker, Modal, Select, Space, message } from 'antd'
import type { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useClientProvider } from '../../clients/providers/useClientProvider'
import { usePurchaseProvider } from '../providers/usePurchaseProvider'

interface PurchaseBookModalProps {
  bookId: string
}

export function PurchaseBookModal({ bookId }: PurchaseBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [clientId, setClientId] = useState<string | undefined>(undefined)
  const [purchaseDate, setPurchaseDate] = useState<Dayjs | null>(null)
  const { clients, loadClients } = useClientProvider()
  const { createPurchase } = usePurchaseProvider()

  useEffect(() => {
    if (isOpen) {
      loadClients()
    }
  }, [isOpen, loadClients])

  const onClose = () => {
    setClientId(undefined)
    setPurchaseDate(null)
    setIsOpen(false)
  }

  const onSubmit = async () => {
    if (!clientId || !purchaseDate) {
      return
    }

    try {
      await createPurchase({
        clientId,
        bookId,
        purchaseDate: purchaseDate.toISOString(),
      })
      message.success('Purchase saved successfully!')
      onClose()
    } catch (error) {
      console.error('Purchase failed:', error)
      message.error('Purchase failed')
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Buy Book
      </Button>
      <Modal
        title="Purchase Book"
        open={isOpen}
        onCancel={onClose}
        onOk={onSubmit}
        okText="Save Purchase"
        cancelText="Cancel"
        okButtonProps={{
          disabled: !clientId || !purchaseDate,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="Select a client"
            options={clients.map(client => ({
              label: `${client.firstName} ${client.lastName}`,
              value: client.id,
            }))}
            onChange={value => setClientId(value)}
            value={clientId}
          />
          <DatePicker
            style={{ width: '100%' }}
            onChange={date => setPurchaseDate(date)}
            value={purchaseDate}
          />
        </Space>
      </Modal>
    </>
  )
}

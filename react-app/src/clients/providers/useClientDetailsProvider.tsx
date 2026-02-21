import { useState } from 'react'
import type { ClientModel, ClientPurchase } from '../ClientModel'

export const useClientDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<ClientModel | null>(null)
  const [purchases, setPurchases] = useState<ClientPurchase[]>([])

  const loadClient = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/clients/${id}`)
      .then(response => response.json())
      .then(data => {
        setClient(data)
        // TODO: fetch purchases for this client and setPurchases(data)
        setPurchases([])
      })
      .finally(() => setIsLoading(false))
  }

  const updateClient = (updates: Partial<ClientModel>) => {
    if (!client) return

    fetch(`http://localhost:3000/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
      .then(response => response.json())
      .then(data => setClient(data))
      .catch(err => console.error(err))
  }

  return { isLoading, client, purchases, loadClient, updateClient }
}

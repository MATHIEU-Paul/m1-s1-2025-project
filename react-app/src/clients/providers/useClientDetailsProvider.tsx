import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { ClientModel, ClientPurchase, ClientWithPurchasesModel } from '../ClientModel'

export const useClientDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<ClientModel | null>(null)
  const [purchases, setPurchases] = useState<ClientPurchase[]>([])

  const loadClient = () => {
    setIsLoading(true)
    fetch(`${API_BASE_URL}/clients/${id}`)
      .then(response => response.json())
      .then((data: ClientWithPurchasesModel) => {
        setClient(data)
        setPurchases(data.purchases || [])
      })
      .catch(err => {
        console.error(err)
        setClient(null)
        setPurchases([])
      })
      .finally(() => setIsLoading(false))
  }

  const updateClient = (updates: Partial<ClientModel>) => {
    if (!client) return

    fetch(`${API_BASE_URL}/clients/${id}`, {
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

import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { ClientWithPurchaseCountModel, CreateClientModel, UpdateClientModel } from '../ClientModel'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientWithPurchaseCountModel[]>([])

  const loadClients = () => {
    axios
      .get(`${API_BASE_URL}/clients`)
      .then(data => {
        setClients(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createClient = (client: CreateClientModel) => {
    axios
      .post(`${API_BASE_URL}/clients`, client)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const updateClient = (id: string, input: UpdateClientModel) => {
    axios
      .put(`${API_BASE_URL}/clients/${id}`, input)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const deleteClient = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/clients/${id}`)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  return { clients, loadClients, createClient, updateClient, deleteClient }
}

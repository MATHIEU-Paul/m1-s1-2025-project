import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { CreatePurchaseModel, PurchaseModel } from '../PurchaseModel'

export const usePurchaseProvider = () => {
  const [purchases, setPurchases] = useState<PurchaseModel[]>([])

  const loadPurchases = () => {
    axios
      .get(`${API_BASE_URL}/purchases`)
      .then(data => {
        setPurchases(data.data)
      })
      .catch(err => console.error(err))
  }

  const createPurchase = (purchase: CreatePurchaseModel) => {
    return axios.post(`${API_BASE_URL}/purchases`, purchase)
  }

  return { purchases, loadPurchases, createPurchase }
}

import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import type { CreatePurchaseModel } from '../PurchaseModel'

export const usePurchaseProvider = () => {
  const createPurchase = (purchase: CreatePurchaseModel) => {
    return axios.post(`${API_BASE_URL}/purchases`, purchase)
  }

  return { createPurchase }
}

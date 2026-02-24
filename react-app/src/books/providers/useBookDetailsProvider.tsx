import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { BookWithPurchasesModel, UpdateBookModel } from '../BookModel'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookWithPurchasesModel | null>(null)

  const loadBook = () => {
    setIsLoading(true)
    fetch(`${API_BASE_URL}/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .finally(() => setIsLoading(false))
  }

  
  const updateBook = async (updatedData: UpdateBookModel) => {
  const response = await axios.patch(`${API_BASE_URL}/books/${id}`, updatedData);
  setBook(response.data); // Refresh local state with new data
};

  return { isLoading, book, loadBook, updateBook }
}

import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import axios from 'axios'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookModel | null>(null)

  const loadBook = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .finally(() => setIsLoading(false))
  }

  
  const updateBook = async (updatedData: UpdateBookModel) => {
  const response = await axios.patch(`http://localhost:3000/books/${id}`, updatedData);
  setBook(response.data); // Refresh local state with new data
};

  return { isLoading, book, loadBook, updateBook }
}

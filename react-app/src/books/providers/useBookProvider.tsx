import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { BookWithPurchaseCountModel, CreateBookModel, UpdateBookModel } from '../BookModel'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookWithPurchaseCountModel[]>([])

  const loadBooks = () => {
    axios
      .get(`${API_BASE_URL}/books`)
      .then(data => {
        setBooks(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateBookModel) => {
    axios
      .post(`${API_BASE_URL}/books`, book)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    axios
      .patch(`${API_BASE_URL}/books/${id}`, input)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/books/${id}`)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  return { books, loadBooks, createBook, updateBook, deleteBook }
}

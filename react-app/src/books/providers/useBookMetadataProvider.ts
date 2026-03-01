import axios from 'axios'
import { useCallback, useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { BookMetadataModel } from '../BookModel'

export const useBookMetadataProvider = () => {
  const [bookTypes, setBookTypes] = useState<BookMetadataModel[]>([])
  const [genres, setGenres] = useState<BookMetadataModel[]>([])

  const loadBookTypes = useCallback(() => {
    axios
      .get(`${API_BASE_URL}/books/types`)
      .then(data => {
        setBookTypes(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  const loadGenres = useCallback(() => {
    axios
      .get(`${API_BASE_URL}/books/genres`)
      .then(data => {
        setGenres(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return { bookTypes, genres, loadBookTypes, loadGenres }
}

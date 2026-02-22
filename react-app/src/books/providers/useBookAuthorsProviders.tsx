import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { BookModel } from '../BookModel'

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<BookModel['author'][]>([])

  const loadAuthors = () => {
    axios
      .get(`${API_BASE_URL}/authors`)
      .then(data => {
        setAuthors(data.data)
      })
      .catch(err => console.error(err))
  }

  return { authors, loadAuthors }
}

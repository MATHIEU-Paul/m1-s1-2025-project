import axios from 'axios'
import { useCallback, useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type {
  AuthorWithBookCountModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from '../AuthorModel'

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorWithBookCountModel[]>([])

  const loadAuthors = useCallback(() => {
    axios
      .get(`${API_BASE_URL}/authors`)
      .then(response => {
        setAuthors(response.data)
      })
      .catch(err => console.error(err))
  }, [])

  const createAuthor = useCallback(
    (author: CreateAuthorModel) => {
      axios
        .post(`${API_BASE_URL}/authors`, author)
        .then(() => loadAuthors())
        .catch(err => console.error(err))
    },
    [loadAuthors],
  )

  const updateAuthor = useCallback(
    (id: string, input: UpdateAuthorModel) => {
      axios
        .patch(`${API_BASE_URL}/authors/${id}`, input)
        .then(() => loadAuthors())
        .catch(err => console.error(err))
    },
    [loadAuthors],
  )

  const deleteAuthor = useCallback(
    (id: string) => {
      axios
        .delete(`${API_BASE_URL}/authors/${id}`)
        .then(() => loadAuthors())
        .catch(err => console.error(err))
    },
    [loadAuthors],
  )

  return { authors, loadAuthors, createAuthor, updateAuthor, deleteAuthor }
}

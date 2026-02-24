import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { AuthorWithBookCountModel, CreateAuthorModel, UpdateAuthorModel } from '../AuthorModel'

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorWithBookCountModel[]>([])

  const loadAuthors = () => {
    axios
      .get(`${API_BASE_URL}/authors`)
      .then(response => {
        setAuthors(response.data) // Le backend renvoie directement le tableau ici
      })
      .catch(err => console.error(err))
  }

  const createAuthor = (author: CreateAuthorModel) => {
    axios
      .post(`${API_BASE_URL}/authors`, author)
      .then(() => loadAuthors())
      .catch(err => console.error(err))
  }

  const updateAuthor = (id: string, input: UpdateAuthorModel) => {
    axios
      .patch(`${API_BASE_URL}/authors/${id}`, input)
      .then(() => loadAuthors())
      .catch(err => console.error(err))
  }

  const deleteAuthor = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/authors/${id}`)
      .then(() => loadAuthors())
      .catch(err => console.error(err))
  }

  return { authors, loadAuthors, createAuthor, updateAuthor, deleteAuthor }
}
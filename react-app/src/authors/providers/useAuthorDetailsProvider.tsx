import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { AuthorDetailsModel, UpdateAuthorModel } from '../AuthorModel'

export const useAuthorDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [author, setAuthor] = useState<AuthorDetailsModel | null>(null)

  const loadAuthor = () => {
    setIsLoading(true)
    fetch(`${API_BASE_URL}/authors/${id}`)
      .then(response => response.json())
      .then(data => setAuthor(data))
      .finally(() => setIsLoading(false))
  }

  const updateAuthor = async (updatedData: UpdateAuthorModel) => {
    const response = await axios.patch(
      `${API_BASE_URL}/authors/${id}`,
      updatedData,
    )
    setAuthor(response.data)
  }

  return { isLoading, author, loadAuthor, updateAuthor }
}

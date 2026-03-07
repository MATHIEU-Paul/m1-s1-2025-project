import axios from 'axios'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/api'
import { AuthContext, type AuthUser } from './auth-context'

const AUTH_TOKEN_KEY = 'auth_token'

type AuthResponse = {
  token: string
  user: AuthUser
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const saveToken = useCallback((token: string | null) => {
    if (!token) {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      delete axios.defaults.headers.common.Authorization
      return
    }

    localStorage.setItem(AUTH_TOKEN_KEY, token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }, [])

  const applySession = useCallback(
    (response: AuthResponse) => {
      saveToken(response.token)
      setUser(response.user)
    },
    [saveToken],
  )

  const clearSession = useCallback(() => {
    saveToken(null)
    setUser(null)
  }, [saveToken])

  const login = useCallback(
    async (username: string, password: string) => {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/login`,
        {
          username,
          password,
        },
      )

      applySession(response.data)
    },
    [applySession],
  )

  const register = useCallback(
    async (username: string, password: string) => {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/register`,
        {
          username,
          password,
        },
      )

      applySession(response.data)
    },
    [applySession],
  )

  const logout = useCallback(async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`)
    } catch {
      // Ignore backend errors while clearing local session.
    }

    clearSession()
  }, [clearSession])

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) {
      setIsLoading(false)
      return
    }

    saveToken(token)
    axios
      .get<AuthUser>(`${API_BASE_URL}/auth/me`)
      .then(response => {
        setUser(response.data)
      })
      .catch(() => {
        clearSession()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [clearSession, saveToken])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

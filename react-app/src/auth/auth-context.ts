import { createContext } from 'react'

export type AuthUser = {
  id: string
  username: string
  createdAt: string
}

export type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

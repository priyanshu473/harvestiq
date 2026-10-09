import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getToken, setToken, loginUser, registerUser, fetchCurrentUser, onUnauthorized } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, name, email }
  const [initializing, setInitializing] = useState(true)

  // On first load, if a token is already stored, confirm it's still valid
  // and load the profile it belongs to.
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setInitializing(false)
      return
    }
    fetchCurrentUser()
      .then((data) => setUser({ id: data.id, name: data.name, email: data.email }))
      .catch(() => setToken(null))
      .finally(() => setInitializing(false))
  }, [])

  // If any API call comes back 401, the token is no longer valid — clear
  // everything so the UI drops back to a logged-out state.
  useEffect(() => {
    return onUnauthorized(() => {
      setToken(null)
      setUser(null)
    })
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await loginUser({ email, password })
    setToken(data.token)
    setUser({ id: data.userId, name: data.name, email: data.email })
    return data
  }, [])

  const register = useCallback(async (name, email, phone, password) => {
    const data = await registerUser({ name, email, phone, password })
    setToken(data.token)
    setUser({ id: data.userId, name: data.name, email: data.email })
    return data
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, initializing, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { apiFetch, apiJson, clearTokens, getAccessToken, loadTokensFromStorage, saveTokens } from "@/lib/api"

export type AuthUser = {
  id: string
  username: string
  fullName: string
  email: string
  role: string
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [loading, setLoading] = React.useState(true)

  const refreshUser = React.useCallback(async () => {
    loadTokensFromStorage()
    if (!getAccessToken()) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const res = await apiJson<{ success: boolean; user: AuthUser }>("/api/auth/me")
      setUser(res.user)
    } catch {
      setUser(null)
      clearTokens()
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  async function login(username: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.message || "Kirish muvaffaqiyatsiz")
    saveTokens(data.accessToken, data.refreshToken)
    setUser(data.user)
  }

  async function logout() {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
        body: refreshToken ? JSON.stringify({ refreshToken }) : undefined,
      })
    } catch {
      /* ignore */
    }
    clearTokens()
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth AuthProvider ichida bo‘lishi kerak")
  return ctx
}

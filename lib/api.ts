const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

let memoryAccess: string | null = null
let memoryRefresh: string | null = null

export function getApiBase() {
  return API
}

export function loadTokensFromStorage() {
  if (typeof window === "undefined") return
  memoryAccess = localStorage.getItem("accessToken")
  memoryRefresh = localStorage.getItem("refreshToken")
}

export function getAccessToken() {
  if (typeof window === "undefined") return null
  return memoryAccess ?? localStorage.getItem("accessToken")
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null
  return memoryRefresh ?? localStorage.getItem("refreshToken")
}

export function saveTokens(access: string, refresh: string) {
  memoryAccess = access
  memoryRefresh = refresh
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", access)
    localStorage.setItem("refreshToken", refresh)
  }
}

export function clearTokens() {
  memoryAccess = null
  memoryRefresh = null
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
}

let refreshPromise: Promise<boolean> | null = null

async function doRefresh(): Promise<boolean> {
  const rt = getRefreshToken()
  if (!rt) return false
  try {
    const res = await fetch(`${API}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: rt }),
    })
    if (!res.ok) return false
    const data = (await res.json()) as {
      accessToken: string
      refreshToken: string
    }
    saveTokens(data.accessToken, data.refreshToken)
    return true
  } catch {
    return false
  }
}

async function refreshAccess(): Promise<boolean> {
  if (refreshPromise) return refreshPromise
  refreshPromise = doRefresh().finally(() => {
    refreshPromise = null
  })
  return refreshPromise
}

export type ApiErrorBody = { success?: boolean; message?: string; details?: unknown }

export async function apiFetch(path: string, init: RequestInit = {}, retry = true): Promise<Response> {
  loadTokensFromStorage()
  const headers = new Headers(init.headers)
  const hasBody = init.body !== undefined && init.body !== null
  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }
  const token = getAccessToken()
  if (token) headers.set("Authorization", `Bearer ${token}`)

  let res = await fetch(`${API}${path}`, { ...init, headers })

  if (res.status === 401 && retry && path !== "/api/auth/refresh" && path !== "/api/auth/login") {
    const ok = await refreshAccess()
    if (ok) {
      headers.set("Authorization", `Bearer ${getAccessToken()}`)
      res = await fetch(`${API}${path}`, { ...init, headers })
    }
  }

  return res
}

export async function apiJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await apiFetch(path, init)
  const text = await res.text()
  const data = text ? (JSON.parse(text) as T & ApiErrorBody) : ({} as T)
  if (!res.ok) {
    const err = data as ApiErrorBody
    throw new Error(err.message || `So‘rov xatosi (${res.status})`)
  }
  return data as T
}

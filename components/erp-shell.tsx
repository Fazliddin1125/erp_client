"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AuthProvider, useAuth } from "@/context/auth-context"
import { getAccessToken, loadTokensFromStorage } from "@/lib/api"

function ErpGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { loading, user } = useAuth()

  React.useEffect(() => {
    loadTokensFromStorage()
    if (loading) return
    if (!user && !getAccessToken()) {
      router.replace("/login")
    }
  }, [loading, user, router, pathname])

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-muted-foreground">Yuklanmoqda...</p>
      </div>
    )
  }

  if (!user && !getAccessToken()) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export function ErpShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ErpGate>{children}</ErpGate>
    </AuthProvider>
  )
}

"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiJson } from "@/lib/api"
import { toast } from "sonner"

type Stats = {
  orders: { total: number; completed: number; inProgress: number; pending: number }
  production: { total: number; completed: number; inProgress: number; pending: number }
  inventory: { totalMaterials: number; low: number; critical: number; totalQuantity: number }
  workers: { total: number; active: number; avgHours: number; byDepartment: { department: string; count: number }[] }
}

export default function StatisticsPage() {
  const [data, setData] = React.useState<Stats | null>(null)
  const [month, setMonth] = React.useState("")
  const [from, setFrom] = React.useState("")
  const [to, setTo] = React.useState("")

  const load = React.useCallback(async () => {
      try {
        const qs = new URLSearchParams()
        if (month) qs.set("month", month)
        if (from) qs.set("from", from)
        if (to) qs.set("to", to)
        const url = `/api/statistics/summary${qs.toString() ? `?${qs.toString()}` : ""}`
        const res = await apiJson<{ data: Stats }>(url)
        setData(res.data)
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Xato")
      }
    }, [month, from, to])

  React.useEffect(() => {
    void load()
  }, [load])

  const o = data?.orders
  const p = data?.production
  const inv = data?.inventory
  const w = data?.workers

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Statistika</h2>
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <div className="grid gap-1">
          <label className="text-xs text-muted-foreground">Oy bo‘yicha</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-muted-foreground">Dan</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-muted-foreground">Gacha</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-9 rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={() => { setMonth(""); setFrom(""); setTo("") }}
          className="h-9 rounded-md border px-3 text-sm"
        >
          Tozalash
        </button>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Buyurtmalar</TabsTrigger>
          <TabsTrigger value="production">Ishlab chiqarish</TabsTrigger>
          <TabsTrigger value="inventory">Inventarizatsiya</TabsTrigger>
          <TabsTrigger value="workers">Xodimlar</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Jami buyurtmalar" value={o?.total} />
            <StatCard title="Yakunlangan" value={o?.completed} />
            <StatCard title="Jarayonda" value={o?.inProgress} />
            <StatCard title="Kutilmoqda" value={o?.pending} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Holatlar</CardTitle>
              <CardDescription>API dan real vaqt ma&apos;lumot</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-auto">{JSON.stringify(o, null, 2)}</pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Jami jarayonlar" value={p?.total} />
            <StatCard title="Yakunlangan" value={p?.completed} />
            <StatCard title="Jarayonda" value={p?.inProgress} />
            <StatCard title="Boshlanmagan" value={p?.pending} />
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Pozitsiyalar" value={inv?.totalMaterials} />
            <StatCard title="Kam qolgan" value={inv?.low} />
            <StatCard title="Kritik" value={inv?.critical} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Jami miqdor (yig‘indi)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inv?.totalQuantity ?? "—"}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workers" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Jami xodimlar" value={w?.total} />
            <StatCard title="Faol" value={w?.active} />
            <StatCard title="O‘rtacha soat" value={w?.avgHours} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Bo&apos;limlar bo&apos;yicha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(w?.byDepartment ?? []).map((d) => (
                <div key={d.department} className="flex justify-between text-sm">
                  <span>{d.department}</span>
                  <span className="font-medium">{d.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value?: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value ?? "—"}</div>
      </CardContent>
    </Card>
  )
}

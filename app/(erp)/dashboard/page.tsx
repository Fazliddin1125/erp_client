"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Factory, Package, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table"
import { getOrderColumns, type Order } from "@/components/columns/order-columns"
import { apiJson } from "@/lib/api"

type Summary = {
  counts: {
    orders: number
    production: number
    inventoryMaterials: number
    workers: number
    completedOrders: number
    completedProduction: number
  }
  orderStatus: Record<string, number>
  productionStatus: Record<string, number>
  recentOrders: Order[]
  news: Array<{ title: string; body: string; badge: string; variant?: string }>
}

const dashboardOrderColumns = getOrderColumns()

export default function DashboardPage() {
  const [data, setData] = React.useState<Summary | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [month, setMonth] = React.useState("")
  const [from, setFrom] = React.useState("")
  const [to, setTo] = React.useState("")

  const load = React.useCallback(async () => {
    try {
      const qs = new URLSearchParams()
      if (month) qs.set("month", month)
      if (from) qs.set("from", from)
      if (to) qs.set("to", to)
      const url = `/api/dashboard/summary${qs.toString() ? `?${qs.toString()}` : ""}`
      const res = await apiJson<{ success: boolean; data: Summary }>(url)
      setData(res.data)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato")
    }
  }, [month, from, to])

  React.useEffect(() => {
    void load()
  }, [load])

  const orders = data?.recentOrders ?? []
  const p = data?.productionStatus
  const pTotal = p ? (p["not-started"] || 0) + (p["in-progress"] || 0) + (p.completed || 0) : 0
  const pct = (n: number) => (pTotal > 0 ? Math.round((n / pTotal) * 100) : 33)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Boshqaruv paneli</h2>
        <Button asChild>
          <Link href="/orders">Yangi buyurtma</Link>
        </Button>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

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
        <Button variant="outline" onClick={() => { setMonth(""); setFrom(""); setTo("") }}>
          Tozalash
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buyurtmalar</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.counts.orders ?? "—"}</div>
            <p className="text-xs text-muted-foreground">
              Jami / Tugallangan: {data?.counts.orders ?? 0} / {data?.counts.completedOrders ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ishlab chiqarish</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.counts.production ?? "—"}</div>
            <p className="text-xs text-muted-foreground">
              Jami / Tugallangan: {data?.counts.production ?? 0} / {data?.counts.completedProduction ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventarizatsiya</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.counts.inventoryMaterials ?? "—"}</div>
            <p className="text-xs text-muted-foreground">Material pozitsiyalari</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Xodimlar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.counts.workers ?? "—"}</div>
            <p className="text-xs text-muted-foreground">Ro‘yxatdan o‘tgan xodimlar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Yangiliklar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(data?.news?.length ? data.news : [{ title: "Ma'lumot yo‘q", body: "API dan yangiliklar kutilmoqda", badge: "—" }]).map(
                (n, i) => (
                  <div key={i} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{n.title}</h4>
                      <Badge variant={n.variant === "destructive" ? "destructive" : "default"}>{n.badge}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{n.body}</p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Ishlab chiqarish holati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Boshlanmagan</span>
                    <span className="text-sm font-medium">{p?.["not-started"] ?? 0}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${pct(p?.["not-started"] || 0)}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Jarayonda</span>
                    <span className="text-sm font-medium">{p?.["in-progress"] ?? 0}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${pct(p?.["in-progress"] || 0)}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Yakunlangan</span>
                    <span className="text-sm font-medium">{p?.completed ?? 0}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${pct(p?.completed || 0)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">Barcha buyurtmalar</TabsTrigger>
              <TabsTrigger value="pending">Kutilmoqda</TabsTrigger>
              <TabsTrigger value="in-progress">Jarayonda</TabsTrigger>
              <TabsTrigger value="completed">Yakunlangan</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="space-y-4">
            <DataTable columns={dashboardOrderColumns} data={orders} />
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            <DataTable columns={dashboardOrderColumns} data={orders.filter((o) => o.status === "pending")} />
          </TabsContent>
          <TabsContent value="in-progress" className="space-y-4">
            <DataTable columns={dashboardOrderColumns} data={orders.filter((o) => o.status === "in-progress")} />
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <DataTable columns={dashboardOrderColumns} data={orders.filter((o) => o.status === "completed")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

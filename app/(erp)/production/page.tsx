"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { apiJson } from "@/lib/api"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ProductionRow = {
  id: string
  orderId: string
  customer: string
  status: "not-started" | "in-progress" | "completed"
  progress: number
  startDate: string
  endDate: string
}

export default function ProductionPage() {
  const [rows, setRows] = React.useState<ProductionRow[]>([])
  const [ordersPick, setOrdersPick] = React.useState<{ id: string; customer: string }[]>([])
  const [open, setOpen] = React.useState(false)
  const [orderId, setOrderId] = React.useState("")

  const load = React.useCallback(async () => {
    try {
      const res = await apiJson<{ data: ProductionRow[] }>("/api/productions")
      setRows(res.data)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }, [])

  const loadOrders = React.useCallback(async () => {
    try {
      const res = await apiJson<{ data: { id: string; customer: string }[] }>("/api/orders")
      setOrdersPick(res.data.map((o) => ({ id: o.id, customer: o.customer })))
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  React.useEffect(() => {
    if (open) void loadOrders()
  }, [open, loadOrders])

  async function createFromOrder() {
    if (!orderId) return
    try {
      await apiJson("/api/productions", {
        method: "POST",
        body: JSON.stringify({ orderId }),
      })
      toast.success("Ishlab chiqarish yozuvi yaratildi")
      setOpen(false)
      setOrderId("")
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  async function start(id: string) {
    try {
      await apiJson(`/api/productions/${id}/start`, { method: "PATCH", body: JSON.stringify({ progress: 25 }) })
      toast.success("Jarayon boshlandi")
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  async function complete(id: string) {
    try {
      await apiJson(`/api/productions/${id}/complete`, { method: "PATCH", body: JSON.stringify({}) })
      toast.success("Yakunlandi")
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  const filter = (s: ProductionRow["status"] | "all") =>
    s === "all" ? rows : rows.filter((r) => r.status === s)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Ishlab chiqarish</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Buyurtmadan jarayon
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Barcha</TabsTrigger>
          <TabsTrigger value="not-started">Boshlanmagan</TabsTrigger>
          <TabsTrigger value="in-progress">Jarayonda</TabsTrigger>
          <TabsTrigger value="completed">Yakunlangan</TabsTrigger>
        </TabsList>

        {(["all", "not-started", "in-progress", "completed"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filter(tab).map((p) => (
                <ProductionCard
                  key={p.id}
                  row={p}
                  onStart={() => void start(p.id)}
                  onComplete={() => void complete(p.id)}
                  onReload={() => void load()}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyurtma tanlang</DialogTitle>
            <DialogDescription>Mavjud buyurtma uchun ishlab chiqarish kartochkasi (agar yo‘q bo‘lsa yaratiladi).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label>Buyurtma ID</Label>
            <Input placeholder="Mongo ObjectId yoki ro‘yxatdan tanlang" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            <div className="text-xs text-muted-foreground max-h-32 overflow-auto">
              {ordersPick.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className="block w-full text-left py-1 hover:underline"
                  onClick={() => setOrderId(o.id)}
                >
                  {o.customer} — {o.id.slice(-6)}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Bekor
            </Button>
            <Button onClick={() => void createFromOrder()}>Yaratish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProductionCard({
  row,
  onStart,
  onComplete,
  onReload,
}: {
  row: ProductionRow
  onStart: () => void
  onComplete: () => void
  onReload: () => void
}) {
  const { id, orderId, customer, status, progress, startDate, endDate } = row
  const [progressVal, setProgressVal] = React.useState(String(progress))

  React.useEffect(() => {
    setProgressVal(String(progress))
  }, [progress])

  async function saveProgress() {
    try {
      await apiJson(`/api/productions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ progress: Number(progressVal) }),
      })
      toast.success("Jarayon foizi yangilandi")
      onReload()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">#{id.slice(-6)}</CardTitle>
          <Badge variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}>
            {status === "not-started" && "Boshlanmagan"}
            {status === "in-progress" && "Jarayonda"}
            {status === "completed" && "Yakunlangan"}
          </Badge>
        </div>
        <CardDescription>
          Buyurtma: #{orderId.slice(-6)} — {customer}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Boshlangan:</span>
            <span>{startDate || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tugash:</span>
            <span>{endDate || "—"}</span>
          </div>
          <div className="mt-2">
            <div className="flex justify-between mb-1 text-sm">
              <span>Jarayon</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${status === "completed" ? "bg-green-500" : "bg-blue-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {status === "in-progress" && (
            <div className="flex gap-2 items-end pt-2">
              <div className="flex-1 grid gap-1">
                <Label className="text-xs">Foizni yangilash (0–100)</Label>
                <Input type="number" min={0} max={100} value={progressVal} onChange={(e) => setProgressVal(e.target.value)} />
              </div>
              <Button type="button" size="sm" variant="secondary" onClick={() => void saveProgress()}>
                Saqlash
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/orders">Buyurtmalar</Link>
        </Button>
        {status === "not-started" && (
          <Button size="sm" onClick={onStart}>
            Boshlash
          </Button>
        )}
        {status === "in-progress" && (
          <Button size="sm" onClick={onComplete}>
            Yakunlash
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getOrderColumns, type Order } from "@/components/columns/order-columns"
import { PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiJson } from "@/lib/api"
import { toast } from "sonner"

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [newOrder, setNewOrder] = React.useState({
    customer: "",
    productType: "",
    items: "",
    unit: "dona" as Order["unit"],
    total: "",
  })

  const [viewOrder, setViewOrder] = React.useState<Order | null>(null)
  const [editOrder, setEditOrder] = React.useState<Order | null>(null)
  const [editForm, setEditForm] = React.useState({
    customer: "",
    productType: "",
    items: "",
    unit: "dona" as Order["unit"],
    total: "",
    status: "" as Order["status"] | "",
  })
  const [deleteOrder, setDeleteOrder] = React.useState<Order | null>(null)

  const load = React.useCallback(async () => {
    try {
      const res = await apiJson<{ data: Order[] }>("/api/orders")
      setOrders(res.data)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  const openEdit = React.useCallback((o: Order) => {
    setEditOrder(o)
    setEditForm({
      customer: o.customer,
      productType: o.productType,
      items: String(o.items),
      unit: o.unit || "dona",
      total: String(o.total),
      status: o.status,
    })
  }, [])

  const handleStartProduction = React.useCallback(
    async (o: Order) => {
      try {
        await apiJson(`/api/orders/${o.id}/start-production`, { method: "POST", body: JSON.stringify({}) })
        toast.success("Ishlab chiqarishga o‘tkazildi")
        await load()
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Xato")
      }
    },
    [load]
  )

  const handleDelete = React.useCallback(async () => {
    if (!deleteOrder) return
    try {
      await apiJson(`/api/orders/${deleteOrder.id}`, { method: "DELETE" })
      toast.success("Buyurtma o‘chirildi")
      setDeleteOrder(null)
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }, [deleteOrder, load])

  const saveEdit = React.useCallback(async () => {
    if (!editOrder) return
    try {
      await apiJson(`/api/orders/${editOrder.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          customer: editForm.customer,
          productType: editForm.productType,
          items: Number(editForm.items),
          unit: editForm.unit,
          total: Number(editForm.total),
          status: editForm.status || undefined,
        }),
      })
      toast.success("Saqlangan")
      setEditOrder(null)
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }, [editOrder, editForm, load])

  const columns = React.useMemo(
    () =>
      getOrderColumns({
        onView: (o) => setViewOrder(o),
        onEdit: (o) => openEdit(o),
        onStartProduction: (o) => void handleStartProduction(o),
        onDelete: (o) => setDeleteOrder(o),
      }),
    [openEdit, handleStartProduction]
  )

  async function handleCreate() {
    try {
      await apiJson("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          customer: newOrder.customer,
          productType: newOrder.productType || "Boshqa",
          items: Number(newOrder.items) || 0,
          unit: newOrder.unit,
          total: Number(newOrder.total) || 0,
        }),
      })
      toast.success("Buyurtma qo‘shildi")
      setIsModalOpen(false)
      setNewOrder({ customer: "", productType: "", items: "", unit: "dona", total: "" })
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  const productTypes = [
    "Elektron jihozlar",
    "Qurilish materiallari",
    "Mebel mahsulotlari",
    "Elektr jihozlari",
    "Boshqa",
  ]
  const orderUnits: Order["unit"][] = ["dona", "kg", "litr", "metr", "m2"]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Buyurtmalar</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Yangi buyurtma
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Barcha buyurtmalar</TabsTrigger>
          <TabsTrigger value="pending">Kutilmoqda</TabsTrigger>
          <TabsTrigger value="in-progress">Jarayonda</TabsTrigger>
          <TabsTrigger value="completed">Yakunlangan</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          <DataTable columns={columns} data={orders} searchKey="customer" />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4 mt-4">
          <DataTable columns={columns} data={orders.filter((o) => o.status === "pending")} searchKey="customer" />
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4 mt-4">
          <DataTable columns={columns} data={orders.filter((o) => o.status === "in-progress")} searchKey="customer" />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          <DataTable columns={columns} data={orders.filter((o) => o.status === "completed")} searchKey="customer" />
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Yangi buyurtma</DialogTitle>
            <DialogDescription>Mijoz buyurtmasini yaratish.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Mijoz</Label>
              <Input value={newOrder.customer} onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Mahsulot turi</Label>
              <Select onValueChange={(v) => setNewOrder({ ...newOrder, productType: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label>Soni</Label>
                <Input
                  type="number"
                  min={0}
                  step="any"
                  value={newOrder.items}
                  onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>O&apos;lchov turi</Label>
                <Select value={newOrder.unit} onValueChange={(v) => setNewOrder({ ...newOrder, unit: v as Order["unit"] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orderUnits.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Summa</Label>
              <Input
                type="number"
                min={0}
                step="any"
                value={newOrder.total}
                onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Bekor
            </Button>
            <Button onClick={() => void handleCreate()}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewOrder} onOpenChange={(o) => !o && setViewOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buyurtma</DialogTitle>
          </DialogHeader>
          {viewOrder ? (
            <div className="grid gap-2 text-sm">
              <p>
                <span className="text-muted-foreground">ID:</span> {viewOrder.id}
              </p>
              <p>
                <span className="text-muted-foreground">Mijoz:</span> {viewOrder.customer}
              </p>
              <p>
                <span className="text-muted-foreground">Tur:</span> {viewOrder.productType}
              </p>
              <p>
                <span className="text-muted-foreground">Miqdor:</span> {viewOrder.items} {viewOrder.unit || "dona"}
              </p>
              <p>
                <span className="text-muted-foreground">Summa:</span> {viewOrder.total.toLocaleString()} so&apos;m
              </p>
              <p>
                <span className="text-muted-foreground">Holat:</span> {viewOrder.status}
              </p>
              <p>
                <span className="text-muted-foreground">Sana:</span> {viewOrder.date}
              </p>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOrder(null)}>
              Yopish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editOrder} onOpenChange={(o) => !o && setEditOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tahrirlash</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <Label>Mijoz</Label>
            <Input value={editForm.customer} onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })} />
            <Label>Mahsulot turi</Label>
            <Select value={editForm.productType} onValueChange={(v) => setEditForm({ ...editForm, productType: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Soni</Label>
                <Input
                  type="number"
                  min={0}
                  step="any"
                  value={editForm.items}
                  onChange={(e) => setEditForm({ ...editForm, items: e.target.value })}
                />
              </div>
              <div>
                <Label>O&apos;lchov turi</Label>
                <Select value={editForm.unit} onValueChange={(v) => setEditForm({ ...editForm, unit: v as Order["unit"] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orderUnits.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Label>Summa</Label>
            <Input
              type="number"
              min={0}
              step="any"
              value={editForm.total}
              onChange={(e) => setEditForm({ ...editForm, total: e.target.value })}
            />
            <Label>Holat</Label>
            <Select
              value={editForm.status}
              onValueChange={(v) => setEditForm({ ...editForm, status: v as Order["status"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Kutilmoqda</SelectItem>
                <SelectItem value="in-progress">Jarayonda</SelectItem>
                <SelectItem value="completed">Yakunlangan</SelectItem>
                <SelectItem value="cancelled">Bekor qilingan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOrder(null)}>
              Bekor
            </Button>
            <Button onClick={() => void saveEdit()}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteOrder} onOpenChange={(o) => !o && setDeleteOrder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Buyurtmani o&apos;chirish?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteOrder?.customer} — bu amalni qaytarib bo&apos;lmaydi. Bog&apos;liq ishlab chiqarish yozuvi ham o&apos;chadi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={() => void handleDelete()}>
              O&apos;chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

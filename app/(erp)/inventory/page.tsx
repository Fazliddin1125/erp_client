"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getMaterialColumns, type InventoryRow } from "@/components/columns/material-columns"
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

export default function InventoryPage() {
  const [items, setItems] = React.useState<InventoryRow[]>([])
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editRow, setEditRow] = React.useState<InventoryRow | null>(null)
  const [deleteRow, setDeleteRow] = React.useState<InventoryRow | null>(null)

  const [form, setForm] = React.useState({
    name: "",
    category: "",
    quantity: "",
    unit: "dona",
    price: "",
    minQuantity: "",
  })

  const load = React.useCallback(async () => {
    try {
      const res = await apiJson<{ data: InventoryRow[] }>("/api/materials")
      setItems(res.data)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  const openEdit = React.useCallback((row: InventoryRow) => {
    setEditRow(row)
    setForm({
      name: row.name,
      category: row.category,
      quantity: String(row.quantity),
      unit: row.unit,
      price: String(row.price),
      minQuantity: String(row.minQuantity ?? 0),
    })
  }, [])

  const columns = React.useMemo(
    () =>
      getMaterialColumns({
        onEdit: openEdit,
        onDelete: (r) => setDeleteRow(r),
      }),
    [openEdit]
  )

  async function submitCreate() {
    try {
      await apiJson("/api/materials", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          category: form.category || "Boshqa",
          quantity: Number(form.quantity) || 0,
          unit: form.unit,
          price: Number(form.price) || 0,
          minQuantity: Number(form.minQuantity) || 0,
        }),
      })
      toast.success("Qo‘shildi")
      setCreateOpen(false)
      setForm({ name: "", category: "", quantity: "", unit: "dona", price: "", minQuantity: "" })
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  async function submitEdit() {
    if (!editRow) return
    try {
      await apiJson(`/api/materials/${editRow.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          quantity: Number(form.quantity),
          unit: form.unit,
          price: Number(form.price),
          minQuantity: Number(form.minQuantity),
        }),
      })
      toast.success("Yangilandi")
      setEditRow(null)
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  async function confirmDelete() {
    if (!deleteRow) return
    try {
      await apiJson(`/api/materials/${deleteRow.id}`, { method: "DELETE" })
      toast.success("O‘chirildi")
      setDeleteRow(null)
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventarizatsiya</h2>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Yangi material
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Barcha materiallar</TabsTrigger>
          <TabsTrigger value="low">Kam qolgan</TabsTrigger>
          <TabsTrigger value="critical">Kritik darajada</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          <DataTable columns={columns} data={items} searchKey="name" />
        </TabsContent>
        <TabsContent value="low" className="space-y-4 mt-4">
          <DataTable columns={columns} data={items.filter((i) => i.status === "low")} searchKey="name" />
        </TabsContent>
        <TabsContent value="critical" className="space-y-4 mt-4">
          <DataTable columns={columns} data={items.filter((i) => i.status === "critical")} searchKey="name" />
        </TabsContent>
      </Tabs>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi material</DialogTitle>
            <DialogDescription>Ombor pozitsiyasi.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Label>Nomi</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Label>Kategoriya</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Metall">Metall</SelectItem>
                <SelectItem value="Elektr">Elektr</SelectItem>
                <SelectItem value="Plastik">Plastik</SelectItem>
                <SelectItem value="Yog'och">Yog&apos;och</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Miqdor</Label>
                <Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
              </div>
              <div>
                <Label>Min. zaxira</Label>
                <Input
                  type="number"
                  value={form.minQuantity}
                  onChange={(e) => setForm({ ...form, minQuantity: e.target.value })}
                />
              </div>
            </div>
            <Label>Birlik</Label>
            <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dona">dona</SelectItem>
                <SelectItem value="metr">metr</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="litr">litr</SelectItem>
                <SelectItem value="m2">m2</SelectItem>
              </SelectContent>
            </Select>
            <Label>Narx</Label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Bekor
            </Button>
            <Button onClick={() => void submitCreate()}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editRow} onOpenChange={(o) => !o && setEditRow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Materialni tahrirlash</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <Label>Nomi</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Label>Kategoriya</Label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Miqdor</Label>
                <Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
              </div>
              <div>
                <Label>Min. zaxira</Label>
                <Input
                  type="number"
                  value={form.minQuantity}
                  onChange={(e) => setForm({ ...form, minQuantity: e.target.value })}
                />
              </div>
            </div>
            <Label>Birlik</Label>
            <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dona">dona</SelectItem>
                <SelectItem value="metr">metr</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="litr">litr</SelectItem>
                <SelectItem value="m2">m2</SelectItem>
              </SelectContent>
            </Select>
            <Label>Narx</Label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRow(null)}>
              Bekor
            </Button>
            <Button onClick={() => void submitEdit()}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteRow} onOpenChange={(o) => !o && setDeleteRow(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Materialni o&apos;chirish?</AlertDialogTitle>
            <AlertDialogDescription>{deleteRow?.name} — qaytarib bo&apos;lmaydi.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={() => void confirmDelete()}>
              O&apos;chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

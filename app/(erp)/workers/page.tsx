"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getWorkerColumns, type WorkerRow } from "@/components/columns/worker-columns"
import { PlusCircle } from "lucide-react"
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

export default function WorkersPage() {
  const [workers, setWorkers] = React.useState<WorkerRow[]>([])
  const [totalSalary, setTotalSalary] = React.useState(0)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editRow, setEditRow] = React.useState<WorkerRow | null>(null)
  const [deleteRow, setDeleteRow] = React.useState<WorkerRow | null>(null)

  const [form, setForm] = React.useState({
    name: "",
    position: "",
    department: "Ishlab chiqarish",
    status: "active" as WorkerRow["status"],
    assignedOrders: "",
    hoursWorked: "",
    hourlyRate: "",
  })

  const load = React.useCallback(async () => {
    try {
      const res = await apiJson<{ data: WorkerRow[] }>("/api/workers")
      setWorkers(res.data)
      const pay = await apiJson<{ summary: { totalSalary: number } }>("/api/workers/payroll")
      setTotalSalary(pay.summary.totalSalary || 0)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  const openEdit = React.useCallback((w: WorkerRow) => {
    setEditRow(w)
    setForm({
      name: w.name,
      position: w.position,
      department: w.department,
      status: w.status,
      assignedOrders: String(w.assignedOrders),
      hoursWorked: String(w.hoursWorked),
      hourlyRate: String(w.hourlyRate || 0),
    })
  }, [])

  const columns = React.useMemo(
    () =>
      getWorkerColumns({
        onEdit: openEdit,
        onDelete: (w) => setDeleteRow(w),
      }),
    [openEdit]
  )

  async function submitCreate() {
    try {
      await apiJson("/api/workers", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          position: form.position,
          department: form.department,
          status: form.status,
          assignedOrders: Number(form.assignedOrders) || 0,
          hoursWorked: Number(form.hoursWorked) || 0,
          hourlyRate: Number(form.hourlyRate) || 0,
        }),
      })
      toast.success("Qo‘shildi")
      setCreateOpen(false)
      setForm({
        name: "",
        position: "",
        department: "Ishlab chiqarish",
        status: "active",
        assignedOrders: "",
        hoursWorked: "",
        hourlyRate: "",
      })
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Xato")
    }
  }

  async function submitEdit() {
    if (!editRow) return
    try {
      await apiJson(`/api/workers/${editRow.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          position: form.position,
          department: form.department,
          status: form.status,
          assignedOrders: Number(form.assignedOrders),
          hoursWorked: Number(form.hoursWorked),
          hourlyRate: Number(form.hourlyRate),
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
      await apiJson(`/api/workers/${deleteRow.id}`, { method: "DELETE" })
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
        <h2 className="text-3xl font-bold tracking-tight">Xodimlar</h2>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Jami hisoblangan oylik</div>
          <div className="text-xl font-semibold">{totalSalary.toLocaleString()} so&apos;m</div>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Yangi xodim
        </Button>
      </div>

      <DataTable columns={columns} data={workers} searchKey="name" />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi xodim</DialogTitle>
            <DialogDescription>Ma&apos;lumotlarni kiriting.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Label>Ism familiya</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Label>Lavozim</Label>
            <Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            <Label>Bo&apos;lim</Label>
            <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ishlab chiqarish">Ishlab chiqarish</SelectItem>
                <SelectItem value="Sifat nazorati">Sifat nazorati</SelectItem>
                <SelectItem value="Texnik xizmat">Texnik xizmat</SelectItem>
                <SelectItem value="Moliya">Moliya</SelectItem>
              </SelectContent>
            </Select>
            <Label>Holat</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as WorkerRow["status"] })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Faol</SelectItem>
                <SelectItem value="on-leave">Ta&apos;tilda</SelectItem>
                <SelectItem value="inactive">Faol emas</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Buyurtmalar (soni)</Label>
                <Input
                  type="number"
                  value={form.assignedOrders}
                  onChange={(e) => setForm({ ...form, assignedOrders: e.target.value })}
                />
              </div>
              <div>
                <Label>Ish soatlari</Label>
                <Input
                  type="number"
                  value={form.hoursWorked}
                  onChange={(e) => setForm({ ...form, hoursWorked: e.target.value })}
                />
              </div>
            </div>
            <Label>Soatlik stavka (so&apos;m)</Label>
            <Input
              type="number"
              min={0}
              value={form.hourlyRate}
              onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
            />
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
            <DialogTitle>Xodimni tahrirlash</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <Label>Ism familiya</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Label>Lavozim</Label>
            <Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            <Label>Bo&apos;lim</Label>
            <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <Label>Holat</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as WorkerRow["status"] })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Faol</SelectItem>
                <SelectItem value="on-leave">Ta&apos;tilda</SelectItem>
                <SelectItem value="inactive">Faol emas</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Buyurtmalar</Label>
                <Input
                  type="number"
                  value={form.assignedOrders}
                  onChange={(e) => setForm({ ...form, assignedOrders: e.target.value })}
                />
              </div>
              <div>
                <Label>Soatlar</Label>
                <Input type="number" value={form.hoursWorked} onChange={(e) => setForm({ ...form, hoursWorked: e.target.value })} />
              </div>
            </div>
            <Label>Soatlik stavka (so&apos;m)</Label>
            <Input
              type="number"
              min={0}
              value={form.hourlyRate}
              onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
            />
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
            <AlertDialogTitle>Xodimni o&apos;chirish?</AlertDialogTitle>
            <AlertDialogDescription>{deleteRow?.name}</AlertDialogDescription>
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

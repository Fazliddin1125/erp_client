"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type WorkerRow = {
  id: string
  name: string
  position: string
  department: string
  status: "active" | "on-leave" | "inactive"
  assignedOrders: number
  hoursWorked: number
  hourlyRate: number
  salary: number
}

export type WorkerColumnHandlers = {
  onEdit: (row: WorkerRow) => void
  onDelete: (row: WorkerRow) => void
}

const baseWorkerColumns: ColumnDef<WorkerRow>[] = [
  {
    accessorKey: "name",
    header: "Xodim",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{row.original.position}</div>
          </div>
        </div>
      )
    },
  },
  { accessorKey: "department", header: "Bo'lim" },
  {
    accessorKey: "assignedOrders",
    header: "Buyurtmalar",
    cell: ({ row }) => <div className="font-medium">{row.getValue("assignedOrders")} ta</div>,
  },
  {
    accessorKey: "hoursWorked",
    header: "Soatlar",
    cell: ({ row }) => <div className="font-medium">{row.getValue("hoursWorked")} soat</div>,
  },
  {
    accessorKey: "hourlyRate",
    header: "Soat stavkasi",
    cell: ({ row }) => <div>{Number(row.getValue("hourlyRate")).toLocaleString()} so&apos;m</div>,
  },
  {
    accessorKey: "salary",
    header: "Oylik",
    cell: ({ row }) => <div className="font-semibold">{Number(row.getValue("salary")).toLocaleString()} so&apos;m</div>,
  },
  {
    accessorKey: "status",
    header: "Holat",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : status === "on-leave" ? "secondary" : "outline"}>
          {status === "active" && "Faol"}
          {status === "on-leave" && "Ta'tilda"}
          {status === "inactive" && "Faol emas"}
        </Badge>
      )
    },
  },
]

function workerActionsColumn(h: WorkerColumnHandlers): ColumnDef<WorkerRow> {
  return {
    id: "actions",
    cell: ({ row }) => {
      const w = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Amallar</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => h.onEdit(w)}>Tahrirlash</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => h.onDelete(w)}>
              O&apos;chirish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}

export function getWorkerColumns(handlers?: WorkerColumnHandlers): ColumnDef<WorkerRow>[] {
  if (!handlers) return baseWorkerColumns
  return [...baseWorkerColumns, workerActionsColumn(handlers)]
}

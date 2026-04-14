"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type InventoryRow = {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  price: number
  minQuantity: number
  status: "normal" | "low" | "critical"
}

export type MaterialColumnHandlers = {
  onEdit: (row: InventoryRow) => void
  onDelete: (row: InventoryRow) => void
}

const baseMaterialColumns: ColumnDef<InventoryRow>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => <span className="font-mono text-xs">{row.original.id.slice(-8)}</span> },
  { accessorKey: "name", header: "Nomi" },
  { accessorKey: "category", header: "Kategoriya" },
  {
    accessorKey: "quantity",
    header: "Miqdori",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("quantity")} {row.original.unit}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Narxi",
    cell: ({ row }) => {
      const amount = Number.parseFloat(String(row.getValue("price")))
      const formatted = new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "UZS" }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Holat",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "normal" ? "default" : status === "low" ? "secondary" : "destructive"}>
          {status === "normal" && "Normal"}
          {status === "low" && "Kam"}
          {status === "critical" && "Kritik"}
        </Badge>
      )
    },
  },
]

function materialActionsColumn(h: MaterialColumnHandlers): ColumnDef<InventoryRow> {
  return {
    id: "actions",
    cell: ({ row }) => {
      const m = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Amallar</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => h.onEdit(m)}>Tahrirlash</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => h.onDelete(m)}>
              O&apos;chirish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}

export function getMaterialColumns(handlers?: MaterialColumnHandlers): ColumnDef<InventoryRow>[] {
  if (!handlers) return baseMaterialColumns
  return [...baseMaterialColumns, materialActionsColumn(handlers)]
}

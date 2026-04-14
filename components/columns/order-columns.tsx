"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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

export type Order = {
  id: string
  customer: string
  date: string
  total: number
  status: "pending" | "in-progress" | "completed" | "cancelled"
  items: number
  unit: "dona" | "kg" | "litr" | "metr" | "m2"
  productType: string
}

export type OrderColumnHandlers = {
  onView: (order: Order) => void
  onEdit: (order: Order) => void
  onStartProduction: (order: Order) => void
  onDelete: (order: Order) => void
}

const baseColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Buyurtma ID",
    cell: ({ row }) => <div className="font-medium">#{String(row.getValue("id")).slice(-8)}</div>,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Mijoz
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "productType",
    header: "Mahsulot turi",
    cell: ({ row }) => <div>{row.getValue("productType")}</div>,
  },
  {
    accessorKey: "date",
    header: "Sana",
  },
  {
    accessorKey: "items",
    header: "Mahsulotlar",
    cell: ({ row }) => {
      const order = row.original
      return <div>{order.items} {order.unit}</div>
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Summa</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(String(row.getValue("total")))
      const formatted = new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "UZS" }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Holat",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "completed"
              ? "success"
              : status === "in-progress"
                ? "default"
                : status === "pending"
                  ? "secondary"
                  : "destructive"
          }
        >
          {status === "pending" && "Kutilmoqda"}
          {status === "in-progress" && "Jarayonda"}
          {status === "completed" && "Yakunlangan"}
          {status === "cancelled" && "Bekor qilingan"}
        </Badge>
      )
    },
  },
]

function actionsColumn(h: OrderColumnHandlers): ColumnDef<Order> {
  return {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menyu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Amallar</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>ID nusxalash</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => h.onView(order)}>Ko&apos;rish</DropdownMenuItem>
            <DropdownMenuItem onClick={() => h.onEdit(order)}>Tahrirlash</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => h.onStartProduction(order)}
              disabled={order.status === "completed" || order.status === "cancelled"}
            >
              Ishlab chiqarishga o&apos;tkazish
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => h.onDelete(order)}>
              O&apos;chirish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}

/** Dashboard: faqat jadval. Buyurtmalar sahifasi: handlers bilan to‘liq amallar. */
export function getOrderColumns(handlers?: OrderColumnHandlers): ColumnDef<Order>[] {
  if (!handlers) return baseColumns
  return [...baseColumns, actionsColumn(handlers)]
}

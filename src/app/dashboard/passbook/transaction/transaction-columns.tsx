  "use client"; // Mark this file as a Client Component

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/sort-hideable";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type Expense = {
  id: string;
  label: string;
  amount: number;
  payment: "UPI" | "CASH" | "CARD";
  date: Date;
  note: string;
};

export const columns: ColumnDef<Expense>[] = [
  // Checkbox
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Sorting
  {
    accessorKey: "label",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Label" />;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Amount" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "payment",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Payment" />;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      const note = row.getValue("note") as string;
      return <div>{note}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original;

      const router = useRouter()


      const handleDelete = async () => {
        try {
          await axios.delete(`/api/expense/${expense.id}`);
          toast.warning("Expense from Passbook was deleted");
          router.refresh();
        } catch (error) {
          console.error("Passbook delete error");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(expense.id)}
            >
              Copy expense ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit expense</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

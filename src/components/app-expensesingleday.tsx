'use client'
import ExpenceDeleteButton from "@/app/dashboard/expense/[id]/deleteexpense";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SkeletonTable } from "./app-skelleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";

const ExpenseTable = () => {
  const {
    data: expense,
    error,
    isLoading,
  } = useQuery<Expense[]>({
    queryKey: ["expense"],
    queryFn: async () => {
      const res = await axios.get("/api/expense");
      return res.data;  
    },
    staleTime: 120 * 1000,
    refetchInterval: 3 * 1000,
    retry: 3,
  });

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isLoading) return <SkeletonTable />;
  if (error) return <p>Error loading expenses</p>;

  const totalAmount = expense?.reduce((sum, data) => sum + data.amount, 0) || 0;

  return (
    <div>
      {isMobile ? (
        // Mobile View
        <ScrollArea className="h-[calc(100vh-250px)] rounded-md border">
          <div className="space-y-2 p-2">
            {expense?.map((data) => (
              <div key={data.id} className="border rounded-lg p-4 shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Date</span>
                    <span className="text-right">
                      {new Date(data.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Label</span>
                    <span className="text-right">{data.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Method</span>
                    <span className="text-right">{data.payment}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Note</span>
                    <span className="text-right">{data.note}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Amount</span>
                    <span className="text-right">{data.amount}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Actions</span>
                    <div className="flex gap-2">
                      {/* <ExpenseEditButton expenseId={data.id} /> */}
                      <ExpenceDeleteButton expenseId={data.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="border rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-right font-bold">{totalAmount}</span>
              </div>
            </div>
          </div>
        </ScrollArea>
      ) : (
        // Desktop View
        <Table>
          <TableCaption>A list of your recent expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="w-[30%]">Note</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="uppercase">
            {expense?.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">
                  {new Date(data.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{data.label}</TableCell>
                <TableCell>{data.payment}</TableCell>
                <TableCell>{data.note}</TableCell>
                <TableCell className="text-right">{data.amount}</TableCell>
                <TableCell className="flex justify-end">
                  {/* <ExpenseEditButton expenseId={data.id} /> */}
                  <ExpenceDeleteButton expenseId={data.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">{totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default ExpenseTable;
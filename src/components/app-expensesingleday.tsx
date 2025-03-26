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

  if (isLoading) return <SkeletonTable />;
  if (error) return <p>Error loading expenses</p>;

  const totalAmount = expense?.reduce((sum, data) => sum + data.amount, 0) || 0;

  return (
    <div>
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
              <TableCell className=" flex justify-end ">
                {/* <ExpenseEditButton expenseId={data.id} /> */}
                <ExpenceDeleteButton expenseId={data.id} />
              </TableCell>
              <TableCell></TableCell>
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
    </div>
  );
};

export default ExpenseTable;

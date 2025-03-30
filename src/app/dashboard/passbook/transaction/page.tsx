import prisma from "../../../../../prisma/client";
import { columns } from "./transaction-columns";
import { DataTable } from "./transaction-datatypes";

async function getData() {
  const expenses = await prisma.expense.findMany();
  return expenses;
}

export default async function DemoPage() {
  const data = await getData();



  return (
    <div>
      <div className="text-2xl">Transactions</div>

      <div className="container mx-auto py-2">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
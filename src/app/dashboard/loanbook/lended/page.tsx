import LoanForm from "@/components/ui/app-loanform";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import prisma from "../../../../../prisma/client";
import { columns } from "@/app/dashboard/loanbook/_components/loan-columns";
import { DataTable } from "@/app/dashboard/loanbook/_components/loan-datatypes";

const Totake = async () => {
  const data = await getData();
  return (
    <div>
      <div className="w-full justify-end flex">
        <Link href="/dashboard/loanbook/loanform">
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </Link>
      </div>
      <div>
        <div className="text-2xl">Lended To</div>

        <div className="container mx-auto py-2">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

async function getData() {
  const loan = await prisma.loan.findMany({
    where: { loantype: "Giving" },
  });
  return loan;
}

export default Totake;

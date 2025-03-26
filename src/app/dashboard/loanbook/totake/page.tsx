import LoanForm from "@/components/ui/app-loanform";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const Totake = () => {
  return (
    <div>
      <Link href="/dashboard/loanbook/loanform">
      <Button variant="outline" size="icon">
        <Plus />
      </Button>
      </Link>
    </div>
  );
};

export default Totake;

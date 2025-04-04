"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Expense } from "@prisma/client";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PaymentMode from "../app-paymentMode";
import { CalenderDateSingle } from "./app-calenderDateSingle";

const ExpenseButton = ({ expense }: { expense?: Expense }) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const { register, reset, handleSubmit, control } = useForm<Expense>();
  const [Error, setError] = useState("");

  const Submitdata = handleSubmit(async (data) => {
    try {
      setisSubmitting(true);
      if (expense) {
        await axios.patch(`/api/expense/${expense.id}`, data);
      } else {
        await axios.post("/api/expense", data);
      }

      setisSubmitting(false);
      toast.success("Recorded transaction");

      reset();
    } catch (error) {
      setisSubmitting(false);
      setError("Unexpexted error");
      toast.error("Error in Adding Expense");
    }
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Add new Expense you have made now
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={Submitdata} id="expenseForm">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date:
                </Label>
                <CalenderDateSingle control={control} name={"date"} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="label" className="text-right">
                  Label:
                </Label>
                <Input
                  id="label"
                  defaultValue={expense?.label}
                  className="col-span-3"
                  placeholder="Label"
                  {...register("label", { required: "Enter label" })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  defaultValue={expense?.amount}
                  placeholder="Enter Amount"
                  className="col-span-3"
                  type="number"
                  min="0"
                  {...register("amount", {
                    required: "Enter amount",
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment" className="text-right">
                  Payment
                </Label>
                <PaymentMode control={control} name="payment" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="note">Note: </Label>
                <Textarea
                  placeholder="Add a note here."
                  id="note"
                  className="min-h-[100px] w-full"
                  {...register("note", { required: "Enter note" })}
                />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} form="expenseForm">
              {" "}
              {/* {expense ? "Update issue" : "Submit Issue"} */}
              {isSubmitting ? "Sending" : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseButton;

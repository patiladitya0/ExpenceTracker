"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loan } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PaymentMode from "../app-paymentMode";
import GiveTake from "../givetake";
import Status from "../status";
import { CalenderDateSingle } from "./app-calenderDateSingle";
import { Textarea } from "./textarea";

const LoanForm = ({ loan }: { loan?: Loan }) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const { register, reset, control, handleSubmit} = useForm<Loan>();
  const [Error, setError] = useState("");

  const Submitdata = handleSubmit(async (data) => {
    try {
      setisSubmitting(true);
      if (loan?.id) {
        await axios.patch(`/api/loan/${loan.id}`, data);
      } else {
        await axios.post("/api/loan", data);
      }
      setisSubmitting(false);
      toast.success("Loan Entry Successful");
      reset();
    } catch (error) {
      setisSubmitting(false);
      setError("Unexpected Error");
    }
  });

  return (
    <div>
      <div className="flex justify-center">
        <Card className="w-[400px] p-4">
          <CardHeader>
            <CardTitle>Create Entry</CardTitle>
            <CardDescription>Enter Details Of Loan!</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={Submitdata} id="loanForm">
              <div className="flex items-center space-x-3">
                <Label htmlFor="date" className="w-24">
                  Date:
                </Label>
                <CalenderDateSingle
                  control={control}
                  name="date"
                  loan={loan?.date}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Label htmlFor="givetake" className="w-24">
                  You Are:
                </Label>
                <GiveTake
                  control={control}
                  name="loantype"
                  loan={loan?.loantype}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Label htmlFor="name" className="w-24">
                  Name:
                </Label>
                <Input
                  id="name"
                  placeholder="To/From"
                  defaultValue={loan?.name}
                  className="flex-1"
                  type="text"
                  {...register("name", { required: "Enter Name" })}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Label htmlFor="amount" className="w-24">
                  Amount:
                </Label>
                <Input
                  id="amount"
                  placeholder="Enter Amount"
                  defaultValue={loan?.amount}
                  className="flex-1"
                  type="number"
                  min="0"
                  {...register("amount", {
                    required: "Enter Amount",
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="flex items-center space-x-3">
                <Label htmlFor="payment" className="w-24">
                  Payment:
                </Label>
                <PaymentMode
                  control={control}
                  name="payment"
                  loan={loan?.payment}
                />
              </div>
              <div className="flex  space-x-3">
                <Label htmlFor="reason" className="w-24">
                  Reason:
                </Label>
                <Textarea
                  placeholder="Enter Reason"
                  defaultValue={loan?.reason}
                  id="reason"
                  className="min-h-[50px] flex-1"
                  {...register("reason", { required: "Enter Reason" })}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Label htmlFor="status" className="w-24">
                  Status:
                </Label>
                <Status control={control} name="status" loan={loan?.status} />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="destructive"
              disabled={isSubmitting}
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} form="loanForm">
              {isSubmitting ? "Adding" : "Add"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoanForm;

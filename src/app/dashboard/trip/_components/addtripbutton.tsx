"use client";

import React, { useState } from "react";
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
import { Plus } from "lucide-react";
import { CalenderDateSingle } from "@/components/ui/app-calenderDateSingle";
import { Trip } from "@prisma/client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

const AddTripButton = () => {
  const { handleSubmit, register, reset, control } = useForm<Trip>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Error, setError] = useState("");

  const SubmitData = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/trip", data);
      setIsSubmitting(false);
      toast("Trip has been added. Enjoy!!");
      reset();
    } catch (error) {
      setIsSubmitting(false);
      setError("Unexpected error in trip form");
    }
  });

  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Trip</DialogTitle>
            <DialogDescription>
              Going on a trip? Leave your expense tracking to us. You just enjoy
              the ride!
            </DialogDescription>
          </DialogHeader>
          <form id="tripform" onSubmit={SubmitData}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Name your adventure"
                  className="col-span-3"
                  {...register("name", { required: "Enter Name" })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <CalenderDateSingle control={control} name="date" />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button type="submit" form="tripform" disabled={isSubmitting}>
              {isSubmitting ? "Submiting" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTripButton;

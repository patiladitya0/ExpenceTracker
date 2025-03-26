"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import { Controller } from "react-hook-form";



const PaymentMode = ({ control, name }: { control: any; name: any }) => {
  return (
    <div>
      <Controller 
      control={control}
      name={name}
      render={({field}) =>(
      <Select onValueChange={field.onChange} value={field.value || ""}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Payment Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="UPI">UPI</SelectItem>
          <SelectItem value="CASH">Cash</SelectItem>
          <SelectItem value="CARD">Card</SelectItem>
        </SelectContent>
      </Select>
      )} />
    </div>
  );
};

export default PaymentMode;

"use client";

import * as React from "react";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

interface CalenderDateSingleProps {
  control?: any;
  name?: string;
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  loan?: Date | string;
}

export function CalenderDateSingle({
  control,
  name,
  date,
  setDate,
  loan,
}: CalenderDateSingleProps) {
  const parsedLoanDate =
    loan instanceof Date ? loan : loan ? new Date(loan) : undefined;

  const renderComponent = (field?: {
    value: any;
    onChange: (date: Date | undefined) => void;
  }) => {
    const selectedDate = field?.value || date || parsedLoanDate;

    const handleChange = (newDate: Date | undefined) => {
      field?.onChange?.(newDate);
      setDate?.(newDate);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString()
              : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-1 p-2"
        >
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={
                selectedDate instanceof Date
                  ? selectedDate
                  : new Date(selectedDate)
              }
              onSelect={(date) => handleChange(date || undefined)}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return control && name ? (
    <Controller
      control={control}
      name={name}
      defaultValue={parsedLoanDate}
      render={({ field }) => renderComponent(field)}
    />
  ) : (
    renderComponent()
  );
}

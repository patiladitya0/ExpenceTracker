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

export function CalenderDateSingle({
  control,
  name,
}: {
  control: any;
  name: any;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value
                ? new Date(field.value).toLocaleDateString()
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2"
          >
            <Select
              onValueChange={(value) => {
                const newDate = addDays(new Date(), parseInt(value));
                field.onChange(newDate); // ✅ Passes Date object
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="-1">Yesterday</SelectItem>
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
              </SelectContent>
            </Select>

            {/* ✅ Calendar Picker */}
            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date || null)} // ✅ Passes Date object
              />
            </div>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}

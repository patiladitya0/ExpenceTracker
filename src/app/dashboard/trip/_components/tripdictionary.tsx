"use client";

import { SkeletonTable } from "@/components/app-skelleton";
import { Button } from "@/components/ui/button";
import { Trip } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";

export const TripDictionary = () => {
  const {
    data: trip,
    error,
    isLoading,
  } = useQuery<Trip[]>({
    queryKey: ["trip"],
    queryFn: async () => {
      const res = await axios.get("/api/trip");
      return res.data;
    },
    staleTime: 120 * 1000,
    refetchInterval: 3 * 1000,
    retry: 3,
  });

  if (isLoading) return <SkeletonTable />;
  if (error) return <p>Error loading Trips</p>;

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {trip
        ?.slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((items) => (
          <div
            key={items.id}
            id={items.id}
            className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] xl:w-[22%] border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between ">
              <div>
                <p className="text-xl font-semibold uppercase">{items.name}</p>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(items.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(items.id)}
                    >
                      Copy Trip Id
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

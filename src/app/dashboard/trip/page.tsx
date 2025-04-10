import { Separator } from "@/components/ui/separator";
import AddTripButton from "./_components/addtripbutton";

import { RangeDate } from "@/components/ui/app-calenderDateRange";
import { Input } from "@/components/ui/input";
import type { Trip } from "@prisma/client";
import { TripDictionary } from "./_components/tripdictionary";

const Trip = () => {
  return (
    <div>
      <div className="m-2">
        <div className="flex justify-between">
<p className="text-4xl font-semibold">Trip</p>
        <AddTripButton />
        </div>
      </div>
      <Separator />
      <div>
        <Filters />
        <TripDictionary />
      </div>
    </div>
  );
};

const Filters = () => {
  return (
    <div>
      <div className="flex items-center py-4 gap-3 flex-wrap">
        <Input placeholder="Search Trips" className="max-w-sm" />
        <RangeDate date={undefined} setDate={undefined} />
      </div>
    </div>
  );
};

export default Trip;

import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Status = ({
  control,
  name,
  loan,
}: {
  control: any;
  name: any;
  loan?: string;
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={loan || " "}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value || "Pending"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Whats the Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>

                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default Status;

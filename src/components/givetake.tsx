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

const GiveTake = ({ control, name }: { control: any; name: any }) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value || ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Taking/ Giving" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loan</SelectLabel>
                <SelectItem value="Taking">Taking</SelectItem>
                <SelectItem value="Giving">Giving</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      ></Controller>
    </div>
  );
};

export default GiveTake;

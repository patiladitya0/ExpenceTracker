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

const GiveTake = ({
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
          <Select onValueChange={field.onChange} value={field.value || ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Borrowing/Lending" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loan</SelectLabel>
                <SelectItem value="Taking">Borrowing</SelectItem>
                <SelectItem value="Giving">Lending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      ></Controller>
    </div>
  );
};

export default GiveTake;

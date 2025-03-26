import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "./ui/button";

const demoCategory = [
  {
    name: "Home",
  },
  {
    name: "Pet",
  },
  {
    name: "Home",
  },
  {
    name: "Pet",
  },
];

export function CategoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[90%]">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {demoCategory.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium w-[90%]">
              {invoice.name}
            </TableCell>

            <TableCell>
              <Button variant="secondary">Edit</Button>
            </TableCell>
            <TableCell>
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

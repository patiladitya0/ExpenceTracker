import { z } from "zod";

const Payments = z.enum(["UPI", "CASH", "CARD"]);

const ExpenseSchema = z.object({
  label: z.string().min(1, "Label is required").max(255),
  amount: z.number(),
  payment: Payments,
  note: z.string(),
  date: z.coerce.date(),
});

const LoanType = z.enum(["Taking", "Giving"]);

const Status = z.enum(["Completed", "Pending"]);

const LoanSchema = z.object({
  loantype: LoanType,
  name: z.string().min(1, "Name is required").max(255),
  amount: z.number(),
  payment: Payments,
  reason: z.string(),
  date: z.coerce.date(),
  status: Status,
});

const LoanStatusEdit = z.object({
  status: Status,
});

const TripSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  date: z.coerce.date(),
});

export {
  ExpenseSchema,
  Payments,
  LoanSchema,
  LoanType,
  Status,
  LoanStatusEdit,
  TripSchema
};

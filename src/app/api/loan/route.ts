import { LoanSchema } from "@/app/validationschema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Request body:", body);
  const validation = LoanSchema.safeParse(body);
  console.log("Request validation:", validation);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newLoan = await prisma.loan.create({
    data: {
      loantype: body.loantype,
      name: body.name,
      amount: body.amount,
      payment: body.payment,
      reason: body.reason,
      date: body.date,
      status: body.status,
    },
  });

  return NextResponse.json(newLoan, { status: 201 });
}

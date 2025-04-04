import { ExpenseSchema } from "@/app/validationschema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = ExpenseSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const expenseId = params.id.trim();
  const expense = await prisma.expense.findUnique({
    where: { id: expenseId },
  });

  if (!expense) return NextResponse.json("Invalid Issue", { status: 404 });

  const updateExpense = await prisma.expense.update({
    where: { id: expense.id },

    data: {
      label: body.label,
      amount: body.amount,
      payment: body.payment,
      note: body.note,
      date: new Date(body.date),
    },
  });

  return NextResponse.json(updateExpense);
}

export async function DELETE(
  request: NextRequest, // Use NextRequest instead of Request
  { params }: { params: { id: string } } // Correct typing for params
) {
  const expenseId = params.id.trim(); // Extract the ID from params
  const expense = await prisma.expense.findUnique({
    where: { id: expenseId },
  });

  if (!expense)
    return NextResponse.json({ error: "Invalid Id" }, { status: 404 });

  const expenseDelete = await prisma.expense.delete({
    where: { id: expense.id },
  });

  return NextResponse.json({ expenseDelete });
}

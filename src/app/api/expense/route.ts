import { ExpenseSchema } from "@/app/validationschema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { endOfDay, startOfDay } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = ExpenseSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newExpense = await prisma.expense.create({
      data: {
        label: body.label,
        amount: body.amount,
        payment: body.payment,
        note: body.note,
        date: body.date,
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  const expense = await prisma.expense.findMany({
    where: {
      date: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  return NextResponse.json(expense);
}

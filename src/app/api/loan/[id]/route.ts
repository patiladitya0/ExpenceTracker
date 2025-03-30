import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { LoanSchema, LoanStatusEdit } from "@/app/validationschema";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const loanid = params.id.trim();
  const loan = await prisma.loan.findUnique({
    where: { id: loanid },
  });

  if (!loan) return NextResponse.json({ error: "Invalid Id" }, { status: 404 });

  const loandelete = await prisma.loan.delete({
    where: { id: loan.id },
  });

  return NextResponse.json({ loandelete });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log("Received body:", body); // Debugging

  const validation = LoanStatusEdit.safeParse(body);

  if (!validation.success) {
    console.error("Validation Error:", validation.error.format());
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const loanid = params.id.trim();

  const loan = await prisma.loan.findUnique({
    where: { id: loanid },
  });

  if (!loan) return NextResponse.json({ error: "Invalid Id" }, { status: 404 });

  const loanUpdate = await prisma.loan.update({
    where: { id: loan.id },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(loanUpdate);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = LoanSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const loanid = params.id.trim();

  const loan = await prisma.loan.findUnique({
    where: { id: loanid },
  });

  if (!loan) return NextResponse.json({ error: "Invalid Id" }, { status: 404 });

  return NextResponse.json(loan);
}

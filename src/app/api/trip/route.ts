import { TripSchema } from "@/app/validationschema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = TripSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newTrip = await prisma.trip.create({
    data: {
      name: body.name,
      date: body.date,
    },
  });

  return NextResponse.json(newTrip, { status: 201 });
}

export async function GET() {
  try {
    const trips = await prisma.trip.findMany();
    return NextResponse.json(trips);
  } catch (error) {
    return new NextResponse("Failed to fetch trips", { status: 500 });
  }
}

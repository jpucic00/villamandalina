import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = authenticateRequest(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { startDate, endDate, price } = await req.json();

    if (!startDate || !endDate || !price) {
      return NextResponse.json(
        { error: "Start date, end date, and price are required" },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const result = await db.execute({
      sql: "UPDATE prices SET start_date = ?, end_date = ?, price = ? WHERE id = ?",
      args: [startDate, endDate, price, parseInt(params.id)],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: "Price not found" }, { status: 404 });
    }

    return NextResponse.json({ id: parseInt(params.id), startDate, endDate, price });
  } catch (error) {
    console.error("Error updating price:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = authenticateRequest(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const db = getDatabase();
    const result = await db.execute({
      sql: "DELETE FROM prices WHERE id = ?",
      args: [parseInt(params.id)],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: "Price not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Price removed successfully" });
  } catch (error) {
    console.error("Error deleting price:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

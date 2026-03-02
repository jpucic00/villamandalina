import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = getDatabase();
    const result = await db.execute(
      "SELECT id, start_date as startDate, end_date as endDate FROM booked_dates ORDER BY start_date"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = authenticateRequest(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { startDate, endDate } = await req.json();

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Start date and end date are required" }, { status: 400 });
    }

    const db = getDatabase();
    const result = await db.execute({
      sql: "INSERT INTO booked_dates (start_date, end_date) VALUES (?, ?)",
      args: [startDate, endDate],
    });

    return NextResponse.json(
      { id: Number(result.lastInsertRowid), startDate, endDate },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booked date:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

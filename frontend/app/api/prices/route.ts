import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = getDatabase();
    const result = await db.execute(
      "SELECT id, start_date as startDate, end_date as endDate, price FROM prices ORDER BY start_date"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
      sql: "INSERT INTO prices (start_date, end_date, price) VALUES (?, ?, ?)",
      args: [startDate, endDate, price],
    });

    return NextResponse.json(
      { id: Number(result.lastInsertRowid), startDate, endDate, price },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating price:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

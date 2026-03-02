import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = authenticateRequest(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const db = getDatabase();
    const result = await db.execute({
      sql: "DELETE FROM booked_dates WHERE id = ?",
      args: [parseInt(params.id)],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: "Booked date not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Booked date removed successfully" });
  } catch (error) {
    console.error("Error deleting booked date:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

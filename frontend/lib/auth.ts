import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

interface JwtPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

export function generateToken(user: { id: number; email: string }): string {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function authenticateRequest(
  req: NextRequest
): { user: JwtPayload } | NextResponse {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Access token required" }, { status: 401 });
  }

  try {
    const user = verifyToken(token);
    return { user };
  } catch {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }
}

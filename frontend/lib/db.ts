import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";

let db: ReturnType<typeof createClient> | null = null;

export function getDatabase() {
  if (db) return db;

  if (process.env.TURSO_DATABASE_URL) {
    db = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
      intMode: "number",
    });
    console.log("Connected to Turso database");
  } else {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    db = createClient({ url: "file:./data/villa.db" });
    console.log("Connected to local SQLite database");
  }

  return db;
}

export async function initializeDatabase(db: ReturnType<typeof createClient>) {
  try {
    await db.batch(
      [
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS booked_dates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          start_date TEXT NOT NULL,
          end_date TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS prices (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          start_date TEXT NOT NULL,
          end_date TEXT NOT NULL,
          price TEXT NOT NULL
        )`,
      ],
      "write"
    );
    console.log("Database tables initialized");
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg?.includes("already exists")) {
      console.log("Database tables already exist");
    } else {
      console.log("Database initialization note:", msg);
    }
  }
}

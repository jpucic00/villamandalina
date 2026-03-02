// Database initialization script for Next.js deployment
// Run with: node frontend/scripts/init-db.mjs

import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

let db;

if (process.env.TURSO_DATABASE_URL) {
  db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
    intMode: "number",
  });
  console.log("Connected to Turso database");
} else {
  // Use process.cwd()/data — run this script from the frontend/ directory
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const dbPath = path.join(dataDir, "villa.db");
  db = createClient({ url: `file:${dbPath}` });
  console.log("Connected to local SQLite database at", dbPath);
}

async function main() {
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
  } catch (error) {
    if (error.message?.includes("already exists")) {
      console.log("Database tables already exist");
    } else {
      console.log("Database initialization note:", error.message);
    }
  }

  try {
    const existingUser = await db.execute({
      sql: "SELECT id FROM users WHERE email = ?",
      args: ["admin@villamandalina.com"],
    });

    if (existingUser.rows.length === 0) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await db.execute({
        sql: "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        args: ["admin@villamandalina.com", passwordHash],
      });
      console.log("Created default admin user: admin@villamandalina.com");
      console.log("Default password: admin123");
      console.log("IMPORTANT: Change this password in production!");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.log("Admin user check/creation note:", error.message);
  }

  console.log("Database initialization complete!");
}

main().catch((error) => {
  console.error("Database initialization error:", error.message);
  process.exit(0);
});

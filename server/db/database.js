import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

let db = null;

export function getDatabase() {
  if (db) return db;

  // Use Turso in production, local SQLite file via libsql in development
  if (process.env.TURSO_DATABASE_URL) {
    db = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    console.log('Connected to Turso database');
  } else {
    // Ensure data directory exists for local development
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Use libsql client with local file URL
    db = createClient({
      url: 'file:./data/villa.db',
    });
    console.log('Connected to local SQLite database');
  }

  return db;
}

export async function initializeDatabase(db) {
  // Use batch to create all tables at once (better for Turso)
  try {
    await db.batch([
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
      )`
    ], 'write');

    console.log('Database tables initialized');
  } catch (error) {
    // Tables likely already exist, which is fine
    if (error.message?.includes('already exists')) {
      console.log('Database tables already exist');
    } else {
      // For other errors, log but don't fail - tables may already exist
      console.log('Database initialization note:', error.message);
    }
  }
}

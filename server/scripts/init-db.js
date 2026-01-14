import { getDatabase, initializeDatabase } from '../db/database.js';
import bcrypt from 'bcryptjs';

async function main() {
  const db = getDatabase();

  // Initialize tables
  await initializeDatabase(db);

  // Check if admin user exists
  try {
    const existingUser = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: ['admin@villamandalina.com']
    });

    if (existingUser.rows.length === 0) {
      // Create default admin user
      const passwordHash = await bcrypt.hash('admin123', 10);
      await db.execute({
        sql: 'INSERT INTO users (email, password_hash) VALUES (?, ?)',
        args: ['admin@villamandalina.com', passwordHash]
      });
      console.log('Created default admin user: admin@villamandalina.com');
      console.log('Default password: admin123');
      console.log('IMPORTANT: Change this password in production!');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    // User might already exist or table query failed - that's OK
    console.log('Admin user check/creation note:', error.message);
  }

  console.log('Database initialization complete!');
}

main().catch((error) => {
  console.error('Database initialization error:', error.message);
  // Exit with success anyway - server can still try to start
  // Tables might already exist from previous deployment
  process.exit(0);
});

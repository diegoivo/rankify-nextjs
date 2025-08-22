import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.POSTGRES_URL_DEV || process.env.POSTGRES_URL_PROD || '';

if (!connectionString) {
  throw new Error('Database connection string not found');
}

const sql = neon(connectionString);
export const db = drizzle(sql);
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@shared/schema";

// Safe to import even without DATABASE_URL — the db object just won't work
// DatabaseStorage is only instantiated when DATABASE_URL is set
const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : (null as any);

export const db = sql ? drizzle(sql, { schema }) : (null as any);

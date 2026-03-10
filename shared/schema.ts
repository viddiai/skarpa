import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const exitDiagnoses = pgTable("exit_diagnoses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  industry: text("industry").notNull(),
  revenue: text("revenue").notNull(),
  profitMargin: text("profit_margin").notNull(),
  yearsInBusiness: text("years_in_business").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const buyerGuideRequests = pgTable("buyer_guide_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Page view tracking ──────────────────────────────────────
export const pageViews = pgTable("page_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  path: text("path").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  visitorId: text("visitor_id").notNull(),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Outreach metrics (manual entry) ─────────────────────────
export const outreachMetrics = pgTable("outreach_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  category: text("category").notNull(), // 'email' | 'linkedin' | 'gohighlevel'
  metricName: text("metric_name").notNull(),
  metricValue: integer("metric_value").notNull().default(0),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Zod schemas ─────────────────────────────────────────────

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertExitDiagnosisSchema = createInsertSchema(exitDiagnoses).omit({
  id: true,
  createdAt: true,
}).extend({
  companyName: z.string().trim().min(1, "Företagsnamn krävs"),
  industry: z.string().trim().min(1, "Bransch krävs"),
  revenue: z.string().trim().min(1, "Omsättning krävs"),
  profitMargin: z.string().trim().min(1, "Rörelsemarginal krävs"),
  yearsInBusiness: z.string().trim().min(1, "Antal år krävs"),
  name: z.string().trim().min(1, "Namn krävs"),
  email: z.string().trim().email("Ogiltig e-postadress"),
  phone: z.string().trim().optional(),
});

export const insertBuyerGuideRequestSchema = createInsertSchema(buyerGuideRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().trim().min(1, "Namn krävs"),
  email: z.string().trim().email("Ogiltig e-postadress"),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().trim().min(1, "Namn krävs"),
  email: z.string().trim().email("Ogiltig e-postadress"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Meddelandet måste vara minst 10 tecken"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ExitDiagnosis = typeof exitDiagnoses.$inferSelect;
export type InsertExitDiagnosis = z.infer<typeof insertExitDiagnosisSchema>;
export type BuyerGuideRequest = typeof buyerGuideRequests.$inferSelect;
export type InsertBuyerGuideRequest = z.infer<typeof insertBuyerGuideRequestSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export const insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  createdAt: true,
}).extend({
  path: z.string().min(1),
  visitorId: z.string().min(1),
  referrer: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  sessionId: z.string().nullable().optional(),
});

export const insertOutreachMetricSchema = createInsertSchema(outreachMetrics).omit({
  id: true,
  createdAt: true,
}).extend({
  date: z.string().or(z.date()),
  category: z.enum(["email", "linkedin", "gohighlevel"]),
  metricName: z.string().min(1, "Metriknamn krävs"),
  metricValue: z.number().int().min(0, "Värdet måste vara >= 0"),
  notes: z.string().optional(),
});

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type OutreachMetric = typeof outreachMetrics.$inferSelect;
export type InsertOutreachMetric = z.infer<typeof insertOutreachMetricSchema>;

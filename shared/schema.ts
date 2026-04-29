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

// ── Contacts (CRM-style prospect list) ──────────────────────
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  companyName: text("company_name"),
  website: text("website"),
  industry: text("industry"),
  revenueRange: text("revenue_range"),
  employeeCount: integer("employee_count"),
  ownerCeoPartnerName: text("owner_ceo_partner_name"),
  linkedinUrl: text("linkedin_url"),
  persona: text("persona"),
  icpScore: integer("icp_score"),
  source: text("source"),
  outreachStatus: text("outreach_status").notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

export const OUTREACH_STATUSES = [
  "new",
  "contacted",
  "replied",
  "qualified",
  "meeting_booked",
  "not_interested",
  "closed_won",
  "closed_lost",
] as const;

export const PERSONAS = [
  "family_owned",
  "founder_led",
  "financial_buyer",
  "strategic_buyer",
  "industry_player",
  "other",
] as const;

export const SOURCES = [
  "linkedin",
  "website_form",
  "referral",
  "cold_email",
  "apollo_list",
  "manual",
  "other",
] as const;

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.string().trim().email("Ogiltig e-postadress"),
  companyName: z.string().trim().optional().nullable(),
  website: z.string().trim().url("Ogiltig URL").optional().or(z.literal("")).nullable(),
  industry: z.string().trim().optional().nullable(),
  revenueRange: z.string().trim().optional().nullable(),
  employeeCount: z.number().int().min(0).optional().nullable(),
  ownerCeoPartnerName: z.string().trim().optional().nullable(),
  linkedinUrl: z.string().trim().url("Ogiltig URL").optional().or(z.literal("")).nullable(),
  persona: z.enum(PERSONAS).optional().nullable(),
  icpScore: z.number().int().min(0).max(100).optional().nullable(),
  source: z.enum(SOURCES).optional().nullable(),
  outreachStatus: z.enum(OUTREACH_STATUSES).default("new"),
  notes: z.string().optional().nullable(),
});

export const updateContactSchema = insertContactSchema.partial();

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
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type UpdateContact = z.infer<typeof updateContactSchema>;
export type OutreachStatus = (typeof OUTREACH_STATUSES)[number];
export type Persona = (typeof PERSONAS)[number];
export type Source = (typeof SOURCES)[number];

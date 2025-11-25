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

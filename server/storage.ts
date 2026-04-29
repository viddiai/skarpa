import {
  type User,
  type InsertUser,
  type ExitDiagnosis,
  type InsertExitDiagnosis,
  type BuyerGuideRequest,
  type InsertBuyerGuideRequest,
  type ContactMessage,
  type InsertContactMessage,
  type PageView,
  type InsertPageView,
  type OutreachMetric,
  type InsertOutreachMetric,
  type Contact,
  type InsertContact,
  type UpdateContact,
  users,
  exitDiagnoses,
  buyerGuideRequests,
  contactMessages,
  pageViews,
  outreachMetrics,
  contacts,
} from "../shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, gte, count, countDistinct, sql } from "drizzle-orm";

// ── Interface ───────────────────────────────────────────────

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Exit Diagnosis methods
  createExitDiagnosis(diagnosis: InsertExitDiagnosis): Promise<ExitDiagnosis>;
  getExitDiagnoses(): Promise<ExitDiagnosis[]>;

  // Buyer Guide methods
  createBuyerGuideRequest(request: InsertBuyerGuideRequest): Promise<BuyerGuideRequest>;
  getBuyerGuideRequests(): Promise<BuyerGuideRequest[]>;

  // Contact Message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;

  // Page view tracking
  createPageView(view: InsertPageView): Promise<void>;
  getPageViewStats(since: Date): Promise<{ totalViews: number; uniqueVisitors: number }>;
  getPageViewTimeseries(days: number): Promise<{ date: string; views: number; unique: number }[]>;
  getTopPages(since: Date, limit: number): Promise<{ path: string; count: number }[]>;

  // Outreach metrics
  createOutreachMetric(metric: InsertOutreachMetric): Promise<OutreachMetric>;
  getOutreachMetrics(since?: Date): Promise<OutreachMetric[]>;
  deleteOutreachMetric(id: string): Promise<void>;

  // Contacts (CRM)
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(filter?: { status?: string }): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  updateContact(id: string, patch: UpdateContact): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<void>;
}

// ── MemStorage (development fallback) ───────────────────────

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private exitDiagnosesMap: Map<string, ExitDiagnosis>;
  private buyerGuideRequestsMap: Map<string, BuyerGuideRequest>;
  private contactMessagesMap: Map<string, ContactMessage>;
  private pageViewsList: PageView[];
  private outreachMetricsMap: Map<string, OutreachMetric>;

  constructor() {
    this.users = new Map();
    this.exitDiagnosesMap = new Map();
    this.buyerGuideRequestsMap = new Map();
    this.contactMessagesMap = new Map();
    this.pageViewsList = [];
    this.outreachMetricsMap = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createExitDiagnosis(diagnosis: InsertExitDiagnosis): Promise<ExitDiagnosis> {
    const id = randomUUID();
    const exitDiagnosis: ExitDiagnosis = {
      id,
      ...diagnosis,
      phone: diagnosis.phone ?? null,
      createdAt: new Date(),
    };
    this.exitDiagnosesMap.set(id, exitDiagnosis);
    return exitDiagnosis;
  }

  async getExitDiagnoses(): Promise<ExitDiagnosis[]> {
    return Array.from(this.exitDiagnosesMap.values());
  }

  async createBuyerGuideRequest(request: InsertBuyerGuideRequest): Promise<BuyerGuideRequest> {
    const id = randomUUID();
    const buyerGuideRequest: BuyerGuideRequest = {
      id,
      ...request,
      createdAt: new Date(),
    };
    this.buyerGuideRequestsMap.set(id, buyerGuideRequest);
    return buyerGuideRequest;
  }

  async getBuyerGuideRequests(): Promise<BuyerGuideRequest[]> {
    return Array.from(this.buyerGuideRequestsMap.values());
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      id,
      ...message,
      phone: message.phone ?? null,
      createdAt: new Date(),
    };
    this.contactMessagesMap.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesMap.values());
  }

  // Page view tracking (in-memory — only for local dev)
  async createPageView(view: InsertPageView): Promise<void> {
    this.pageViewsList.push({
      id: randomUUID(),
      ...view,
      referrer: view.referrer ?? null,
      userAgent: view.userAgent ?? null,
      sessionId: view.sessionId ?? null,
      createdAt: new Date(),
    });
  }

  async getPageViewStats(since: Date): Promise<{ totalViews: number; uniqueVisitors: number }> {
    const filtered = this.pageViewsList.filter((pv) => pv.createdAt >= since);
    const uniqueVisitors = new Set(filtered.map((pv) => pv.visitorId)).size;
    return { totalViews: filtered.length, uniqueVisitors };
  }

  async getPageViewTimeseries(days: number): Promise<{ date: string; views: number; unique: number }[]> {
    const since = new Date(Date.now() - days * 86400000);
    const filtered = this.pageViewsList.filter((pv) => pv.createdAt >= since);
    const byDay = new Map<string, Set<string>>();
    const countByDay = new Map<string, number>();
    for (const pv of filtered) {
      const day = pv.createdAt.toISOString().slice(0, 10);
      countByDay.set(day, (countByDay.get(day) || 0) + 1);
      if (!byDay.has(day)) byDay.set(day, new Set());
      byDay.get(day)!.add(pv.visitorId);
    }
    return Array.from(countByDay.entries())
      .map(([date, views]) => ({ date, views, unique: byDay.get(date)?.size || 0 }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async getTopPages(since: Date, limit: number): Promise<{ path: string; count: number }[]> {
    const filtered = this.pageViewsList.filter((pv) => pv.createdAt >= since);
    const counts = new Map<string, number>();
    for (const pv of filtered) counts.set(pv.path, (counts.get(pv.path) || 0) + 1);
    return Array.from(counts.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  // Outreach metrics
  async createOutreachMetric(metric: InsertOutreachMetric): Promise<OutreachMetric> {
    const id = randomUUID();
    const entry: OutreachMetric = {
      id,
      ...metric,
      date: typeof metric.date === "string" ? new Date(metric.date) : metric.date,
      notes: metric.notes ?? null,
      createdAt: new Date(),
    };
    this.outreachMetricsMap.set(id, entry);
    return entry;
  }

  async getOutreachMetrics(since?: Date): Promise<OutreachMetric[]> {
    const all = Array.from(this.outreachMetricsMap.values());
    if (since) return all.filter((m) => m.date >= since);
    return all;
  }

  async deleteOutreachMetric(id: string): Promise<void> {
    this.outreachMetricsMap.delete(id);
  }

  // Contacts ─────────────────────────────────────────────────
  private contactsMap = new Map<string, Contact>();

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const now = new Date();
    const entry: Contact = {
      id,
      email: contact.email,
      companyName: contact.companyName ?? null,
      website: contact.website || null,
      industry: contact.industry ?? null,
      revenueRange: contact.revenueRange ?? null,
      employeeCount: contact.employeeCount ?? null,
      ownerCeoPartnerName: contact.ownerCeoPartnerName ?? null,
      linkedinUrl: contact.linkedinUrl || null,
      persona: contact.persona ?? null,
      icpScore: contact.icpScore ?? null,
      source: contact.source ?? null,
      outreachStatus: contact.outreachStatus ?? "new",
      notes: contact.notes ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.contactsMap.set(id, entry);
    return entry;
  }

  async getContacts(filter?: { status?: string }): Promise<Contact[]> {
    const all = Array.from(this.contactsMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    if (filter?.status) return all.filter((c) => c.outreachStatus === filter.status);
    return all;
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contactsMap.get(id);
  }

  async updateContact(id: string, patch: UpdateContact): Promise<Contact | undefined> {
    const existing = this.contactsMap.get(id);
    if (!existing) return undefined;
    const updated: Contact = { ...existing, ...patch, id, updatedAt: new Date() } as Contact;
    this.contactsMap.set(id, updated);
    return updated;
  }

  async deleteContact(id: string): Promise<void> {
    this.contactsMap.delete(id);
  }
}

// ── DatabaseStorage (Neon PostgreSQL via Drizzle) ───────────

class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createExitDiagnosis(diagnosis: InsertExitDiagnosis): Promise<ExitDiagnosis> {
    const [result] = await db.insert(exitDiagnoses).values(diagnosis).returning();
    return result;
  }

  async getExitDiagnoses(): Promise<ExitDiagnosis[]> {
    return db.select().from(exitDiagnoses).orderBy(desc(exitDiagnoses.createdAt));
  }

  async createBuyerGuideRequest(request: InsertBuyerGuideRequest): Promise<BuyerGuideRequest> {
    const [result] = await db.insert(buyerGuideRequests).values(request).returning();
    return result;
  }

  async getBuyerGuideRequests(): Promise<BuyerGuideRequest[]> {
    return db.select().from(buyerGuideRequests).orderBy(desc(buyerGuideRequests.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await db.insert(contactMessages).values(message).returning();
    return result;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createPageView(view: InsertPageView): Promise<void> {
    await db.insert(pageViews).values(view);
  }

  async getPageViewStats(since: Date): Promise<{ totalViews: number; uniqueVisitors: number }> {
    const [result] = await db
      .select({
        totalViews: count(),
        uniqueVisitors: countDistinct(pageViews.visitorId),
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since));
    return {
      totalViews: Number(result?.totalViews ?? 0),
      uniqueVisitors: Number(result?.uniqueVisitors ?? 0),
    };
  }

  async getPageViewTimeseries(days: number): Promise<{ date: string; views: number; unique: number }[]> {
    const since = new Date(Date.now() - days * 86400000);
    const rows = await db
      .select({
        date: sql<string>`DATE(${pageViews.createdAt})::text`,
        views: count(),
        unique: countDistinct(pageViews.visitorId),
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(sql`DATE(${pageViews.createdAt})`)
      .orderBy(sql`DATE(${pageViews.createdAt})`);
    return rows.map((r: { date: string; views: number; unique: number }) => ({
      date: r.date,
      views: Number(r.views),
      unique: Number(r.unique),
    }));
  }

  async getTopPages(since: Date, limit: number): Promise<{ path: string; count: number }[]> {
    const rows = await db
      .select({
        path: pageViews.path,
        count: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.path)
      .orderBy(desc(count()))
      .limit(limit);
    return rows.map((r: { path: string; count: number }) => ({
      path: r.path,
      count: Number(r.count),
    }));
  }

  async createOutreachMetric(metric: InsertOutreachMetric): Promise<OutreachMetric> {
    const [result] = await db.insert(outreachMetrics).values({
      ...metric,
      date: typeof metric.date === "string" ? new Date(metric.date) : metric.date,
    }).returning();
    return result;
  }

  async getOutreachMetrics(since?: Date): Promise<OutreachMetric[]> {
    if (since) {
      return db
        .select()
        .from(outreachMetrics)
        .where(gte(outreachMetrics.date, since))
        .orderBy(desc(outreachMetrics.date));
    }
    return db.select().from(outreachMetrics).orderBy(desc(outreachMetrics.date));
  }

  async deleteOutreachMetric(id: string): Promise<void> {
    await db.delete(outreachMetrics).where(eq(outreachMetrics.id, id));
  }

  // Contacts ─────────────────────────────────────────────────

  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db
      .insert(contacts)
      .values({
        ...contact,
        website: contact.website || null,
        linkedinUrl: contact.linkedinUrl || null,
      })
      .returning();
    return result;
  }

  async getContacts(filter?: { status?: string }): Promise<Contact[]> {
    if (filter?.status) {
      return db
        .select()
        .from(contacts)
        .where(eq(contacts.outreachStatus, filter.status))
        .orderBy(desc(contacts.createdAt));
    }
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContact(id: string): Promise<Contact | undefined> {
    const [row] = await db.select().from(contacts).where(eq(contacts.id, id));
    return row;
  }

  async updateContact(id: string, patch: UpdateContact): Promise<Contact | undefined> {
    const [row] = await db
      .update(contacts)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(contacts.id, id))
      .returning();
    return row;
  }

  async deleteContact(id: string): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }
}

// ── Export: use Neon in production, MemStorage in local dev ──

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();

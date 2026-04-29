import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertExitDiagnosisSchema,
  insertBuyerGuideRequestSchema,
  insertContactMessageSchema,
  insertPageViewSchema,
  insertOutreachMetricSchema,
  insertContactSchema,
  updateContactSchema,
} from "../shared/schema";

// ── Admin auth middleware ────────────────────────────────────

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token && token === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// ── Register all API routes ─────────────────────────────────

export function registerApiRoutes(app: Express) {
  // ── Public form endpoints ───────────────────────────────

  app.post("/api/exit-diagnosis", async (req, res) => {
    try {
      const validatedData = insertExitDiagnosisSchema.parse(req.body);
      const diagnosis = await storage.createExitDiagnosis(validatedData);
      console.log("Exit diagnosis submitted:", { email: diagnosis.email, companyName: diagnosis.companyName });
      res.json({
        success: true,
        message: "Exit-diagnos mottagen. Vi skickar en sammanfattning till din e-post inom 24 timmar.",
        id: diagnosis.id,
      });
    } catch (error) {
      console.error("Error creating exit diagnosis:", error);
      res.status(400).json({ success: false, message: "Kunde inte skicka diagnos. Kontrollera att alla fält är korrekt ifyllda." });
    }
  });

  app.post("/api/buyer-guide", async (req, res) => {
    try {
      const validatedData = insertBuyerGuideRequestSchema.parse(req.body);
      const request = await storage.createBuyerGuideRequest(validatedData);
      console.log("Buyer guide requested:", { email: request.email, name: request.name });
      res.json({
        success: true,
        message: "Säljarguiden är på väg! Vi skickar PDF:en till din e-post inom några minuter.",
        id: request.id,
      });
    } catch (error) {
      console.error("Error creating buyer guide request:", error);
      res.status(400).json({ success: false, message: "Kunde inte skicka förfrågan. Kontrollera att alla fält är korrekt ifyllda." });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      console.log("Contact message received:", { email: message.email, name: message.name });
      res.json({
        success: true,
        message: "Meddelande skickat! Vi hör av oss inom fyra timmar på vardagar.",
        id: message.id,
      });
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(400).json({ success: false, message: "Kunde inte skicka meddelande. Kontrollera att alla fält är korrekt ifyllda." });
    }
  });

  // ── Page view tracking (public, no auth) ────────────────

  app.post("/api/track", async (req, res) => {
    try {
      const validatedData = insertPageViewSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"] || null,
      });
      await storage.createPageView(validatedData);
      res.status(204).end();
    } catch (error) {
      // Silently ignore tracking errors — don't break the user experience
      res.status(204).end();
    }
  });

  // ── Admin: login ────────────────────────────────────────

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password && password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, token: process.env.ADMIN_PASSWORD });
    } else {
      res.status(401).json({ success: false, message: "Fel lösenord" });
    }
  });

  // ── Admin: protected endpoints ──────────────────────────

  // Analytics
  app.get("/api/admin/analytics", adminAuth, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const since = new Date(Date.now() - days * 86400000);
      const stats = await storage.getPageViewStats(since);
      const guideRequests = await storage.getBuyerGuideRequests();
      const exitDiagnoses = await storage.getExitDiagnoses();
      res.json({
        ...stats,
        guideDownloads: guideRequests.length,
        exitDiagnoses: exitDiagnoses.length,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/admin/analytics/timeseries", adminAuth, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await storage.getPageViewTimeseries(days);
      res.json(data);
    } catch (error) {
      console.error("Error fetching timeseries:", error);
      res.status(500).json({ error: "Failed to fetch timeseries" });
    }
  });

  app.get("/api/admin/analytics/top-pages", adminAuth, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const since = new Date(Date.now() - days * 86400000);
      const data = await storage.getTopPages(since, 10);
      res.json(data);
    } catch (error) {
      console.error("Error fetching top pages:", error);
      res.status(500).json({ error: "Failed to fetch top pages" });
    }
  });

  // Contact data
  app.get("/api/admin/exit-diagnoses", adminAuth, async (req, res) => {
    try {
      res.json(await storage.getExitDiagnoses());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exit diagnoses" });
    }
  });

  app.get("/api/admin/buyer-guide-requests", adminAuth, async (req, res) => {
    try {
      res.json(await storage.getBuyerGuideRequests());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch buyer guide requests" });
    }
  });

  app.get("/api/admin/contact-messages", adminAuth, async (req, res) => {
    try {
      res.json(await storage.getContactMessages());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  // Outreach metrics CRUD
  app.get("/api/admin/outreach-metrics", adminAuth, async (req, res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : undefined;
      const since = days ? new Date(Date.now() - days * 86400000) : undefined;
      res.json(await storage.getOutreachMetrics(since));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch outreach metrics" });
    }
  });

  app.post("/api/admin/outreach-metrics", adminAuth, async (req, res) => {
    try {
      const validatedData = insertOutreachMetricSchema.parse(req.body);
      const metric = await storage.createOutreachMetric(validatedData);
      res.json(metric);
    } catch (error) {
      console.error("Error creating outreach metric:", error);
      res.status(400).json({ error: "Invalid outreach metric data" });
    }
  });

  app.delete("/api/admin/outreach-metrics/:id", adminAuth, async (req, res) => {
    try {
      await storage.deleteOutreachMetric(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete outreach metric" });
    }
  });

  // ── Contacts (CRM) ──────────────────────────────────────

  app.get("/api/admin/contacts", adminAuth, async (req, res) => {
    try {
      const status = typeof req.query.status === "string" ? req.query.status : undefined;
      const list = await storage.getContacts(status ? { status } : undefined);
      res.json(list);
    } catch (error) {
      console.error("getContacts error:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.post("/api/admin/contacts", adminAuth, async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const created = await storage.createContact(data);
      res.json(created);
    } catch (error: any) {
      console.error("createContact error:", error);
      res.status(400).json({ error: error.message || "Invalid contact data" });
    }
  });

  app.patch("/api/admin/contacts/:id", adminAuth, async (req, res) => {
    try {
      const patch = updateContactSchema.parse(req.body);
      const updated = await storage.updateContact(req.params.id, patch);
      if (!updated) return res.status(404).json({ error: "Not found" });
      res.json(updated);
    } catch (error: any) {
      console.error("updateContact error:", error);
      res.status(400).json({ error: error.message || "Invalid contact data" });
    }
  });

  app.delete("/api/admin/contacts/:id", adminAuth, async (req, res) => {
    try {
      await storage.deleteContact(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  // ── Calendly proxy ──────────────────────────────────────

  let cachedUserUri: string | null = null;

  async function calendlyGet(path: string) {
    const token = process.env.CALENDLY_TOKEN;
    if (!token) throw new Error("CALENDLY_TOKEN not configured");
    const url = path.startsWith("http") ? path : `https://api.calendly.com${path}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Calendly ${response.status}: ${body}`);
    }
    return response.json();
  }

  async function getUserUri(): Promise<string> {
    if (cachedUserUri) return cachedUserUri;
    const data = await calendlyGet("/users/me");
    cachedUserUri = data.resource.uri;
    return cachedUserUri!;
  }

  app.get("/api/admin/calendly/events", adminAuth, async (req, res) => {
    try {
      const status = (req.query.status as string) || "active";
      const userUri = await getUserUri();

      const params = new URLSearchParams({
        user: userUri,
        status,
        sort: "start_time:asc",
        count: "50",
      });
      if (status === "active") {
        params.set("min_start_time", new Date().toISOString());
      }

      const events = await calendlyGet(`/scheduled_events?${params.toString()}`);

      // Fetch invitees for each event in parallel
      const eventsWithInvitees = await Promise.all(
        (events.collection ?? []).map(async (event: any) => {
          try {
            const invitees = await calendlyGet(`${event.uri}/invitees`);
            return { ...event, invitees: invitees.collection ?? [] };
          } catch {
            return { ...event, invitees: [] };
          }
        }),
      );

      res.json({ events: eventsWithInvitees });
    } catch (error: any) {
      console.error("Calendly error:", error);
      res.status(500).json({ error: error.message || "Failed to fetch events" });
    }
  });
}

// ── Register routes + create HTTP server (for local dev) ────

export async function registerRoutes(app: Express): Promise<Server> {
  registerApiRoutes(app);
  const httpServer = createServer(app);
  return httpServer;
}

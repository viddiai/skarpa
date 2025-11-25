import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertExitDiagnosisSchema,
  insertBuyerGuideRequestSchema,
  insertContactMessageSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Exit Diagnosis endpoint
  app.post("/api/exit-diagnosis", async (req, res) => {
    try {
      const validatedData = insertExitDiagnosisSchema.parse(req.body);
      const diagnosis = await storage.createExitDiagnosis(validatedData);
      
      // Log for demonstration (in production, this would send an email)
      console.log("Exit diagnosis submitted:", {
        email: diagnosis.email,
        companyName: diagnosis.companyName,
      });
      
      res.json({ 
        success: true, 
        message: "Exit-diagnos mottagen. Vi skickar en sammanfattning till din e-post inom 24 timmar.",
        id: diagnosis.id 
      });
    } catch (error) {
      console.error("Error creating exit diagnosis:", error);
      res.status(400).json({ 
        success: false, 
        message: "Kunde inte skicka diagnos. Kontrollera att alla fält är korrekt ifyllda." 
      });
    }
  });

  // Buyer Guide endpoint
  app.post("/api/buyer-guide", async (req, res) => {
    try {
      const validatedData = insertBuyerGuideRequestSchema.parse(req.body);
      const request = await storage.createBuyerGuideRequest(validatedData);
      
      // Log for demonstration (in production, this would send an email with PDF)
      console.log("Buyer guide requested:", {
        email: request.email,
        name: request.name,
      });
      
      res.json({ 
        success: true, 
        message: "Köparguiden är på väg! Vi skickar PDF:en till din e-post inom några minuter.",
        id: request.id 
      });
    } catch (error) {
      console.error("Error creating buyer guide request:", error);
      res.status(400).json({ 
        success: false, 
        message: "Kunde inte skicka förfrågan. Kontrollera att alla fält är korrekt ifyllda." 
      });
    }
  });

  // Contact Message endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // Log for demonstration (in production, this would send an email)
      console.log("Contact message received:", {
        email: message.email,
        name: message.name,
      });
      
      res.json({ 
        success: true, 
        message: "Meddelande skickat! Vi hör av oss inom fyra timmar på vardagar.",
        id: message.id 
      });
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(400).json({ 
        success: false, 
        message: "Kunde inte skicka meddelande. Kontrollera att alla fält är korrekt ifyllda." 
      });
    }
  });

  // Admin endpoints to view submissions (for demonstration)
  app.get("/api/admin/exit-diagnoses", async (req, res) => {
    try {
      const diagnoses = await storage.getExitDiagnoses();
      res.json(diagnoses);
    } catch (error) {
      console.error("Error fetching exit diagnoses:", error);
      res.status(500).json({ error: "Failed to fetch exit diagnoses" });
    }
  });

  app.get("/api/admin/buyer-guide-requests", async (req, res) => {
    try {
      const requests = await storage.getBuyerGuideRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching buyer guide requests:", error);
      res.status(500).json({ error: "Failed to fetch buyer guide requests" });
    }
  });

  app.get("/api/admin/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

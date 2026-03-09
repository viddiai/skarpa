import express from "express";
import type { Request, Response, NextFunction } from "express";
import { storage } from "../server/storage";
import {
  insertExitDiagnosisSchema,
  insertBuyerGuideRequestSchema,
  insertContactMessageSchema,
} from "../shared/schema";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Exit Diagnosis endpoint
app.post("/api/exit-diagnosis", async (req: Request, res: Response) => {
  try {
    const validatedData = insertExitDiagnosisSchema.parse(req.body);
    const diagnosis = await storage.createExitDiagnosis(validatedData);
    res.json({
      success: true,
      message:
        "Exit-diagnos mottagen. Vi skickar en sammanfattning till din e-post inom 24 timmar.",
      id: diagnosis.id,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        "Kunde inte skicka diagnos. Kontrollera att alla fält är korrekt ifyllda.",
    });
  }
});

// Buyer Guide endpoint
app.post("/api/buyer-guide", async (req: Request, res: Response) => {
  try {
    const validatedData = insertBuyerGuideRequestSchema.parse(req.body);
    const request = await storage.createBuyerGuideRequest(validatedData);
    res.json({
      success: true,
      message:
        "Säljarguiden är på väg! Vi skickar PDF:en till din e-post inom några minuter.",
      id: request.id,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        "Kunde inte skicka förfrågan. Kontrollera att alla fält är korrekt ifyllda.",
    });
  }
});

// Contact Message endpoint
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const validatedData = insertContactMessageSchema.parse(req.body);
    const message = await storage.createContactMessage(validatedData);
    res.json({
      success: true,
      message:
        "Meddelande skickat! Vi hör av oss inom fyra timmar på vardagar.",
      id: message.id,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        "Kunde inte skicka meddelande. Kontrollera att alla fält är korrekt ifyllda.",
    });
  }
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;

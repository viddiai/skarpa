import { 
  type User, 
  type InsertUser,
  type ExitDiagnosis,
  type InsertExitDiagnosis,
  type BuyerGuideRequest,
  type InsertBuyerGuideRequest,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private exitDiagnoses: Map<string, ExitDiagnosis>;
  private buyerGuideRequests: Map<string, BuyerGuideRequest>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.exitDiagnoses = new Map();
    this.buyerGuideRequests = new Map();
    this.contactMessages = new Map();
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
    this.exitDiagnoses.set(id, exitDiagnosis);
    return exitDiagnosis;
  }

  async getExitDiagnoses(): Promise<ExitDiagnosis[]> {
    return Array.from(this.exitDiagnoses.values());
  }

  async createBuyerGuideRequest(request: InsertBuyerGuideRequest): Promise<BuyerGuideRequest> {
    const id = randomUUID();
    const buyerGuideRequest: BuyerGuideRequest = {
      id,
      ...request,
      createdAt: new Date(),
    };
    this.buyerGuideRequests.set(id, buyerGuideRequest);
    return buyerGuideRequest;
  }

  async getBuyerGuideRequests(): Promise<BuyerGuideRequest[]> {
    return Array.from(this.buyerGuideRequests.values());
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      id,
      ...message,
      phone: message.phone ?? null,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();

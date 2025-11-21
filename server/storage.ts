import { 
  type Service, 
  type InsertService,
  type Vehicle,
  type InsertVehicle,
  type Testimonial,
  type InsertTestimonial,
  type QuoteRequest,
  type InsertQuoteRequest,
  type SchedulingRequest,
  type InsertSchedulingRequest,
  type ContactMessage,
  type InsertContactMessage,
  type VehicleOffer,
  type InsertVehicleOffer,
  type GalleryImage,
  type InsertGalleryImage,
  services,
  vehicles,
  testimonials,
  quoteRequests,
  schedulingRequests,
  contactMessages,
  vehicleOffers,
  galleryImages
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  getVehicles(): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
  
  createSchedulingRequest(request: InsertSchedulingRequest): Promise<SchedulingRequest>;
  getSchedulingRequests(): Promise<SchedulingRequest[]>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  createVehicleOffer(offer: InsertVehicleOffer): Promise<VehicleOffer>;
  getVehicleOffers(): Promise<VehicleOffer[]>;
  
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<void>;
}

export class DbStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async getVehicles(): Promise<Vehicle[]> {
    return await db.select().from(vehicles);
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    return vehicle;
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const [vehicle] = await db.insert(vehicles).values(insertVehicle).returning();
    return vehicle;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.date));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const [request] = await db.insert(quoteRequests).values(insertRequest).returning();
    return request;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
  }

  async createSchedulingRequest(insertRequest: InsertSchedulingRequest): Promise<SchedulingRequest> {
    const [request] = await db.insert(schedulingRequests).values(insertRequest).returning();
    return request;
  }

  async getSchedulingRequests(): Promise<SchedulingRequest[]> {
    return await db.select().from(schedulingRequests).orderBy(desc(schedulingRequests.createdAt));
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createVehicleOffer(insertOffer: InsertVehicleOffer): Promise<VehicleOffer> {
    const [offer] = await db.insert(vehicleOffers).values(insertOffer).returning();
    return offer;
  }

  async getVehicleOffers(): Promise<VehicleOffer[]> {
    return await db.select().from(vehicleOffers).orderBy(desc(vehicleOffers.createdAt));
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).orderBy(desc(galleryImages.displayOrder), desc(galleryImages.createdAt));
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const [image] = await db.insert(galleryImages).values(insertImage).returning();
    return image;
  }

  async deleteGalleryImage(id: number): Promise<void> {
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
  }
}

export const storage = new DbStorage();

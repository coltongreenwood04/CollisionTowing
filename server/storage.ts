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
  type InsertVehicleOffer
} from "@shared/schema";
import { randomUUID } from "crypto";

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
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private vehicles: Map<string, Vehicle>;
  private testimonials: Map<string, Testimonial>;
  private quoteRequests: Map<string, QuoteRequest>;
  private schedulingRequests: Map<string, SchedulingRequest>;
  private contactMessages: Map<string, ContactMessage>;
  private vehicleOffers: Map<string, VehicleOffer>;

  constructor() {
    this.services = new Map();
    this.vehicles = new Map();
    this.testimonials = new Map();
    this.quoteRequests = new Map();
    this.schedulingRequests = new Map();
    this.contactMessages = new Map();
    this.vehicleOffers = new Map();
    
    this.seedData();
  }

  private seedData() {
    const defaultServices: InsertService[] = [
      {
        name: "Emergency Towing",
        description: "24/7 emergency towing for all vehicle types. Fast response times to get you off the road quickly.",
        basePrice: "Starting at $75",
        icon: "truck"
      },
      {
        name: "Roadside Assistance",
        description: "Battery jumps, tire changes, lockouts, and fuel delivery available anytime.",
        basePrice: "Starting at $50",
        icon: "wrench"
      },
      {
        name: "Accident Recovery",
        description: "Professional accident scene management and vehicle recovery services.",
        basePrice: "Call for quote",
        icon: "shield"
      }
    ];

    defaultServices.forEach(service => {
      const id = randomUUID();
      this.services.set(id, { ...service, id });
    });

    const defaultTestimonials: InsertTestimonial[] = [
      {
        customerName: "John Smith",
        rating: 5,
        comment: "Fast response time and professional service! They got my car off the highway in less than 30 minutes. Highly recommend!",
        source: "Google"
      },
      {
        customerName: "Sarah Johnson",
        rating: 5,
        comment: "Excellent towing service. The driver was courteous and took great care with my vehicle. Fair pricing too.",
        source: "Facebook"
      },
      {
        customerName: "Mike Davis",
        rating: 5,
        comment: "Called them at 2 AM for a tow and they were there quickly. Very professional and helpful during a stressful situation.",
        source: "Google"
      },
      {
        customerName: "Lisa Martinez",
        rating: 5,
        comment: "Great experience with their roadside assistance. Battery died at work and they came within 20 minutes to jump start it.",
        source: "Google"
      },
      {
        customerName: "Robert Taylor",
        rating: 4,
        comment: "Good service overall. Driver was friendly and got the job done. Would use again.",
        source: "Facebook"
      },
      {
        customerName: "Emily Wilson",
        rating: 5,
        comment: "Best towing company in the area! They've helped me twice now and both times were excellent experiences.",
        source: "Google"
      }
    ];

    defaultTestimonials.forEach(testimonial => {
      const id = randomUUID();
      this.testimonials.set(id, { 
        ...testimonial, 
        id, 
        date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      });
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  async getVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = randomUUID();
    const vehicle: Vehicle = { ...insertVehicle, id };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      date: new Date() 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = randomUUID();
    const request: QuoteRequest = { 
      ...insertRequest, 
      id, 
      createdAt: new Date(),
      status: "pending"
    };
    this.quoteRequests.set(id, request);
    return request;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createSchedulingRequest(insertRequest: InsertSchedulingRequest): Promise<SchedulingRequest> {
    const id = randomUUID();
    const request: SchedulingRequest = { 
      ...insertRequest, 
      id, 
      createdAt: new Date(),
      status: "pending"
    };
    this.schedulingRequests.set(id, request);
    return request;
  }

  async getSchedulingRequests(): Promise<SchedulingRequest[]> {
    return Array.from(this.schedulingRequests.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      status: "unread"
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createVehicleOffer(insertOffer: InsertVehicleOffer): Promise<VehicleOffer> {
    const id = randomUUID();
    const offer: VehicleOffer = { 
      ...insertOffer, 
      id, 
      createdAt: new Date(),
      status: "pending"
    };
    this.vehicleOffers.set(id, offer);
    return offer;
  }

  async getVehicleOffers(): Promise<VehicleOffer[]> {
    return Array.from(this.vehicleOffers.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();

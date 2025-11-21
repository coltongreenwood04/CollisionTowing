import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertServiceSchema,
  insertVehicleSchema,
  insertTestimonialSchema,
  insertQuoteRequestSchema,
  insertSchedulingRequestSchema,
  insertContactMessageSchema,
  insertVehicleOfferSchema,
  insertGalleryImageSchema
} from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validated = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validated);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data" });
    }
  });

  app.get("/api/vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getVehicles();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  });

  app.get("/api/vehicles/:id", async (req, res) => {
    try {
      const vehicle = await storage.getVehicle(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicle" });
    }
  });

  app.post("/api/vehicles", async (req, res) => {
    try {
      const validated = insertVehicleSchema.parse(req.body);
      const vehicle = await storage.createVehicle(validated);
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Invalid vehicle data" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validated = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validated);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.post("/api/quotes", async (req, res) => {
    try {
      const validated = insertQuoteRequestSchema.parse(req.body);
      const quote = await storage.createQuoteRequest(validated);
      
      console.log("Quote request received:", {
        name: quote.name,
        phone: quote.phone,
        serviceType: quote.serviceType,
        location: quote.location
      });
      
      res.status(201).json(quote);
    } catch (error) {
      console.error("Quote request error:", error);
      res.status(400).json({ error: "Invalid quote request data" });
    }
  });

  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuoteRequests();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quote requests" });
    }
  });

  app.post("/api/scheduling", async (req, res) => {
    try {
      const validated = insertSchedulingRequestSchema.parse(req.body);
      const scheduling = await storage.createSchedulingRequest(validated);
      
      console.log("Scheduling request received:", {
        name: scheduling.name,
        phone: scheduling.phone,
        serviceType: scheduling.serviceType,
        preferredDate: scheduling.preferredDate,
        preferredTime: scheduling.preferredTime,
        location: scheduling.location
      });
      
      res.status(201).json(scheduling);
    } catch (error) {
      console.error("Scheduling request error:", error);
      res.status(400).json({ error: "Invalid scheduling request data" });
    }
  });

  app.get("/api/scheduling", async (req, res) => {
    try {
      const requests = await storage.getSchedulingRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scheduling requests" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validated = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validated);
      
      console.log("Contact message received:", {
        name: message.name,
        email: message.email,
        subject: message.subject
      });
      
      res.status(201).json(message);
    } catch (error) {
      console.error("Contact message error:", error);
      res.status(400).json({ error: "Invalid contact message data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  app.post("/api/vehicle-offers", async (req, res) => {
    try {
      const validated = insertVehicleOfferSchema.parse(req.body);
      const offer = await storage.createVehicleOffer(validated);
      
      console.log("Vehicle offer received:", {
        vehicleId: offer.vehicleId,
        name: offer.name,
        phone: offer.phone,
        offerAmount: offer.offerAmount
      });
      
      res.status(201).json(offer);
    } catch (error) {
      console.error("Vehicle offer error:", error);
      res.status(400).json({ error: "Invalid vehicle offer data" });
    }
  });

  app.get("/api/vehicle-offers", async (req, res) => {
    try {
      const offers = await storage.getVehicleOffers();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicle offers" });
    }
  });

  app.get("/api/gallery-images", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery-images/upload-url", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  app.post("/api/gallery-images", async (req, res) => {
    try {
      const { imageUrl, title, category, displayOrder } = req.body;
      if (!imageUrl) {
        return res.status(400).json({ error: "imageUrl is required" });
      }

      const objectStorageService = new ObjectStorageService();
      const normalizedPath = objectStorageService.normalizeObjectEntityPath(imageUrl);

      const validated = insertGalleryImageSchema.parse({
        imageUrl: normalizedPath,
        title: title || "Gallery Image",
        category: category || "general",
        displayOrder: displayOrder || 0,
      });

      const image = await storage.createGalleryImage(validated);
      res.status(201).json(image);
    } catch (error) {
      console.error("Error creating gallery image:", error);
      res.status(400).json({ error: "Invalid gallery image data" });
    }
  });

  app.delete("/api/gallery-images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGalleryImage(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });

  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error serving object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

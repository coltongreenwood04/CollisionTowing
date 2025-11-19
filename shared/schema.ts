import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  basePrice: text("base_price").notNull(),
  icon: text("icon").notNull(),
});

export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  price: integer("price").notNull(),
  mileage: integer("mileage").notNull(),
  condition: text("condition").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  status: text("status").notNull().default("available"),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  source: text("source"),
});

export const quoteRequests = pgTable("quote_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  serviceType: text("service_type").notNull(),
  location: text("location").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("pending"),
});

export const schedulingRequests = pgTable("scheduling_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  serviceType: text("service_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  location: text("location").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("pending"),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("unread"),
});

export const vehicleOffers = pgTable("vehicle_offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  offerAmount: integer("offer_amount").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("pending"),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  date: true,
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertSchedulingRequestSchema = createInsertSchema(schedulingRequests).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertVehicleOfferSchema = createInsertSchema(vehicleOffers).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;

export type SchedulingRequest = typeof schedulingRequests.$inferSelect;
export type InsertSchedulingRequest = z.infer<typeof insertSchedulingRequestSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type VehicleOffer = typeof vehicleOffers.$inferSelect;
export type InsertVehicleOffer = z.infer<typeof insertVehicleOfferSchema>;

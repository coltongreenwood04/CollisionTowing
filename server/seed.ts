import { db } from "./db";
import { services, type InsertService } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Check if services already exist
  const existingServices = await db.select().from(services);
  
  if (existingServices.length > 0) {
    console.log("Services already seeded, skipping...");
    return;
  }

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

  await db.insert(services).values(defaultServices);
  console.log("✓ Seeded 3 default services");
}

seed()
  .then(() => {
    console.log("✓ Database seeding complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("✗ Seeding failed:", error);
    process.exit(1);
  });

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuoteButton } from "@/components/QuoteButton";
import { Truck, Wrench, Shield, Battery, Key, Fuel, Car, AlertCircle, Clock } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: "Emergency Towing",
      description: "24/7 emergency towing for cars, trucks, and SUVs. Fast response times to get you off the road quickly and safely.",
      features: ["Flatbed towing", "Wheel lift towing", "Long distance towing", "Motorcycle towing"],
      basePrice: "Starting at $75"
    },
    {
      icon: Shield,
      title: "Accident Recovery",
      description: "Professional accident scene management and vehicle recovery. We work with insurance companies to make the process smooth.",
      features: ["Scene management", "Multi-vehicle recovery", "Heavy-duty recovery", "Insurance coordination"],
      basePrice: "Call for quote"
    },
    {
      icon: Wrench,
      title: "Roadside Assistance",
      description: "Quick roadside help when you need it most. We'll get you back on the road or safely towed to a repair facility.",
      features: ["Tire changes", "Battery jumps", "Lockout service", "Fuel delivery"],
      basePrice: "Starting at $50"
    },
    {
      icon: Battery,
      title: "Jump Starts",
      description: "Dead battery? We'll come to your location and get your vehicle started quickly.",
      features: ["Fast response", "Professional service", "Battery testing", "Jump start service"],
      basePrice: "$50"
    },
    {
      icon: Key,
      title: "Lockout Service",
      description: "Locked out of your vehicle? Our team can safely unlock your car without damage.",
      features: ["Non-damage entry", "All vehicle types", "Fast service", "Professional technicians"],
      basePrice: "$60"
    },
    {
      icon: Fuel,
      title: "Fuel Delivery",
      description: "Run out of gas? We'll bring fuel directly to your location to get you moving again.",
      features: ["Gasoline delivery", "Diesel delivery", "Quick response", "Convenient service"],
      basePrice: "$65"
    },
    {
      icon: Car,
      title: "Vehicle Transport",
      description: "Safe, reliable vehicle transportation for any distance. Perfect for vehicle purchases or relocations.",
      features: ["Local transport", "Long distance", "Enclosed transport", "Door-to-door service"],
      basePrice: "Call for quote"
    },
    {
      icon: AlertCircle,
      title: "Impound Services",
      description: "Professional impound and storage services. Secure yard facility with 24/7 access coordination.",
      features: ["Secure storage", "Yard #10557", "Vehicle release", "Insurance claims"],
      basePrice: "Call for quote"
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive towing and roadside assistance services available 24/7
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">24/7 Emergency Service Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-service-${index}`}>
              <CardHeader>
                <div className="rounded-md bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-semibold text-primary">{service.basePrice}</span>
                  <QuoteButton variant="ghost" size="sm" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Service Right Now?</h2>
            <p className="text-lg mb-6 opacity-90">
              Call us for immediate assistance. We're available 24/7 for emergencies.
            </p>
            <a href="tel:801-946-9531" className="inline-block" data-testid="link-call-services">
              <span className="text-3xl font-bold hover:opacity-80 transition-opacity">
                801-946-9531
              </span>
            </a>
          </CardContent>
        </Card>

        <div className="mt-12 bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Service Area</h2>
          <p className="text-center text-muted-foreground mb-4">
            We proudly serve Murray, UT and surrounding areas including:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Murray", "West Jordan", "South Jordan", "Sandy", "Midvale", "Taylorsville", "Draper", "Riverton"].map((city, index) => (
              <div key={index} className="text-center p-3 bg-accent rounded-md">
                <span className="font-medium">{city}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Service available throughout Salt Lake County and surrounding areas
          </p>
        </div>
      </div>
    </div>
  );
}

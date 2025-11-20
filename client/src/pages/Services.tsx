import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuoteButton } from "@/components/QuoteButton";
import { Truck, Wrench, Shield, Battery, Key, Fuel, Car, AlertCircle, Clock, Zap, Settings, Trophy } from "lucide-react";

export default function Services() {
  useEffect(() => {
    document.title = "Towing Services & Pricing | Collision Towing - Northern Utah";
  }, []);
  const services = [
    {
      icon: Truck,
      title: "Towing Services",
      description: "24/7 flatbed towing for all vehicle types including exotic cars, electric vehicles, and lowered vehicles. Professional service to safely transport your vehicle.",
      features: [
        "Service fee: $75.00 (all services)",
        "Towed miles: $5.00/mile",
        "Exotic cars • Electric cars • Lowered vehicles",
        "En route: $2.00/mile (if pickup >30 min away)",
        "Deadhead: $1.00/mile (out of area drop-off)"
      ],
      basePrice: "$75 service fee"
    },
    {
      icon: Battery,
      title: "Jump Start",
      description: "Dead battery? We'll come to your location and get your vehicle started quickly and safely.",
      features: [
        "Service fee: $75.00",
        "Professional battery testing",
        "Fast response times",
        "En route: $2.00/mile (if >30 min away)"
      ],
      basePrice: "$75 service fee"
    },
    {
      icon: Wrench,
      title: "Spare Tire Service",
      description: "Flat tire? We'll install your spare tire and get you back on the road safely.",
      features: [
        "Service fee: $75.00",
        "Professional tire change",
        "Safe installation",
        "En route: $2.00/mile (if >30 min away)"
      ],
      basePrice: "$75 service fee"
    },
    {
      icon: Key,
      title: "Lockout Service",
      description: "Locked out of your vehicle? Our team can safely unlock your car without causing any damage.",
      features: [
        "Service fee: $75.00",
        "Non-damage entry",
        "All vehicle types",
        "En route: $2.00/mile (if >30 min away)"
      ],
      basePrice: "$75 service fee"
    },
    {
      icon: Shield,
      title: "Winch Outs",
      description: "Vehicle stuck or off-road? Professional winch-out and recovery services to get you back on solid ground.",
      features: [
        "Service fee: $75.00",
        "Professional recovery",
        "Safe extraction",
        "En route: $2.00/mile (if >30 min away)"
      ],
      basePrice: "$75 service fee"
    },
    {
      icon: Fuel,
      title: "Fuel Delivery",
      description: "Run out of gas? We'll bring fuel directly to your location to get you moving again.",
      features: [
        "Service fee: $75.00 + fuel cost",
        "Gasoline delivery",
        "Diesel delivery",
        "En route: $2.00/mile (if >30 min away)"
      ],
      basePrice: "$75 + fuel"
    },
    {
      icon: AlertCircle,
      title: "Police & Private Property Tows",
      description: "State-mandated rates for police-initiated tows and private property violations.",
      features: [
        "Utah Highway Patrol (Salt Lake & Weber)",
        "Unified Police Department (Midvale)",
        "Private property enforcement",
        "See state rate chart for details"
      ],
      basePrice: "State rates apply"
    },
    {
      icon: Car,
      title: "Impound & Storage",
      description: "Secure vehicle storage with 24/7 access coordination at our Murray yard location.",
      features: [
        "Secure storage yards",
        "Murray Yard #10557",
        "Vehicle release coordination",
        "Insurance claims assistance"
      ],
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

        <div className="mb-12 bg-card rounded-lg p-8 border-2 border-primary/20">
          <h2 className="text-2xl font-bold mb-6 text-center">Specialty Vehicle Handling</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our modern flatbed tow trucks are equipped to safely transport specialty and high-value vehicles with professional care
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover-elevate">
              <div className="rounded-md bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Exotic Cars</h3>
              <p className="text-sm text-muted-foreground">
                Safe flatbed transport for luxury and exotic vehicles
              </p>
            </Card>
            <Card className="p-6 text-center hover-elevate">
              <div className="rounded-md bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Electric Vehicles</h3>
              <p className="text-sm text-muted-foreground">
                Specialized handling for EVs and hybrid vehicles
              </p>
            </Card>
            <Card className="p-6 text-center hover-elevate">
              <div className="rounded-md bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Lowered Vehicles</h3>
              <p className="text-sm text-muted-foreground">
                Careful loading for modified and lowered cars
              </p>
            </Card>
          </div>
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Service Right Now?</h2>
            <p className="text-lg mb-6 opacity-90">
              Call us for immediate assistance. We're available 24/7 for emergencies.
            </p>
            <a href="tel:801-946-6531" className="inline-block" data-testid="link-call-services">
              <span className="text-3xl font-bold hover:opacity-80 transition-opacity">
                801-946-6531
              </span>
            </a>
          </CardContent>
        </Card>

        <div className="mt-12 bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Service Coverage Area</h2>
          <p className="text-center text-muted-foreground mb-6">
            We proudly serve Northern Utah with multiple office and yard locations:
          </p>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-accent rounded-md">
                <div className="font-bold mb-1">Main Office</div>
                <div className="text-sm text-muted-foreground">Eden, Utah</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-md">
                <div className="font-bold mb-1">Central Office</div>
                <div className="text-sm text-muted-foreground">West Jordan, Utah</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-md">
                <div className="font-bold mb-1">Ogden Office</div>
                <div className="text-sm text-muted-foreground">Ogden, Utah</div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="font-semibold mb-2">Storage Yards</div>
              <div className="text-sm text-muted-foreground">Murray (Yard #10557) • West Jordan • Ogden</div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-center">Counties Served</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {["Weber County", "Morgan County", "Salt Lake County", "Davis County", "Box Elder County", "Utah County", "Tooele County", "Cache County", "Summit County"].map((county, index) => (
                <div key={index} className="text-center p-3 bg-primary/10 rounded-md">
                  <span className="font-medium text-sm">{county}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            On rotation for Utah Highway Patrol (Salt Lake & Weber Counties) and Unified Police Department (Midvale)
          </p>
        </div>
      </div>
    </div>
  );
}

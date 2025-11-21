import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, Shield, Truck, Wrench, Star, FileText, Mail } from "lucide-react";
import { QuoteButton } from "@/components/QuoteButton";
import { Link } from "wouter";
import heroImageUrl from "@assets/IMG_4684_1763592546577.jpg";

export default function Home() {
  useEffect(() => {
    document.title = "Collision Towing - 24/7 Professional Towing Services | Northern Utah";
  }, []);
  const services = [
    {
      icon: Truck,
      title: "Towing Services",
      description: "24/7 flatbed towing including exotic cars, electric vehicles, and lowered vehicles.",
      price: "$75 service fee"
    },
    {
      icon: Wrench,
      title: "Roadside Assistance",
      description: "Battery jumps, lockouts, tire changes, and fuel delivery.",
      price: "$75 service fee"
    },
    {
      icon: Shield,
      title: "Accident Recovery",
      description: "Professional accident scene management and vehicle recovery.",
      price: "$75 service fee"
    },
  ];

  const trustBadges = [
    { icon: Shield, text: "Licensed & Insured" },
    { icon: Clock, text: "24/7 Available" },
    { icon: Star, text: "Multiple Locations" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImageUrl} 
            alt="Collision Towing truck" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-sm px-4 py-1" data-testid="badge-emergency">
            <Clock className="h-3 w-3 mr-1" />
            24/7 Emergency Service
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Fast, Reliable Towing
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto text-gray-100">
            Professional towing and roadside assistance serving Northern Utah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:801-946-6531" data-testid="link-call-hero">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-primary/90 backdrop-blur-sm hover:bg-primary border-primary-border">
                <Phone className="h-5 w-5" />
                Call Now: 801-946-6531
              </Button>
            </a>
            <Link href="/contact?tab=quote" data-testid="link-quote-hero">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 bg-background/10 backdrop-blur-sm border-2 text-white hover:bg-background/20">
                <FileText className="h-5 w-5" />
                Request Quote
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mt-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm sm:text-base bg-background/10 backdrop-blur-sm px-4 py-2 rounded-md">
                <badge.icon className="h-4 w-4 text-primary" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive towing and roadside assistance for all your vehicle needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-service-${index}`}>
                <CardContent className="p-6">
                  <div className="rounded-md bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{service.price}</span>
                    <QuoteButton variant="ghost" size="sm" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services" data-testid="link-all-services">
              <Button size="lg" variant="outline">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Collision Towing?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="rounded-md bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">24/7 Availability</h3>
                    <p className="text-muted-foreground">We're here when you need us most, day or night.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-md bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Licensed & Insured</h3>
                    <p className="text-muted-foreground">Fully licensed and insured for your peace of mind.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-md bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Modern Equipment</h3>
                    <p className="text-muted-foreground">State-of-the-art tow trucks and recovery equipment.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-md bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Experienced Team</h3>
                    <p className="text-muted-foreground">Professional drivers with years of towing experience.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Call Us</div>
                    <a href="tel:801-946-6531" className="text-lg text-primary hover:underline" data-testid="link-call-contact">
                      801-946-6531
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Email Us</div>
                    <a href="mailto:collisiontow2018@gmail.com" className="text-sm text-primary hover:underline break-all" data-testid="link-email-contact">
                      collisiontow2018@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Locations</div>
                    <div className="text-muted-foreground">
                      Main Office: Eden, UT<br />
                      Offices: West Jordan, Ogden<br />
                      Yards: West Jordan #10950 • Murray #10557 • Ogden #10717
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Hours</div>
                    <div className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      <span className="font-medium text-foreground">24/7 Emergency Service Available</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/contact" className="mt-6 block" data-testid="link-contact-page">
                <Button className="w-full" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Need a Tow Right Now?</h2>
          <p className="text-xl mb-8 opacity-90">
            Call us immediately for fast, professional service
          </p>
          <a href="tel:801-946-6531" data-testid="link-call-cta">
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90 border-2">
              <Phone className="h-5 w-5" />
              801-946-6531
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}

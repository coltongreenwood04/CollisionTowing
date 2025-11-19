import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import img1 from "@assets/IMG_4997_1763592537277.jpg";
import img2 from "@assets/IMG_4684_1763592546577.jpg";
import img3 from "@assets/IMG_5149_1763592564229.jpg";
import img4 from "@assets/IMG_5332_1763592568261.jpg";
import img5 from "@assets/IMG_5331_1763592571944.jpg";
import img6 from "@assets/IMG_5152_1763592578262.jpg";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: img1,
      title: "Ford F-550 Tow Truck",
      category: "Equipment"
    },
    {
      src: img2,
      title: "Flatbed Towing Service",
      category: "Flatbed Towing"
    },
    {
      src: img3,
      title: "Luxury Vehicle Transport",
      category: "Vehicle Transport"
    },
    {
      src: img4,
      title: "Exotic Car Recovery",
      category: "Accident Recovery"
    },
    {
      src: img5,
      title: "Professional Vehicle Transport",
      category: "Vehicle Transport"
    },
    {
      src: img6,
      title: "Classic Car Towing",
      category: "Specialty Towing"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a look at our professional towing and recovery services in action
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card 
                  className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 group"
                  onClick={() => setSelectedImage(image.src)}
                  data-testid={`card-gallery-${index}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{image.title}</h3>
                    <Badge variant="secondary">{image.category}</Badge>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-4">
                  <h3 className="font-bold text-xl mb-2">{image.title}</h3>
                  <Badge>{image.category}</Badge>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Professional Equipment & Service</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our fleet includes modern flatbed tow trucks, wheel-lift trucks, and specialized equipment to handle any towing or recovery situation safely and efficiently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Emergency Service</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Licensed & Insured</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

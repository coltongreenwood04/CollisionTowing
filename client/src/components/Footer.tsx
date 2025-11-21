import { Link } from "wouter";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Collision Towing</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Professional towing and roadside assistance serving Northern Utah. Licensed, insured, and ready to help 24/7.
            </p>
            <p className="text-sm text-muted-foreground">
              Serving 9 counties across Northern Utah
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              <Link href="/services" data-testid="link-footer-services">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Services</span>
              </Link>
              <Link href="/gallery" data-testid="link-footer-gallery">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Gallery</span>
              </Link>
              <Link href="/reviews" data-testid="link-footer-reviews">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Reviews</span>
              </Link>
              <Link href="/contact" data-testid="link-footer-contact">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Contact</span>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <a href="tel:801-946-6531" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-footer-phone">
                    801-946-6531
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <a href="mailto:collisiontow2018@gmail.com" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-footer-email">
                    collisiontow2018@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium text-foreground">Main Office:</div>
                  <div>Eden, Utah</div>
                  <div className="mt-2 font-medium text-foreground">Central Yards:</div>
                  <div className="font-medium text-foreground mt-1">West Jordan (Yard #10950):</div>
                  <div>8415 S 4300 W, West Jordan, UT</div>
                  <div className="font-medium text-foreground mt-1">Ogden (Yard #10557):</div>
                  <div>3275 Wall Ave, Ogden, UT 84401</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <div>Monday - Friday</div>
                  <div>8:00 AM - 5:00 PM</div>
                  <div className="mt-1 font-medium text-foreground">24/7 Emergency Service</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Service Areas</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Weber, Morgan, Salt Lake, Davis, Box Elder, Utah, Tooele, Cache, and Summit counties.
            </p>
            <p className="text-xs text-muted-foreground">
              On rotation for Utah Highway Patrol (Salt Lake & Weber) and Unified Police Department (Midvale).
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Collision Towing. All rights reserved. Licensed & Insured.</p>
        </div>
      </div>
    </footer>
  );
}

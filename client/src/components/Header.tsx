import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import logoUrl from "@assets/IMG_0829_1763594190440.jpeg";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1 -ml-2" data-testid="link-home" aria-label="Home - Collision Towing">
            <img src={logoUrl} alt="Collision Towing Logo" className="h-16 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="font-medium"
                  aria-current={location === link.href ? "page" : undefined}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:801-946-6531" className="hidden sm:block" data-testid="link-call-header" aria-label="Call Collision Towing at 801-946-6531">
              <Button variant="default" className="gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="font-semibold">801-946-6531</span>
              </Button>
            </a>
            <a href="tel:801-946-6531" className="sm:hidden" data-testid="link-call-header-mobile" aria-label="Call Collision Towing">
              <Button variant="default" size="icon">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav id="mobile-menu" className="lg:hidden border-t py-4 flex flex-col gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-mobile-${link.label.toLowerCase()}`}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={location === link.href ? "page" : undefined}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

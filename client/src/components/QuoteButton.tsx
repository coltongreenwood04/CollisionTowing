import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "wouter";

interface QuoteButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function QuoteButton({ variant = "outline", size = "default", className = "" }: QuoteButtonProps) {
  return (
    <Link href="/contact?tab=quote" data-testid="link-quote">
      <Button variant={variant} size={size} className={`gap-2 ${className}`}>
        <FileText className="h-4 w-4" />
        Request Quote
      </Button>
    </Link>
  );
}

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileCallButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t p-3 shadow-lg">
      <a href="tel:801-946-9531" className="block" data-testid="link-call-mobile-fixed">
        <Button size="lg" className="w-full gap-2 text-base font-semibold">
          <Phone className="h-5 w-5" />
          Call Now: 801-946-9531
        </Button>
      </a>
    </div>
  );
}

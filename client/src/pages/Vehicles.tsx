import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertVehicleOfferSchema, type Vehicle, type InsertVehicleOffer } from "@shared/schema";
import { Car, Phone, Mail, DollarSign } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Vehicles() {
  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const availableVehicles = vehicles?.filter(v => v.status === "available") || [];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Vehicles for Sale</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality pre-owned vehicles from our impound yard. All vehicles sold as-is.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-md" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : availableVehicles.length === 0 ? (
          <Card className="p-12 text-center">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Vehicles Currently Available</h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for new inventory, or contact us for upcoming vehicles.
            </p>
            <a href="tel:801-946-6531" data-testid="link-call-vehicles">
              <Button className="gap-2">
                <Phone className="h-4 w-4" />
                Call Us: 801-946-6531
              </Button>
            </a>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Important Information</h2>
          <div className="space-y-3 text-muted-foreground max-w-3xl mx-auto">
            <p>• All vehicles are sold as-is with no warranty</p>
            <p>• Vehicles may require repairs or maintenance</p>
            <p>• Title status and history available upon request</p>
            <p>• In-person inspection recommended before purchase</p>
            <p>• Cash or certified check accepted</p>
            <p className="pt-4 text-center font-medium text-foreground">
              Contact us at <a href="tel:801-946-6531" className="text-primary hover:underline">801-946-6531</a> for more information
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertVehicleOffer>({
    resolver: zodResolver(insertVehicleOfferSchema),
    defaultValues: {
      vehicleId: vehicle.id,
      name: "",
      phone: "",
      email: "",
      offerAmount: vehicle.price,
      message: "",
    },
  });

  const offerMutation = useMutation({
    mutationFn: async (data: InsertVehicleOffer) => {
      return await apiRequest("POST", "/api/vehicle-offers", data);
    },
    onSuccess: () => {
      toast({
        title: "Offer Submitted!",
        description: "We'll review your offer and contact you soon.",
      });
      setDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit offer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertVehicleOffer) => {
    offerMutation.mutate(data);
  };

  return (
    <Card className="hover-elevate" data-testid={`card-vehicle-${index}`}>
      <div className="aspect-[3/2] overflow-hidden rounded-t-md">
        <img 
          src={vehicle.imageUrl} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </CardTitle>
          <Badge variant="secondary">{vehicle.condition}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Mileage:</span>
            <span className="font-medium">{vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{vehicle.description}</p>
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-2xl font-bold text-primary">
              ${vehicle.price.toLocaleString()}
            </span>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="gap-2" data-testid={`button-make-offer-${index}`}>
                  <DollarSign className="h-4 w-4" />
                  Make Offer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Make an Offer</DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                  <p className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                  <p className="text-sm text-muted-foreground">Asking: ${vehicle.price.toLocaleString()}</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-offer-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 555-5555" {...field} data-testid="input-offer-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} data-testid="input-offer-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="offerAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Offer Amount *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter your offer" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              data-testid="input-offer-amount"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any additional details..." {...field} data-testid="input-offer-message" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={offerMutation.isPending} data-testid="button-submit-offer">
                      {offerMutation.isPending ? "Submitting..." : "Submit Offer"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

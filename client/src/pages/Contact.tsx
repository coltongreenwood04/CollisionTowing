import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertQuoteRequestSchema, insertSchedulingRequestSchema, insertContactMessageSchema, type InsertQuoteRequest, type InsertSchedulingRequest, type InsertContactMessage } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useLocation } from "wouter";

export default function Contact() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("contact");
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "quote" || tab === "schedule") {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch for towing services, quotes, or general inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="rounded-md bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <a href="tel:801-946-9531" className="text-primary hover:underline text-lg font-medium" data-testid="link-call-contact-card">
                801-946-9531
              </a>
              <p className="text-sm text-muted-foreground mt-2">24/7 Emergency Service</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="rounded-md bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-muted-foreground">
                5662 S. 300 W.<br />
                Murray, UT 84107
              </p>
              <p className="text-sm text-muted-foreground mt-2">Yard #10557</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="rounded-md bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-muted-foreground">
                Mon-Fri: 8:00 AM - 5:00 PM
              </p>
              <p className="text-sm font-medium text-foreground mt-2">24/7 Emergency Towing</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact" data-testid="tab-contact">Contact Form</TabsTrigger>
            <TabsTrigger value="quote" data-testid="tab-quote">Request Quote</TabsTrigger>
            <TabsTrigger value="schedule" data-testid="tab-schedule">Schedule Service</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <ContactForm toast={toast} />
          </TabsContent>

          <TabsContent value="quote">
            <QuoteForm toast={toast} />
          </TabsContent>

          <TabsContent value="schedule">
            <SchedulingForm toast={toast} />
          </TabsContent>
        </Tabs>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.8!2d-111.9!3d40.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM4JzI2LjQiTiAxMTHCsDU0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md"
                ></iframe>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Central Office: 8415 S. 4300 W., West Jordan, UT 84088</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ContactForm({ toast }: { toast: any }) {
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} data-testid="input-contact-name" />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} data-testid="input-contact-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 555-5555" {...field} data-testid="input-contact-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject *</FormLabel>
                    <FormControl>
                      <Input placeholder="What is this about?" {...field} data-testid="input-contact-subject" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message..." rows={6} {...field} data-testid="input-contact-message" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full gap-2" disabled={mutation.isPending} data-testid="button-submit-contact">
              <Send className="h-4 w-4" />
              {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function QuoteForm({ toast }: { toast: any }) {
  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      location: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      return await apiRequest("POST", "/api/quotes", data);
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Received!",
        description: "We'll contact you shortly with a quote.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} data-testid="input-quote-name" />
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
                      <Input placeholder="(555) 555-5555" {...field} data-testid="input-quote-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} data-testid="input-quote-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-quote-service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="towing">Emergency Towing</SelectItem>
                      <SelectItem value="roadside">Roadside Assistance</SelectItem>
                      <SelectItem value="accident">Accident Recovery</SelectItem>
                      <SelectItem value="transport">Vehicle Transport</SelectItem>
                      <SelectItem value="impound">Impound Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="Where do you need service?" {...field} data-testid="input-quote-location" />
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
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any other information that will help us provide an accurate quote..." rows={4} {...field} data-testid="input-quote-message" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full gap-2" disabled={mutation.isPending} data-testid="button-submit-quote">
              <Send className="h-4 w-4" />
              {mutation.isPending ? "Submitting..." : "Request Quote"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function SchedulingForm({ toast }: { toast: any }) {
  const form = useForm<InsertSchedulingRequest>({
    resolver: zodResolver(insertSchedulingRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      location: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertSchedulingRequest) => {
      return await apiRequest("POST", "/api/scheduling", data);
    },
    onSuccess: () => {
      toast({
        title: "Scheduling Request Received!",
        description: "We'll contact you to confirm your appointment.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit scheduling request. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Service</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} data-testid="input-schedule-name" />
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
                      <Input placeholder="(555) 555-5555" {...field} data-testid="input-schedule-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} data-testid="input-schedule-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-schedule-service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="towing">Towing</SelectItem>
                      <SelectItem value="roadside">Roadside Assistance</SelectItem>
                      <SelectItem value="transport">Vehicle Transport</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-schedule-date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-schedule-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                        <SelectItem value="asap">ASAP / Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="Where do you need service?" {...field} data-testid="input-schedule-location" />
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
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any other information..." rows={4} {...field} data-testid="input-schedule-message" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full gap-2" disabled={mutation.isPending} data-testid="button-submit-schedule">
              <Send className="h-4 w-4" />
              {mutation.isPending ? "Submitting..." : "Request Scheduling"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

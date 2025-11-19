import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { type Testimonial } from "@shared/schema";

export default function Reviews() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating = testimonials?.length
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about our towing and roadside assistance services
          </p>
          {testimonials && testimonials.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <div className="text-3xl font-bold">{averageRating}</div>
              <div className="text-muted-foreground">({testimonials.length} reviews)</div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-5 w-32 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-4 w-24" />
              </Card>
            ))}
          </div>
        ) : !testimonials || testimonials.length === 0 ? (
          <Card className="p-12 text-center">
            <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
            <p className="text-muted-foreground">
              Be the first to leave a review after using our services!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="hover-elevate" data-testid={`card-review-${index}`}>
                <CardContent className="p-6">
                  <div className="mb-4">{renderStars(testimonial.rating)}</div>
                  <p className="text-muted-foreground mb-4 line-clamp-4">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="font-semibold">{testimonial.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </div>
                    </div>
                    {testimonial.source && (
                      <div className="text-sm text-muted-foreground">{testimonial.source}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Had a Great Experience?</h2>
          <p className="text-lg mb-6 opacity-90">
            We'd love to hear from you! Leave us a review on Google or Facebook.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://www.google.com/search?q=collision+towing+murray+ut" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
              data-testid="link-google-review"
            >
              <span className="text-lg font-semibold hover:opacity-80 transition-opacity cursor-pointer">
                Leave a Google Review →
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">Fast</div>
            <div className="text-muted-foreground">Quick response times to get you back on the road</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">Professional</div>
            <div className="text-muted-foreground">Experienced, licensed, and insured operators</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">Reliable</div>
            <div className="text-muted-foreground">24/7 availability when you need us most</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

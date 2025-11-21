import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Upload, LogOut, Eye, Phone, Mail, Calendar, Trash2, X } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { GalleryImage } from "@shared/schema";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageCategory, setImageCategory] = useState("fleet");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery-images"],
    enabled: isAuthenticated,
  });

  const { data: analyticsData } = useQuery<{
    configured: boolean;
    data?: {
      pageViews: number;
      activeUsers: number;
      newUsers: number;
      sessions: number;
      topPages: Array<{ path: string; views: number }>;
    };
    message?: string;
  }>({
    queryKey: ["/api/analytics"],
    enabled: isAuthenticated,
    refetchInterval: 60000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/gallery-images/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery-images"] });
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    },
  });

  useEffect(() => {
    document.title = "Admin Dashboard | Collision Towing";
    const auth = localStorage.getItem("collision_admin_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this should be server-side
    if (password === "collision2025") {
      localStorage.setItem("collision_admin_auth", "authenticated");
      setIsAuthenticated(true);
      toast({
        title: "Welcome!",
        description: "Successfully logged in to admin dashboard.",
      });
    } else {
      toast({
        title: "Error",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("collision_admin_auth");
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "Successfully logged out of admin dashboard.",
    });
    setLocation("/");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const urlResponse = await fetch("/api/gallery-images/upload-url", {
        method: "POST",
      });
      const { uploadURL } = await urlResponse.json();

      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        body: uploadFile,
        headers: {
          "Content-Type": uploadFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      const createResponse = await apiRequest("POST", "/api/gallery-images", {
        imageUrl: uploadURL,
        title: imageTitle || "Gallery Image",
        category: imageCategory,
        displayOrder: 0,
      });

      const savedImage = await createResponse.json();

      queryClient.invalidateQueries({ queryKey: ["/api/gallery-images"] });

      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });

      setUploadFile(null);
      setUploadPreview(null);
      setImageTitle("");
      setImageCategory("fleet");
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  data-testid="input-admin-password"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-admin-login">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary/10 p-3">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                  <p className="text-2xl font-bold" data-testid="text-page-views">
                    {analyticsData?.configured && analyticsData.data
                      ? analyticsData.data.pageViews.toLocaleString()
                      : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold" data-testid="text-active-users">
                    {analyticsData?.configured && analyticsData.data
                      ? analyticsData.data.activeUsers.toLocaleString()
                      : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Users</p>
                  <p className="text-2xl font-bold" data-testid="text-new-users">
                    {analyticsData?.configured && analyticsData.data
                      ? analyticsData.data.newUsers.toLocaleString()
                      : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary/10 p-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                  <p className="text-2xl font-bold" data-testid="text-sessions">
                    {analyticsData?.configured && analyticsData.data
                      ? analyticsData.data.sessions.toLocaleString()
                      : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Google Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData?.configured ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Analytics API is configured and pulling live data from your Google Analytics property.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Measurement ID:</p>
                    <code className="text-xs bg-background px-2 py-1 rounded">
                      {import.meta.env.VITE_GA_MEASUREMENT_ID || "Not configured"}
                    </code>
                  </div>
                  {analyticsData.data?.topPages && analyticsData.data.topPages.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Top Pages (Last 30 days):</p>
                      <div className="space-y-2">
                        {analyticsData.data.topPages.map((page, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground truncate flex-1">{page.path}</span>
                            <span className="font-medium ml-2">{page.views.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Website tracking is active, but the Analytics API is not configured yet.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Measurement ID:</p>
                    <code className="text-xs bg-background px-2 py-1 rounded">
                      {import.meta.env.VITE_GA_MEASUREMENT_ID || "Not configured"}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To see live analytics data here, you need to set up the Google Analytics Reporting API with a service account.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    View detailed analytics at{" "}
                    <a
                      href="https://analytics.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      analytics.google.com
                    </a>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Gallery Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Upload New Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                    data-testid="input-image-upload"
                  />
                </div>

                {uploadPreview && (
                  <div className="relative">
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setUploadFile(null);
                        setUploadPreview(null);
                      }}
                      data-testid="button-remove-preview"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {uploadFile && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="image-title">Image Title</Label>
                      <Input
                        id="image-title"
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        placeholder="e.g., Flatbed Tow Truck"
                        data-testid="input-image-title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image-category">Category</Label>
                      <select
                        id="image-category"
                        value={imageCategory}
                        onChange={(e) => setImageCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        data-testid="select-image-category"
                      >
                        <option value="fleet">Fleet & Equipment</option>
                        <option value="services">Services</option>
                        <option value="work">Work in Progress</option>
                        <option value="general">General</option>
                      </select>
                    </div>

                    <Button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="w-full"
                      data-testid="button-upload-image"
                    >
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                )}

                {galleryImages && galleryImages.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h3 className="font-semibold">Uploaded Images ({galleryImages.length})</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {galleryImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-24 object-cover rounded-md"
                            data-testid={`img-gallery-${image.id}`}
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteMutation.mutate(image.id)}
                            data-testid={`button-delete-${image.id}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-xs text-white truncate">
                            {image.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Yard Locations</span>
                <span className="text-sm text-muted-foreground">West Jordan (#10950) • Murray (#10557) • Ogden (#10717)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Service Counties</span>
                <span className="text-sm text-muted-foreground">9 counties across Northern Utah</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Contact Number</span>
                <span className="text-sm text-muted-foreground">801-946-6531</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

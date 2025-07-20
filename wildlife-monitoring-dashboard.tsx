"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Camera,
  Eye,
  Leaf,
  MapPin,
  Plus,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface Animal {
  id: number;
  species: string;
  scientific_name: string;
  status: string;
  population: number;
  habitat: string;
  location: string;
  last_sighting: string;
  threat_level: string;
  conservation_efforts: string;
  image_url: string;
  weight_range: string;
  lifespan: string;
  diet: string;
}

interface Sighting {
  id: number;
  animal_id: number;
  species: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
  observer: string;
  behavior: string;
  group_size: number;
  health_status: string;
  notes: string;
}

interface Stats {
  total_species: number;
  total_population: number;
  endangered_species: number;
  recent_sightings: number;
  protected_areas: number;
  active_researchers: number;
  conservation_projects: number;
  threat_levels: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

const navigationItems = [
  { title: "Dashboard", icon: BarChart3, url: "#", isActive: true },
  { title: "Species", icon: Leaf, url: "#" },
  { title: "Sightings", icon: Eye, url: "#" },
  { title: "Conservation", icon: Activity, url: "#" },
  { title: "Research", icon: Users, url: "#" },
  { title: "Analytics", icon: TrendingUp, url: "#" },
];

export function WildlifeMonitoringDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [animalsRes, sightingsRes, statsRes] = await Promise.all([
        fetch("/api/animals"),
        fetch("/api/animals?type=sightings"),
        fetch("/api/stats"),
      ]);

      const animalsData = await animalsRes.json();
      const sightingsData = await sightingsRes.json();
      const statsData = await statsRes.json();

      setAnimals(animalsData);
      setSightings(sightingsData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.scientific_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || animal.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critically endangered":
        return "bg-red-500";
      case "endangered":
        return "bg-orange-500";
      case "vulnerable":
        return "bg-yellow-500";
      case "least concern":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          <p className="mt-4 text-lg">Loading wildlife data...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">
              Wildlife Monitoring Dashboard
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search species..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Critically Endangered">
                  Critically Endangered
                </SelectItem>
                <SelectItem value="Endangered">Endangered</SelectItem>
                <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                <SelectItem value="Least Concern">Least Concern</SelectItem>
              </SelectContent>
            </Select>
            <ReportSightingDialog onSightingAdded={fetchData} />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Stats Cards */}
          {stats && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Species
                  </CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.total_species}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">
                      {stats.endangered_species}
                    </span>{" "}
                    endangered
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Population
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.total_population.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all species
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Recent Sightings
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.recent_sightings}
                  </div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Researchers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.active_researchers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats.conservation_projects} active projects
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="species" className="space-y-4">
            <TabsList>
              <TabsTrigger value="species">Species Overview</TabsTrigger>
              <TabsTrigger value="sightings">Recent Sightings</TabsTrigger>
              <TabsTrigger value="conservation">
                Conservation Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="species" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAnimals.map((animal) => (
                  <Card key={animal.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={animal.image_url || "/placeholder.svg"}
                        alt={animal.species}
                        className="object-cover w-full h-full"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${getStatusColor(
                          animal.status
                        )} text-white`}
                      >
                        {animal.status}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {animal.species}
                      </CardTitle>
                      <CardDescription className="italic">
                        {animal.scientific_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Population:
                        </span>
                        <span className="font-medium">
                          {animal.population.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Threat Level:
                        </span>
                        <span
                          className={`font-medium ${getThreatLevelColor(
                            animal.threat_level
                          )}`}
                        >
                          {animal.threat_level}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium text-right">
                          {animal.location}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Last Seen:
                        </span>
                        <span className="font-medium">
                          {new Date(animal.last_sighting).toLocaleDateString()}
                        </span>
                      </div>
                      <Separator />
                      <p className="text-xs text-muted-foreground">
                        {animal.conservation_efforts}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sightings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Wildlife Sightings</CardTitle>
                  <CardDescription>
                    Latest confirmed wildlife observations from field
                    researchers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sightings.map((sighting) => (
                      <div
                        key={sighting.id}
                        className="flex items-start space-x-4 p-4 border rounded-lg"
                      >
                        <Avatar>
                          <AvatarFallback>
                            {sighting.species
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                              {sighting.species}
                            </h4>
                            <Badge variant="outline">
                              {sighting.health_status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {sighting.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Group size: {sighting.group_size}
                            </div>
                            <div>Observer: {sighting.observer}</div>
                            <div>
                              {new Date(sighting.date).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-sm">
                            <strong>Behavior:</strong> {sighting.behavior}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sighting.notes}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conservation" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Conservation Status Distribution</CardTitle>
                    <CardDescription>
                      Current conservation status of monitored species
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {animals.reduce((acc, animal) => {
                      acc[animal.status] = (acc[animal.status] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)}
                    {Object.entries(
                      animals.reduce((acc, animal) => {
                        acc[animal.status] = (acc[animal.status] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([status, count]) => (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{status}</span>
                          <span className="text-sm text-muted-foreground">
                            {count} species
                          </span>
                        </div>
                        <Progress
                          value={(count / animals.length) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Population Trends</CardTitle>
                    <CardDescription>
                      Population changes over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {animals.map((animal) => (
                      <div
                        key={animal.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{animal.species}</p>
                          <p className="text-sm text-muted-foreground">
                            {animal.population.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Math.random() > 0.5 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-sm">
                            {Math.random() > 0.5 ? "+" : "-"}
                            {Math.floor(Math.random() * 10)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function ReportSightingDialog({
  onSightingAdded,
}: {
  onSightingAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    species: "",
    location: "",
    observer: "",
    behavior: "",
    group_size: 1,
    health_status: "Good",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/animals?type=sightings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          animal_id: Math.floor(Math.random() * 6) + 1,
          coordinates: { lat: 0, lng: 0 },
        }),
      });

      if (response.ok) {
        setOpen(false);
        setFormData({
          species: "",
          location: "",
          observer: "",
          behavior: "",
          group_size: 1,
          health_status: "Good",
          notes: "",
        });
        onSightingAdded();
      }
    } catch (error) {
      console.error("Error submitting sighting:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Report Sighting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Wildlife Sighting</DialogTitle>
          <DialogDescription>
            Submit a new wildlife observation to the monitoring system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="species">Species</Label>
            <Input
              id="species"
              value={formData.species}
              onChange={(e) =>
                setFormData({ ...formData, species: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="observer">Observer Name</Label>
            <Input
              id="observer"
              value={formData.observer}
              onChange={(e) =>
                setFormData({ ...formData, observer: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="behavior">Observed Behavior</Label>
            <Input
              id="behavior"
              value={formData.behavior}
              onChange={(e) =>
                setFormData({ ...formData, behavior: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group_size">Group Size</Label>
              <Input
                id="group_size"
                type="number"
                min="1"
                value={formData.group_size}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    group_size: Number.parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="health_status">Health Status</Label>
              <Select
                value={formData.health_status}
                onValueChange={(value) =>
                  setFormData({ ...formData, health_status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                  <SelectItem value="Injured">Injured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Sighting
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-sidebar-primary-foreground">
                  <Leaf className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Wildlife Monitor
                  </span>
                  <span className="truncate text-xs">
                    Conservation Platform
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Camera />
                    <span>Report Sighting</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <AlertTriangle />
                    <span>Emergency Alert</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Zap />
                    <span>Field Research</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Dr. Wildlife"
                />
                <AvatarFallback className="rounded-lg">DW</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Dr. Wildlife</span>
                <span className="truncate text-xs">Research Director</span>
              </div>
              <Settings className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

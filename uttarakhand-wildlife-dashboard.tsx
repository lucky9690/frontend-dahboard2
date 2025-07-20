"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Camera,
  Eye,
  Leaf,
  MapPin,
  Mountain,
  Plus,
  Search,
  Settings,
  Thermometer,
  TrendingUp,
  Trees,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
} from "@/components/ui/sidebar"

interface UttarakhandAnimal {
  id: number
  species: string
  scientific_name: string
  status: string
  population: number
  habitat: string
  location: string
  forest_division: string
  last_sighting: string
  threat_level: string
  conservation_efforts: string
  image_url: string
  weight_range: string
  lifespan: string
  diet: string
  altitude_range: string
  local_name: string
}

interface UttarakhandSighting {
  id: number
  animal_id: number
  species: string
  location: string
  coordinates: { lat: number; lng: number }
  date: string
  observer: string
  behavior: string
  group_size: number
  health_status: string
  notes: string
  forest_range: string
  weather: string
}

interface UttarakhandStats {
  total_species: number
  total_population: number
  endangered_species: number
  recent_sightings: number
  protected_areas: number
  active_researchers: number
  conservation_projects: number
  forest_divisions: number
  national_parks: number
  wildlife_sanctuaries: number
  tiger_reserves: number
  threat_levels: {
    critical: number
    high: number
    medium: number
    low: number
  }
  altitude_zones: Record<string, number>
  conservation_success: {
    tiger_population_increase: number
    elephant_corridor_established: number
    community_programs: number
    anti_poaching_operations: number
  }
}

const navigationItems = [
  { title: "Dashboard", icon: BarChart3, url: "#", isActive: true },
  { title: "Wildlife Species", icon: Leaf, url: "#" },
  { title: "Forest Sightings", icon: Eye, url: "#" },
  { title: "Conservation", icon: Activity, url: "#" },
  { title: "Research Teams", icon: Users, url: "#" },
  { title: "Forest Analytics", icon: TrendingUp, url: "#" },
]

const uttarakhandLocations = [
  "Jim Corbett National Park",
  "Rajaji National Park",
  "Valley of Flowers National Park",
  "Nanda Devi National Park",
  "Gangotri National Park",
  "Govind Wildlife Sanctuary",
  "Kedarnath Wildlife Sanctuary",
  "Binsar Wildlife Sanctuary",
  "Askot Wildlife Sanctuary",
  "Sonanadi Wildlife Sanctuary",
]

export function UttarakhandWildlifeDashboard() {
  const [animals, setAnimals] = useState<UttarakhandAnimal[]>([])
  const [sightings, setSightings] = useState<UttarakhandSighting[]>([])
  const [stats, setStats] = useState<UttarakhandStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [animalsRes, sightingsRes, statsRes] = await Promise.all([
        fetch("/api/animals"),
        fetch("/api/animals?type=sightings"),
        fetch("/api/stats"),
      ])

      const animalsData = await animalsRes.json()
      const sightingsData = await sightingsRes.json()
      const statsData = await statsRes.json()

      setAnimals(animalsData)
      setSightings(sightingsData)
      setStats(statsData)
    } catch (error) {
      console.error("Error fetching Uttarakhand wildlife data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.local_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || animal.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critically endangered":
        return "bg-red-500"
      case "endangered":
        return "bg-orange-500"
      case "vulnerable":
        return "bg-yellow-500"
      case "near threatened":
        return "bg-blue-500"
      case "least concern":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "critical":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          <p className="mt-4 text-lg text-green-800">Loading Uttarakhand Forest Data...</p>
          <p className="text-sm text-green-600">Connecting to forest monitoring systems</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <UttarakhandSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-gradient-to-r from-green-600 to-blue-600 text-white px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-white/20" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-white/30" />
          <div className="flex items-center gap-2">
            <Mountain className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Uttarakhand Forest Wildlife Monitor</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search species or local name..."
                className="pl-8 w-64 bg-white/90 text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40 bg-white/90 text-gray-900">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                <SelectItem value="Endangered">Endangered</SelectItem>
                <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                <SelectItem value="Near Threatened">Near Threatened</SelectItem>
                <SelectItem value="Least Concern">Least Concern</SelectItem>
              </SelectContent>
            </Select>
            <UttarakhandReportSightingDialog onSightingAdded={fetchData} />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-b from-green-50/30 to-blue-50/30">
          {/* Uttarakhand Stats Cards */}
          {stats && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">Forest Species</CardTitle>
                  <Trees className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900">{stats.total_species}</div>
                  <p className="text-xs text-green-700">
                    <span className="text-red-600">{stats.endangered_species}</span> endangered
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800">Protected Areas</CardTitle>
                  <Mountain className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{stats.protected_areas}</div>
                  <p className="text-xs text-blue-700">
                    {stats.national_parks} National Parks, {stats.tiger_reserves} Tiger Reserves
                  </p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-800">Recent Sightings</CardTitle>
                  <Eye className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{stats.recent_sightings}</div>
                  <p className="text-xs text-orange-700">Last 30 days in forests</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-800">Forest Rangers</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900">{stats.active_researchers}</div>
                  <p className="text-xs text-purple-700">{stats.conservation_projects} active projects</p>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="species" className="space-y-4">
            <TabsList className="bg-white/80">
              <TabsTrigger value="species">Uttarakhand Species</TabsTrigger>
              <TabsTrigger value="sightings">Forest Sightings</TabsTrigger>
              <TabsTrigger value="conservation">Conservation Status</TabsTrigger>
              <TabsTrigger value="altitude">Altitude Zones</TabsTrigger>
            </TabsList>

            <TabsContent value="species" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAnimals.map((animal) => (
                  <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <img
                        src={animal.image_url || "/placeholder.svg"}
                        alt={animal.species}
                        className="object-cover w-full h-full"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(animal.status)} text-white`}>
                        {animal.status}
                      </Badge>
                      <Badge className="absolute top-2 left-2 bg-black/70 text-white">{animal.local_name}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{animal.species}</CardTitle>
                      <CardDescription className="italic">{animal.scientific_name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Population:</span>
                        <span className="font-medium">{animal.population.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Threat Level:</span>
                        <span className={`font-medium ${getThreatLevelColor(animal.threat_level)}`}>
                          {animal.threat_level}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Altitude:</span>
                        <span className="font-medium">{animal.altitude_range}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Forest Division:</span>
                        <span className="font-medium text-right text-xs">{animal.forest_division}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Seen:</span>
                        <span className="font-medium">{new Date(animal.last_sighting).toLocaleDateString()}</span>
                      </div>
                      <Separator />
                      <p className="text-xs text-muted-foreground">{animal.conservation_efforts}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sightings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Forest Wildlife Sightings</CardTitle>
                  <CardDescription>Latest wildlife observations from Uttarakhand forests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sightings.map((sighting) => (
                      <div key={sighting.id} className="flex items-start space-x-4 p-4 border rounded-lg bg-white/50">
                        <Avatar>
                          <AvatarFallback className="bg-green-100 text-green-800">
                            {sighting.species
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-green-900">{sighting.species}</h4>
                            <Badge variant="outline" className="bg-green-50">
                              {sighting.health_status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-green-600" />
                              {sighting.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-blue-600" />
                              Group: {sighting.group_size}
                            </div>
                            <div className="flex items-center gap-1">
                              <Trees className="h-3 w-3 text-green-600" />
                              {sighting.forest_range}
                            </div>
                            <div className="flex items-center gap-1">
                              <Thermometer className="h-3 w-3 text-orange-600" />
                              {sighting.weather}
                            </div>
                          </div>
                          <p className="text-sm">
                            <strong>Behavior:</strong> {sighting.behavior}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Observer:</strong> {sighting.observer} •{" "}
                            {new Date(sighting.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">{sighting.notes}</p>
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
                    <CardDescription>Current status of Uttarakhand forest species</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(
                      animals.reduce(
                        (acc, animal) => {
                          acc[animal.status] = (acc[animal.status] || 0) + 1
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    ).map(([status, count]) => (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{status}</span>
                          <span className="text-sm text-muted-foreground">{count} species</span>
                        </div>
                        <Progress value={(count / animals.length) * 100} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conservation Success Stories</CardTitle>
                    <CardDescription>Recent achievements in Uttarakhand</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stats && (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Tiger Population Growth</p>
                            <p className="text-sm text-muted-foreground">15% increase since 2019</p>
                          </div>
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Elephant Corridors</p>
                            <p className="text-sm text-muted-foreground">3 new corridors established</p>
                          </div>
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Community Programs</p>
                            <p className="text-sm text-muted-foreground">25 villages participating</p>
                          </div>
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Anti-Poaching Operations</p>
                            <p className="text-sm text-muted-foreground">156 successful operations</p>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="altitude" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Species Distribution by Altitude Zones</CardTitle>
                  <CardDescription>Wildlife distribution across Uttarakhand's elevation gradients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats &&
                    Object.entries(stats.altitude_zones).map(([zone, count]) => (
                      <div key={zone} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{zone}</span>
                          <span className="text-sm text-muted-foreground">{count} species</span>
                        </div>
                        <Progress value={(count / stats.total_species) * 100} className="h-2" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function UttarakhandReportSightingDialog({ onSightingAdded }: { onSightingAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    species: "",
    location: "",
    forest_range: "",
    observer: "",
    behavior: "",
    group_size: 1,
    health_status: "Good",
    weather: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/animals?type=sightings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          animal_id: Math.floor(Math.random() * 8) + 1,
          coordinates: { lat: 30.0668 + Math.random() * 2, lng: 78.2676 + Math.random() * 2 },
        }),
      })

      if (response.ok) {
        setOpen(false)
        setFormData({
          species: "",
          location: "",
          forest_range: "",
          observer: "",
          behavior: "",
          group_size: 1,
          health_status: "Good",
          weather: "",
          notes: "",
        })
        onSightingAdded()
      }
    } catch (error) {
      console.error("Error submitting Uttarakhand sighting:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white/90 text-green-800 hover:bg-white">
          <Plus className="h-4 w-4 mr-2" />
          Report Forest Sighting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report Uttarakhand Forest Wildlife Sighting</DialogTitle>
          <DialogDescription>Submit a new wildlife observation from Uttarakhand forests.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="species">Species</Label>
              <Input
                id="species"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                placeholder="e.g., Bengal Tiger"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {uttarakhandLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="forest_range">Forest Range</Label>
              <Input
                id="forest_range"
                value={formData.forest_range}
                onChange={(e) => setFormData({ ...formData, forest_range: e.target.value })}
                placeholder="e.g., Dhikala Range"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="observer">Observer Name</Label>
              <Input
                id="observer"
                value={formData.observer}
                onChange={(e) => setFormData({ ...formData, observer: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="behavior">Observed Behavior</Label>
            <Input
              id="behavior"
              value={formData.behavior}
              onChange={(e) => setFormData({ ...formData, behavior: e.target.value })}
              placeholder="e.g., Hunting near water source"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group_size">Group Size</Label>
              <Input
                id="group_size"
                type="number"
                min="1"
                value={formData.group_size}
                onChange={(e) => setFormData({ ...formData, group_size: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="health_status">Health Status</Label>
              <Select
                value={formData.health_status}
                onValueChange={(value) => setFormData({ ...formData, health_status: value })}
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
            <div className="space-y-2">
              <Label htmlFor="weather">Weather</Label>
              <Input
                id="weather"
                value={formData.weather}
                onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                placeholder="e.g., Clear, 18°C"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Detailed observations, behavior notes, etc."
            />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Submit Forest Sighting
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function UttarakhandSidebar() {
  return (
    <Sidebar variant="inset" className="border-green-200">
      <SidebarHeader className="bg-gradient-to-b from-green-600 to-green-700 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-white/20">
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20 text-white">
                  <Mountain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Uttarakhand Forest</span>
                  <span className="truncate text-xs opacity-90">Wildlife Monitor</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-green-50/50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} className="hover:bg-green-100">
                    <a href={item.url}>
                      <item.icon className="text-green-600" />
                      <span className="text-green-800">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">Forest Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-green-100">
                  <a href="#">
                    <Camera className="text-green-600" />
                    <span className="text-green-800">Report Sighting</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-green-100">
                  <a href="#">
                    <AlertTriangle className="text-orange-600" />
                    <span className="text-green-800">Forest Alert</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-green-100">
                  <a href="#">
                    <Zap className="text-blue-600" />
                    <span className="text-green-800">Field Research</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-green-50/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-green-100">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Forest Officer" />
                <AvatarFallback className="rounded-lg bg-green-200 text-green-800">FO</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-green-900">Forest Officer</span>
                <span className="truncate text-xs text-green-700">Uttarakhand Forest Dept.</span>
              </div>
              <Settings className="ml-auto size-4 text-green-600" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

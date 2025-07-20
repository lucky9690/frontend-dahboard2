"use client"
import {
  Bird,
  Fish,
  TreePine,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Camera,
  Users,
  Leaf,
  Mountain,
  Search,
  Filter,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const navigationItems = [
  {
    title: "Overview",
    icon: BarChart3,
    url: "#",
    isActive: true,
  },
  {
    title: "Species Tracking",
    icon: Bird,
    url: "#",
  },
  {
    title: "Habitat Monitoring",
    icon: TreePine,
    url: "#",
  },
  {
    title: "Conservation Status",
    icon: Leaf,
    url: "#",
  },
  {
    title: "Field Reports",
    icon: Camera,
    url: "#",
  },
  {
    title: "Analytics",
    icon: PieChart,
    url: "#",
  },
]

const recentSightings = [
  {
    id: 1,
    species: "Bald Eagle",
    location: "Yellowstone National Park",
    time: "2 hours ago",
    reporter: "Dr. Sarah Johnson",
    status: "confirmed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    species: "Gray Wolf",
    location: "Glacier National Park",
    time: "4 hours ago",
    reporter: "Mike Chen",
    status: "pending",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    species: "Mountain Lion",
    location: "Rocky Mountain NP",
    time: "6 hours ago",
    reporter: "Lisa Rodriguez",
    status: "confirmed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    species: "Black Bear",
    location: "Great Smoky Mountains",
    time: "8 hours ago",
    reporter: "Tom Wilson",
    status: "confirmed",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const conservationData = [
  {
    species: "California Condor",
    status: "Critically Endangered",
    population: 537,
    trend: "increasing",
    color: "bg-red-500",
  },
  {
    species: "Florida Manatee",
    status: "Threatened",
    population: 6620,
    trend: "stable",
    color: "bg-yellow-500",
  },
  {
    species: "Grizzly Bear",
    status: "Threatened",
    population: 1800,
    trend: "increasing",
    color: "bg-yellow-500",
  },
  {
    species: "Whooping Crane",
    status: "Endangered",
    population: 506,
    trend: "increasing",
    color: "bg-orange-500",
  },
]

export function WildlifeDashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Wildlife Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search species..." className="pl-8 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>RW</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ranger Wilson</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Species</CardTitle>
                <Bird className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Researchers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3</span> new this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protected Areas</CardTitle>
                <Mountain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">Covering 2.4M acres</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Sightings</CardTitle>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+89</span> today
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Sightings */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Wildlife Sightings</CardTitle>
                <CardDescription>Latest confirmed and pending wildlife observations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSightings.map((sighting) => (
                    <div key={sighting.id} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={sighting.image || "/placeholder.svg"} alt={sighting.species} />
                        <AvatarFallback>
                          {sighting.species
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-none">{sighting.species}</p>
                          <Badge
                            variant={sighting.status === "confirmed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {sighting.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {sighting.location}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Reported by {sighting.reporter} • {sighting.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conservation Status */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Conservation Status</CardTitle>
                <CardDescription>Current status of endangered species</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conservationData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{item.species}</p>
                          <p className="text-xs text-muted-foreground">{item.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.population.toLocaleString()}</p>
                          <div className="flex items-center gap-1">
                            {item.trend === "increasing" ? (
                              <TrendingUp className="h-3 w-3 text-green-600" />
                            ) : (
                              <Activity className="h-3 w-3 text-yellow-600" />
                            )}
                            <span className="text-xs text-muted-foreground capitalize">{item.trend}</span>
                          </div>
                        </div>
                      </div>
                      <Progress value={Math.min((item.population / 10000) * 100, 100)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Habitat Health */}
          <Card>
            <CardHeader>
              <CardTitle>Habitat Health Overview</CardTitle>
              <CardDescription>Current status of monitored ecosystems and habitats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TreePine className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Forest Ecosystems</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">85% healthy</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Fish className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Aquatic Systems</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-muted-foreground">72% healthy</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mountain className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Mountain Regions</span>
                  </div>
                  <Progress value={91} className="h-2" />
                  <p className="text-xs text-muted-foreground">91% healthy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
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
                  <span className="truncate font-semibold">Wildlife Tracker</span>
                  <span className="truncate text-xs">Conservation Platform</span>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Ranger Wilson" />
                    <AvatarFallback className="rounded-lg">RW</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Ranger Wilson</span>
                    <span className="truncate text-xs">Park Ranger</span>
                  </div>
                  <Settings className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Ranger Wilson" />
                      <AvatarFallback className="rounded-lg">RW</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Ranger Wilson</span>
                      <span className="truncate text-xs">ranger@wildlife.gov</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

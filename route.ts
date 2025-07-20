import { NextResponse } from "next/server"

const uttarakhandStatsData = {
  total_species: 8,
  total_population: 3382,
  endangered_species: 4,
  recent_sightings: 47,
  protected_areas: 12,
  active_researchers: 34,
  conservation_projects: 15,
  forest_divisions: 6,
  national_parks: 6,
  wildlife_sanctuaries: 7,
  tiger_reserves: 2,
  threat_levels: {
    critical: 1,
    high: 3,
    medium: 3,
    low: 1,
  },
  altitude_zones: {
    "Low Hills (200-1000m)": 3,
    "Mid Hills (1000-2500m)": 2,
    "High Hills (2500-4000m)": 2,
    "Alpine (4000m+)": 1,
  },
  conservation_success: {
    tiger_population_increase: 15,
    elephant_corridor_established: 3,
    community_programs: 25,
    anti_poaching_operations: 156,
  },
}

export async function GET() {
  return NextResponse.json(uttarakhandStatsData)
}

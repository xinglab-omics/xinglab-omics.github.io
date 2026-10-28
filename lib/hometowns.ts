import type { Hometown } from "@/lib/content";

export type Traveler = {
  name: string;
  chineseName?: string;
  image?: string;
  hometown: Hometown;
};

export type TravelerWithDistance = Traveler & { km: number };

const fudan = { lat: 31.2989, lon: 121.5015 };
const earthRadiusKm = 6371;
// Hometowns closer than this count as local.
export const localKm = 30;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function distanceToFudan({ lat, lon }: Hometown) {
  const fromLat = toRadians(fudan.lat);
  const toLat = toRadians(lat);
  const a =
    Math.sin((toLat - fromLat) / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(toRadians(lon - fudan.lon) / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(a));
}

// Straight-line distance from each hometown to Fudan, nearest first.
export function withDistances(travelers: Traveler[]): TravelerWithDistance[] {
  return travelers
    .map((traveler) => ({ ...traveler, km: distanceToFudan(traveler.hometown) }))
    .sort((a, b) => a.km - b.km);
}

// The round number of km (in steps of 500) that the farthest hometown fits under.
export function scaleKm(people: TravelerWithDistance[]) {
  return Math.max(500, Math.ceil(Math.max(...people.map((person) => person.km)) / 500) * 500);
}

export function formatKm(km: number) {
  return km < localKm ? "Local" : `${Math.round(km).toLocaleString("en-US")} km`;
}

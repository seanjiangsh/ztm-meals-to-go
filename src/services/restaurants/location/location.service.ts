import camelize from "camelize";
import { locations } from "./location.mock";
import type { LocationResult, LatLng } from "./location.types";

export function locationRequest(searchTerm: string): Promise<LocationResult> {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm as keyof typeof locations];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });
}

export function locationTransform(result: LocationResult): LatLng {
  const formattedResponse = camelize(result);
  const { geometry } = formattedResponse.results[0] as { geometry: { location: LatLng } };
  const { lat, lng } = geometry.location;

  return { lat, lng };
}

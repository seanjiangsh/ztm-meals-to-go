import { locations } from "./location.mock";
import type { LocationResult } from "./location.types";

export const locationRequest = (searchTerm: string): Promise<LocationResult> => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm as keyof typeof locations];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });
};

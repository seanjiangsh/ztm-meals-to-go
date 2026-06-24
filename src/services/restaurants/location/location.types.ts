import { locations } from "./location.mock";
import type { LatLng } from "../restaurants.types";

export type LocationResult = (typeof locations)[keyof typeof locations];
export type LocationSearch = (searchTerm: string) => void;

export interface LocationContextValue {
  location: LatLng | null;
  isLoading: boolean;
  error: Error | null;
  keyword: string;
  search: LocationSearch;
}

export type { LatLng };

import { locations } from "./location.mock";
import type { LatLng } from "../restaurants.types";

export type LocationResult = (typeof locations)[keyof typeof locations];
export type { LatLng };

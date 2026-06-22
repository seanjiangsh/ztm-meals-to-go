import { locations } from "./location.mock";

export type LocationResult = (typeof locations)[keyof typeof locations];

import type { RestaurantsApiResponse } from "../restaurants.types";

import antwerp from "./antwerp.json";
import chicago from "./chicago.json";
import toronto from "./toronto.json";
import san_francisco from "./san_francisco.json";

export const mocks: Record<string, RestaurantsApiResponse> = {
  "51.219448,4.402464": antwerp as unknown as RestaurantsApiResponse,
  "43.653225,-79.383186": toronto as unknown as RestaurantsApiResponse,
  "41.878113,-87.629799": chicago as unknown as RestaurantsApiResponse,
  "37.7749295,-122.4194155": san_francisco as unknown as RestaurantsApiResponse
};

export const mockImages: string[] = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600",
  "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600"
];

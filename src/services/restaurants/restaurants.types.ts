// ── Raw Google Places API shapes ────────────────────────────────────────────

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Geometry {
  location: LatLng;
  viewport: {
    northeast: LatLng;
    southwest: LatLng;
  };
}

export interface RawPhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export type BusinessStatus = "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";

export interface RawRestaurant {
  business_status: BusinessStatus;
  geometry: Geometry;
  icon: string;
  name: string;
  opening_hours?: { open_now: boolean };
  photos?: RawPhoto[];
  place_id: string;
  plus_code?: PlusCode;
  price_level?: number;
  rating?: number;
  reference?: string;
  scope?: string;
  types: string[];
  user_ratings_total?: number;
  vicinity: string;
}

export interface RestaurantsApiResponse {
  html_attributions: string[];
  next_page_token?: string;
  results: RawRestaurant[];
}

// ── Transformed shape consumed by UI components ──────────────────────────────

export interface Restaurant {
  placeId: string;
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  isClosedTemporarily: boolean;
  rating: number;
  userRatingsTotal: number;
  types: string[];
  priceLevel?: number;
  geometry: Geometry;
}

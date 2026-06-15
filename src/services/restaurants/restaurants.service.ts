import { mocks, mockImages } from "./mock";
import type { Restaurant, RestaurantsApiResponse, RawRestaurant } from "./restaurants.types";

function transformRestaurant(raw: RawRestaurant, index: number): Restaurant {
  return {
    placeId: raw.place_id,
    name: raw.name,
    icon: raw.icon,
    photos: [mockImages[index % mockImages.length]],
    address: raw.vicinity,
    isOpenNow: raw.opening_hours?.open_now ?? false,
    isClosedTemporarily: raw.business_status === "CLOSED_TEMPORARILY",
    rating: raw.rating ?? 0,
    userRatingsTotal: raw.user_ratings_total ?? 0,
    types: raw.types,
    priceLevel: raw.price_level,
    geometry: raw.geometry
  };
}

export function restaurantsRequest(location: string): Promise<Restaurant[]> {
  return new Promise((resolve, reject) => {
    const mock = (mocks as Record<string, RestaurantsApiResponse | undefined>)[location];
    if (mock) {
      resolve(mock.results.map(transformRestaurant));
    } else {
      reject(new Error(`No mock data found for restaurants at location: ${location}`));
    }
  });
}

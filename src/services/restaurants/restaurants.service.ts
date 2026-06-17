import camelize from "camelize";
import { mocks, mockImages } from "./mock";
import type { Restaurant, RestaurantsApiResponse, RawRestaurant } from "./restaurants.types";

function transformRestaurant(raw: RawRestaurant, index: number): Restaurant {
  const c = camelize(raw) as Record<string, any>;
  return {
    placeId: c.placeId,
    name: c.name,
    icon: c.icon,
    photos: [mockImages[index % mockImages.length]],
    address: raw.vicinity,
    isOpenNow: c.openingHours?.openNow ?? false,
    isClosedTemporarily: c.businessStatus === "CLOSED_TEMPORARILY",
    rating: c.rating ?? 0,
    userRatingsTotal: c.userRatingsTotal ?? 0,
    types: c.types,
    priceLevel: c.priceLevel,
    geometry: c.geometry,
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

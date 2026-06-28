import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { restaurantsRequest } from "./restaurants.service";
import type { Restaurant } from "./restaurants.types";
import { LocationContext } from "./location/location.context";

const LOADING_DELAY_MS = 2000;

interface RestaurantsContextValue {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: Error | null;
}

export const RestaurantsContext = createContext<RestaurantsContextValue>({
  restaurants: [],
  isLoading: false,
  error: null
});

export function RestaurantsContextProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { location } = useContext(LocationContext);

  useEffect(() => {
    if (!location) return;
    restaurantsRequest(location)
      .then((results) => {
        setTimeout(() => {
          setRestaurants(results);
          setIsLoading(false);
        }, LOADING_DELAY_MS);
      })
      .catch((e: Error) => {
        setError(e);
        setIsLoading(false);
      });
  }, [location]);

  return createElement(
    RestaurantsContext.Provider,
    { value: { restaurants, isLoading, error } },
    children
  );
}

export function useRestaurants() {
  return useContext(RestaurantsContext);
}

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

  useEffect(() => {
    restaurantsRequest("37.7749295,-122.4194155")
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
  }, []);

  return createElement(
    RestaurantsContext.Provider,
    { value: { restaurants, isLoading, error } },
    children
  );
}

export function useRestaurants() {
  return useContext(RestaurantsContext);
}

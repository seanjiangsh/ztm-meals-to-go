import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import { locationRequest, locationTransform } from "./location.service";
import type { LatLng, LocationContextValue } from "./location.types";

const DEFAULT_LOCATION_KEYWORD = "san francisco";

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

export const LocationContext = createContext<LocationContextValue>({
  location: null,
  isLoading: false,
  error: null,
  keyword: DEFAULT_LOCATION_KEYWORD,
  search: () => {}
});

export function LocationContextProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [keyword, setKeyword] = useState(DEFAULT_LOCATION_KEYWORD);

  function search(searchTerm: string) {
    const nextKeyword = searchTerm.trim().toLowerCase();

    if (nextKeyword === keyword) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setKeyword(nextKeyword);
  }

  useEffect(() => {
    locationRequest(keyword)
      .then(locationTransform)
      .then((result) => {
        setLocation(result);
        setIsLoading(false);
      })
      .catch((e: unknown) => {
        setError(toError(e));
        setIsLoading(false);
      });
  }, [keyword]);

  return createElement(
    LocationContext.Provider,
    { value: { location, isLoading, error, keyword, search } },
    children
  );
}

export function useLocation() {
  return useContext(LocationContext);
}

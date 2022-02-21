import { createContext } from 'react';
import { Restaurant } from '../entities/Restaurant';
import { RestaurantsRepository } from '../repositories/RestaurantsRepository';

type MapContextType = {
  restaurants: Restaurant[] | [];
  setRestaurants: (restaurant: Restaurant[]) => void;
  isLoaded: boolean;
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  placeServices: RestaurantsRepository | null;
  setPlaceServices: (repo: RestaurantsRepository) => void;
  keyword: string;
  setKeyword: (word: string) => void;
  apiError: boolean;
  setApiError: (val: boolean) => void;
  noResult: boolean;
  setNoResult: (val: boolean) => void;
  isSearching: boolean;
  setIsSearching: (val: boolean) => void;
};

export const MapContext = createContext<MapContextType>({
  restaurants: [],
  setRestaurants: () => null,
  isLoaded: false,
  map: null,
  setMap: () => null,
  placeServices: null,
  setPlaceServices: () => null,
  keyword: '',
  setKeyword: () => null,
  apiError: false,
  setApiError: () => null,
  noResult: false,
  setNoResult: () => null,
  isSearching: false,
  setIsSearching: () => null,
});

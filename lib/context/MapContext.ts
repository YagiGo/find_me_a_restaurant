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
  // onMapLoad: (map: google.maps.Map)=>void;
  // onMapUnmount: ()=>void;
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
  // onMapLoad: ()=>null,
  // onMapUnmount: ()=>null
});

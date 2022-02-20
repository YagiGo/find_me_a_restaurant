import '../lib/presentation/style/global.scss';
import type { AppProps } from 'next/app';
import { Libraries } from '@react-google-maps/api/src/utils/make-load-script-url';
import { useState } from 'react';
import { Restaurant } from '../lib/entities/Restaurant';
import { RestaurantsRepository } from '../lib/repositories/RestaurantsRepository';
import { useLoadScript } from '@react-google-maps/api';
import { MapContext } from '../lib/context/MapContext';

const lib: Libraries = ['places'];

function MyApp({ Component, pageProps }: AppProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [placeServices, setPlaceServices] =
    useState<RestaurantsRepository | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const { isLoaded } = useLoadScript({
    id: 'find-me-a-restaurant',
    googleMapsApiKey: 'AIzaSyATzUZn4kIf_rSuQ25NUCA5hHxiFYzDa4o',
    libraries: lib,
  });
  return isLoaded ? (
    <MapContext.Provider
      value={{
        restaurants,
        setRestaurants,
        isLoaded,
        map,
        setMap,
        placeServices,
        setPlaceServices,
        keyword,
        setKeyword,
      }}
    >
      <Component {...pageProps} />
    </MapContext.Provider>
  ) : (
    <h6>Loading</h6>
  );
}

export default MyApp;

import '../lib/presentation/style/global.scss';
import type { AppProps } from 'next/app';
import { Libraries } from '@react-google-maps/api/src/utils/make-load-script-url';
import { useState } from 'react';
import { Restaurant } from '../lib/entities/Restaurant';
import { RestaurantsRepository } from '../lib/repositories/RestaurantsRepository';
import { useLoadScript } from '@react-google-maps/api';
import { MapContext } from '../lib/context/MapContext';
import { getGoogleMapApiKey } from '../lib/infrastructure/apiKey';

const lib: Libraries = ['places'];

function MyApp({ Component, pageProps }: AppProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [placeServices, setPlaceServices] =
    useState<RestaurantsRepository | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [noResult, setNoResult] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { isLoaded } = useLoadScript({
    id: 'find-me-a-restaurant',
    googleMapsApiKey: getGoogleMapApiKey(),
    libraries: lib,
  });
  return (
    isLoaded && (
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
          noResult,
          setNoResult,
          apiError,
          setApiError,
          isSearching,
          setIsSearching,
        }}
      >
        <Component {...pageProps} />
      </MapContext.Provider>
    )
  );
}

export default MyApp;

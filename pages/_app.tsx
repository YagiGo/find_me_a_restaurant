import '../lib/presentation/style/global.scss';
import type { AppProps } from 'next/app';
import { Libraries } from '@react-google-maps/api/src/utils/make-load-script-url';
import { useEffect, useState } from 'react';
import { Restaurant } from '../lib/entities/Restaurant';
import { RestaurantsRepository } from '../lib/repositories/RestaurantsRepository';
import { useLoadScript } from '@react-google-maps/api';
import { MapContext } from '../lib/context/MapContext';
import { getGoogleMapApiKey } from '../lib/infrastructure/apiKey';
import Head from 'next/head';
import { logMapError } from '../lib/infrastructure/logger';

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

  const { isLoaded, loadError } = useLoadScript({
    id: 'find-me-a-restaurant',
    googleMapsApiKey: getGoogleMapApiKey(),
    libraries: lib,
  });

  if (loadError) {
    logMapError(loadError);
  }

  useEffect(() => {
    const getInnerHeight = () => {
      return window.innerHeight;
    };
    const handleResize = () => {
      const vh = getInnerHeight() * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <title key='title'>Restaurant Finder</title>
        <meta
          name='description'
          content='A simple web app helping you decide what for lunch'
          key='description'
        />
      </Head>
      {isLoaded && (
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
      )}
    </>
  );
}

export default MyApp;

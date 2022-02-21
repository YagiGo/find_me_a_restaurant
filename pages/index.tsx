import type { NextPage } from 'next';
import AppLayout from '../lib/presentation/components/AppLayout';
import { useContext, useEffect } from 'react';
import { MapContext } from '../lib/context/MapContext';
import RestaurantsList from '../lib/presentation/components/RestaurantsList';
import Error from '../lib/presentation/components/Error';
const Home: NextPage = () => {
  const {
    setRestaurants,
    placeServices,
    keyword,
    setNoResult,
    setApiError,
    apiError,
  } = useContext(MapContext);
  const fetchData = async () => {
    let restaurants;
    try {
      // If there are keyword input previously, return the search result
      if (keyword) {
        restaurants = await placeServices?.querySearch(keyword);
      } else {
        // if not, return randomly selected restaurants
        restaurants = await placeServices?.getRestaurantsWithinRange(
          'restaurant',
          1000,
        );
      }
      setRestaurants(restaurants ? restaurants : []);
      setNoResult(false);
    } catch (e) {
      if (e === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        setNoResult(true);
      } else {
        setApiError(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [placeServices]);

  return <AppLayout>{apiError ? <Error /> : <RestaurantsList />}</AppLayout>;
};

export default Home;

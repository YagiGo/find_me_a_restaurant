import type { NextPage } from 'next';
import AppLayout from '../lib/presentation/components/AppLayout';
import { useContext, useEffect } from 'react';
import { MapContext } from '../lib/context/MapContext';
import RestaurantsList from '../lib/presentation/components/RestaurantsList';

const Home: NextPage = () => {
  const { setRestaurants, placeServices, keyword } = useContext(MapContext);
  const fetchData = async () => {
    const currentLocation = new google.maps.LatLng(35.664839, 139.738096);
    let restaurants;
    // If there are keyword input previously, return the search result
    if (keyword) {
      restaurants = await placeServices?.querySearch(keyword);
    } else {
      // if not, return randomly selected restaurants
      restaurants = await placeServices?.getRestaurantsWithinRange(
        currentLocation,
        'restaurant',
        1000,
      );
    }
    setRestaurants(restaurants ? restaurants : []);
  };

  useEffect(() => {
    fetchData();
  }, [placeServices]);

  return (
    <AppLayout>
      <RestaurantsList />
    </AppLayout>
  );
};

export default Home;

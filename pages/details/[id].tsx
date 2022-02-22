import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { MapContext } from '../../lib/context/MapContext';
import { Details } from '../../lib/entities/Details';
import AppLayout from '../../lib/presentation/components/AppLayout';
import RestaurantDetail from '../../lib/presentation/components/RestaurantDetail';
import Loading from '../../lib/presentation/components/Loading';
import Error from '../../lib/presentation/components/Error';

const RestaurantDetails: NextPage = () => {
  const { setRestaurants, placeServices, setApiError, apiError } =
    useContext(MapContext);
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState<Details>();
  const fetchData = async (id: string) => {
    try {
      const data = await placeServices?.getRestaurantDetails(id);
      if (!data) return;
      setDetails(data);
      setRestaurants([data.basicInfo]);
    } catch (e) {
      if (e === google.maps.places.PlacesServiceStatus.INVALID_REQUEST) {
        setApiError(true);
      }
    }
  };
  useEffect(() => {
    fetchData(String(id));
  }, [id, placeServices]);

  const renderView = () => {
    if (apiError) {
      return <Error />;
    } else if (details) {
      return <RestaurantDetail details={details} />;
    } else {
      return <Loading />;
    }
  };

  return <AppLayout>{renderView()}</AppLayout>;
};

export default RestaurantDetails;

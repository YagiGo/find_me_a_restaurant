import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { MapContext } from '../../lib/context/MapContext';
import { Details } from '../../lib/entities/Details';
import AppLayout from '../../lib/presentation/components/AppLayout';
import RestaurantDetail from '../../lib/presentation/components/RestaurantDetail';
import Loading from '../../lib/presentation/components/Loading';

const RestaurantDetails: NextPage = () => {
  const { setRestaurants, placeServices, setApiError, apiError } =
    useContext(MapContext);
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState<Details>();
  const fetchData = async (id: string) => {
    try {
      const data = await placeServices?.getRestaurantDetails(id);
      setDetails(data);
    } catch {
      setApiError(true);
    }
  };
  useEffect(() => {
    fetchData(String(id));
  }, [id]);

  useEffect(() => {
    if (!details) return;
    setRestaurants([details.basicInfo]);
  }, [details]);

  return (
    <AppLayout>
      {apiError && <h1>ERROR!</h1>}
      {!apiError && details ? (
        <RestaurantDetail details={details} />
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default RestaurantDetails;

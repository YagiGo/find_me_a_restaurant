import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { MapContext } from '../../lib/context/MapContext';
import { Details } from '../../lib/entities/Details';
import AppLayout from '../../lib/presentation/components/AppLayout';
import RestaurantDetail from '../../lib/presentation/components/RestaurantDetail';

const RestaurantDetails: NextPage = () => {
  const { setRestaurants, placeServices } = useContext(MapContext);
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState<Details>();
  const fetchData = async (id: string) => {
    const data = await placeServices?.getRestaurantDetails(id);
    setDetails(data);
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
      {details ? <RestaurantDetail details={details} /> : <h6>Loading</h6>}
    </AppLayout>
  );
};

export default RestaurantDetails;

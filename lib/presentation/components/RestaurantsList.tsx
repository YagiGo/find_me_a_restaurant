import { FC, useContext, useEffect, useState } from 'react';
import { Restaurant } from '../../entities/Restaurant';
import RestaurantCard from './RestaurantCard';
import { MapContext } from '../../context/MapContext';
import { Button } from 'react-bootstrap';

const RestaurantsList: FC = () => {
  const { restaurants } = useContext(MapContext);
  const [randomSelect, setRandomSelect] = useState<Restaurant>();
  const shuffleRestaurant = () => {
    setRandomSelect(
      restaurants[Math.floor(Math.random() * restaurants.length)],
    );
  };
  useEffect(() => {
    if (!restaurants) return;
    shuffleRestaurant();
  }, [restaurants]);

  const rows = restaurants.map((item) => (
    <RestaurantCard
      key={item.placeId}
      name={item.name}
      rating={item.rating}
      placeId={item.placeId ? item.placeId : ''}
      priceLevel={item.priceLevel}
    />
  ));
  console.log(restaurants);
  return (
    <div style={{ overflow: 'auto', height: '100vh' }}>
      <div className='p-2'>
        <h4>Hard to decide? How about this one!</h4>
        <div className='d-flex'>
          <Button onClick={shuffleRestaurant}>Shuffle</Button>
        </div>
      </div>
      {randomSelect ? (
        <RestaurantCard
          name={randomSelect.name}
          rating={randomSelect.rating}
          placeId={randomSelect.placeId ? randomSelect.placeId : ''}
          priceLevel={randomSelect.priceLevel}
        />
      ) : (
        <h6>Loading</h6>
      )}
      <h4 className='p-2'>Others options in this area</h4>
      {rows}
    </div>
  );
};

export default RestaurantsList;

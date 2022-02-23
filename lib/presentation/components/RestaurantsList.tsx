import { FC, useContext, useEffect, useState } from 'react';
import { Restaurant } from '../../entities/Restaurant';
import RestaurantCard from './RestaurantCard';
import { MapContext } from '../../context/MapContext';
import { Button } from 'react-bootstrap';
import NoResult from './NoResult';
import Loading from './Loading';

const RestaurantsList: FC = () => {
  const { restaurants, noResult, isSearching } = useContext(MapContext);
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

  const renderList = () => {
    if (noResult) {
      return <NoResult />;
    } else if (!randomSelect) {
      return <Loading />;
    } else {
      return (
        <div>
          <div className='p-2 d-flex flex-column'>
            <h4 className='p-2'>Hard to decide? How about this one!</h4>
            <Button onClick={shuffleRestaurant}>Shuffle</Button>
            <RestaurantCard
              name={randomSelect.name}
              rating={randomSelect.rating}
              placeId={randomSelect.placeId ? randomSelect.placeId : ''}
              priceLevel={randomSelect.priceLevel}
            />
          </div>
          <div className='p-2'>
            <h4 className='p-2'>Other options in this area</h4>
            {isSearching ? <Loading /> : rows}
          </div>
        </div>
      );
    }
  };
  return renderList();
};

export default RestaurantsList;

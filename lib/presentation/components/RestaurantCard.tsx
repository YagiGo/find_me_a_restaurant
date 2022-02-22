import React, { FC, useMemo } from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Style from '../style/RestaurantCard.module.scss';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faStar as faSolidStar,
  faStarHalfAlt,
  faDollar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import calculateRating from '../../utils/calculate';
import { useRouter } from 'next/router';

interface prop {
  name?: string;
  rating?: number;
  placeId: string;
  priceLevel?: number;
}
const RestaurantCard: FC<prop> = ({ name, rating, placeId, priceLevel }) => {
  const router = useRouter();

  const stars = useMemo(() => {
    return [1, 2, 3, 4, 5].map((num) => {
      const { integer, half } = calculateRating(rating ? rating : 0);
      if (integer >= num) return <FA key={num} icon={faSolidStar} />;
      if (half && half + 1 > num) return <FA key={num} icon={faStarHalfAlt} />;
      return <FA key={num} icon={faRegularStar} />;
    });
  }, [rating]);

  const price = useMemo(() => {
    return [1, 2, 3, 4, 5].map((num) => {
      const { integer } = calculateRating(priceLevel ? priceLevel : 0);
      if (integer >= num) return <FA key={num} icon={faDollar} />;
    });
  }, [priceLevel]);

  const goToDetailPage = () => {
    router.push(`/details/${placeId}`);
  };
  return (
    <Card onClick={goToDetailPage} className={`${Style.card}`}>
      <Card.Title className='px-2 overflow-auto'>{name}</Card.Title>
      <Card.Body className='pt-0'>
        <div className='price'>{price}</div>
        <div className='rating'>{stars}</div>
        <div>
          <Link href={`/details/${placeId}`}>Show More</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;

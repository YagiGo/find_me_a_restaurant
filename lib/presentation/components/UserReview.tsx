import React, { FC, useMemo } from 'react';
import { Card, Image } from 'react-bootstrap';
import calculateRating from '../../utils/calculate';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import {
  faStar as faSolidStar,
  faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
interface props {
  avatar: string;
  content: string;
  rating: number;
}
const UserReview: FC<props> = ({ avatar, content, rating }) => {
  const stars = useMemo(() => {
    return [1, 2, 3, 4, 5].map((num) => {
      const { integer, half } = calculateRating(rating ? rating : 0);
      if (integer >= num) return <FA key={num} icon={faSolidStar} />;
      if (half && half + 1 > num) return <FA key={num} icon={faStarHalfAlt} />;
      return <FA key={num} icon={faRegularStar} />;
    });
  }, [rating]);

  return (
    <Card
      className='p-3 mt-3 justify-content-start'
      style={{ height: '250px' }}
    >
      <div className='justify-content-between d-flex'>
        <Image src={avatar} roundedCircle style={{ width: '32px' }} alt='' />
        <span className='text-warning'>{stars}</span>
      </div>
      <div className='overflow-auto mt-3'>{content}</div>
    </Card>
  );
};

export default UserReview;

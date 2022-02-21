import React, { FC, useMemo } from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { Details } from '../../entities/Details';
import { Image } from 'react-bootstrap';
import {
  faLocationDot,
  faPhone,
  faStar as faSolidStar,
  faStarHalfAlt,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import calculateRating from '../../utils/calculate';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import UserReview from './UserReview';
import Style from '../style/RestaurantDetail.module.scss';

interface props {
  details: Details;
}
const RestaurantDetail: FC<props> = ({ details }) => {
  const { basicInfo, address, phone, homepage, photos, reviews } = details;
  const rating = basicInfo.rating;
  const isOpen = details.basicInfo.openingHours?.isOpen();
  const openingHours = details.basicInfo.openingHours?.weekday_text?.map(
    (time) => <li key={time}>{time}</li>,
  );
  const stars = useMemo(() => {
    return [1, 2, 3, 4, 5].map((num) => {
      const { integer, half } = calculateRating(rating ? rating : 0);
      if (integer >= num) return <FA key={num} icon={faSolidStar} />;
      if (half && half + 1 > num) return <FA key={num} icon={faStarHalfAlt} />;
      return <FA key={num} icon={faRegularStar} />;
    });
  }, [rating]);

  const imgs = photos.map((photo) => (
    <Image
      key={photo.id}
      rounded
      alt=''
      src={photo.url}
      style={{ height: '128px' }}
    />
  ));
  const comments = reviews.map((review) => (
    <UserReview
      avatar={review.avatar}
      content={review.content}
      rating={review.rating}
      key={review.id}
    />
  ));
  return (
    <div className={`p-2 ${Style.detail} bg-light`}>
      <div className='overview p-3 d-flex justify-content-around flex-column'>
        <h4>{basicInfo.name}</h4>
        <div className='pb-2' style={{ color: 'var(--bs-warning)' }}>
          {stars}
        </div>
        <div className='mb-5'>
          {isOpen ? (
            <h5 style={{ color: 'var(--bs-success)' }}>Opening</h5>
          ) : (
            <h5 style={{ color: 'var(--bs-danger)' }}>Closed</h5>
          )}
        </div>
      </div>
      <div className='bg-light p-3 opening-hours overflow-auto'>
        <h5>Opening Hours</h5>
        {openingHours ? (
          <ul>{openingHours}</ul>
        ) : (
          <h6>Opening Hours unknown</h6>
        )}
      </div>
      <div className='bg-light p-3 info overflow-auto'>
        <h5>Information</h5>
        <div className='pt-2'>
          <FA className='px-2 fa-fw text-primary' icon={faLocationDot} />
          {address}
        </div>
        <div className='py-2'>
          <FA className='px-2 fa-fw text-primary' icon={faPhone} />
          {phone ? (
            <a href={`tel:${phone}`}>{phone}</a>
          ) : (
            <span>Phone number unavailable.</span>
          )}
        </div>
        <div className='py-2'>
          <FA
            className='px-2 fa-fw text-primary'
            icon={faArrowUpRightFromSquare}
          />
          {homepage ? (
            <a href={homepage} target='_blank' rel='noreferrer'>
              {homepage}
            </a>
          ) : (
            <span>Homepage unavailable</span>
          )}
        </div>
      </div>

      <div className='bg-light p-3 photo'>
        <h5>Photos</h5>
        <div className='d-flex flex-wrap justify-content-center'>
          {imgs ? imgs : <span>There is no photo available.</span>}
        </div>
      </div>
      <div className='review p-3 bg-light'>
        <h5>Reviews</h5>
        <div>
          {comments.length > 0 ? comments : <span>There is no review yet</span>}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

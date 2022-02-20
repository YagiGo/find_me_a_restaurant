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
import Style from '../style/RestaurantDetail.module.scss';
import calculateRating from '../../utils/calculate';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

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
    <p key={review.id}>
      <span>
        <Image
          src={review.avatar}
          roundedCircle
          style={{ width: '32px' }}
          alt=''
        />
      </span>
      {review.content} <span>{review.rating}</span>
    </p>
  ));
  return (
    <div
      style={{ height: '100vh', overflow: 'auto' }}
      className={`p-2 ${Style.detail}`}
    >
      <h4>{basicInfo.name}</h4>
      <div className='pb-2' style={{ color: 'var(--bs-warning)' }}>
        {stars}
      </div>
      <div>
        {isOpen ? (
          <h5 style={{ color: 'var(--bs-success)' }}>Opening</h5>
        ) : (
          <h5 style={{ color: 'var(--bs-danger)' }}>Closed</h5>
        )}
      </div>
      <div>
        <h5>Opening Hours</h5>
        {openingHours ? (
          <ul>{openingHours}</ul>
        ) : (
          <h6>Opening Hours unknown</h6>
        )}
      </div>
      <div className=''>
        <h5>Information</h5>
        <div className='pt-2'>
          <FA className='px-2 fa-fw' icon={faLocationDot} />
          {address}
        </div>
        <div className='py-2'>
          <FA className='px-2 fa-fw' icon={faPhone} />
          {phone ? (
            <a href={`tel:${phone}`}>{phone}</a>
          ) : (
            <span>Phone number available.</span>
          )}
        </div>
        <div className='py-2'>
          <FA className='px-2 fa-fw' icon={faArrowUpRightFromSquare} />
          {homepage ? (
            <a href={homepage} target='_blank' rel='noreferrer'>
              {homepage}
            </a>
          ) : (
            <span>Homepage available</span>
          )}
        </div>
      </div>

      <div>
        <h5>Photos</h5>
        <div className='d-flex flex-wrap justify-content-center'>
          {imgs ? imgs : <span>There is no photo available.</span>}
        </div>
      </div>
      <div>
        <h5>Reviews</h5>
        <div>{comments ? comments : <span>There is no review yet</span>}</div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

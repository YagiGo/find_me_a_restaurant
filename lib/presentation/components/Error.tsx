import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

const Error = () => {
  return (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <div className='text-muted text-center'>
        <FA icon={faCircleQuestion} className='fa-8x' />
        <h3>
          There seemed to be a problem:( <br />
          try again later.
        </h3>
      </div>
    </div>
  );
};

export default Error;

import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <div className='text-muted'>
        <FA icon={faSpinner} className='fa-8x fa-spin' />
      </div>
    </div>
  );
};

export default Loading;

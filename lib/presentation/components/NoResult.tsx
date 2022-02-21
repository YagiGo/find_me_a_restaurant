import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

const NoResult = () => {
  return (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <div className='text-muted'>
        <FA icon={faFolderOpen} className='fa-8x' />
        <h3>No Result</h3>
      </div>
    </div>
  );
};

export default NoResult;

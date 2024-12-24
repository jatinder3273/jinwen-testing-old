'use client';
import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-[100vh] w-[100%]'>
      <ReactLoading
        type='bubbles'
        color={'#1d8fda'}
        height={'20%'}
        width={'10%'}
      />
    </div>
  );
};

export default Loading;

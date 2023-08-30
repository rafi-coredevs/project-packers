import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return <>
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-center text-7xl lg:text-[10rem] font-extrabold text-secondary flex mx-auto'>
          Oops<p className='origin-bottom animate-wiggle'>!</p>
        </h1>
        <p className='font-semibold text-xl lg:text-2xl text-secondary my-10'>404 - Page not Found</p>
        <Link to='/' className='bg-primary rounded-full p-4'>Go to Homepage</Link>
      </div>
    </div>
  </>;
};

export default ErrorPage;

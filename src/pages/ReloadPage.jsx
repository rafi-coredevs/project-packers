import React from 'react';

const ReloadPage = () => {
  return <>
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className='w-2/5 p-1 border-2 border-primary rounded-full'>
        <div className='relative rounded-full overflow-hidden'>
          <p className='text-center font-extrabold text-5xl py-3 text-secondary'>Loading...</p>
          <span className='w-[200%] h-full bg-primary absolute top-0 z-10 animate-coming' />
          <p className='w-full text-center font-extrabold text-5xl py-3 text-outline absolute z-30 top-0'>Loading...</p>
        </div>
      </div>
    </div>
  </>;
};

export default ReloadPage;

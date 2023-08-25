import React from 'react';
import chat_icon from '../../../../assets/chat_icon.png';

const EmptyMassage = () => {
  return (
    <div className='col-span-12 sm:col-span-9 relative bg-[#E2E8F0]'>
      <div className='w-auto h-screen flex items-center justify-center'>
        <img
          src={chat_icon}
          alt='chat_icon'
          className='w-48 opacity-10 cursor-default animate-wiggle'
        />
      </div>
    </div>

  );
};

export default EmptyMassage;

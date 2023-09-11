import React from 'react';
import chat_icon from '../../../../assets/chat_icon.png';

const EmptyMassage = () => {
  return <div className='flex items-center justify-center h-full'>
    <img
      src={chat_icon}
      alt='chat_icon'
      className='w-60 opacity-10 cursor-default animate-wiggle'
    />
  </div>
};

export default EmptyMassage;

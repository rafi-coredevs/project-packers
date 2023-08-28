import React from 'react';
import chat_icon from '../../../../assets/chat_icon.png';

const EmptyMassage = () => {
  return <div className='w-full h-screen flex items-center justify-center'>
    <img
      src={chat_icon}
      alt='chat_icon'
      className='w-60 opacity-10 cursor-default animate-wiggle'
    />
  </div>
};

export default EmptyMassage;

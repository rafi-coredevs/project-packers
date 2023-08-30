import React from 'react';
import logo from '../assets/logo.svg'

const ReloadPage = () => {
  return <>
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <img src={logo} className='w-8 animate-scale' />
    </div>
  </>;
};

// const ReloadPage = () => {
//   return <>
//     <div className='min-h-screen flex flex-col justify-center items-center'>
//       <div className='w-[80%] md:w-[20%] p-1 border-2 border-primary rounded-full'>
//         <div className='relative rounded-full overflow-hidden'>
//           <p className='text-center font-extrabold text-2xl py-3 text-secondary'>Loading...</p>
//           <span className='w-[200%] h-full bg-primary absolute top-0 z-10 animate-coming' />
//           <p className='w-full text-center font-extrabold text-2xl py-3 text-outline absolute z-30 top-0'>Loading...</p>
//         </div>
//       </div>
//     </div>
//   </>;
// };

export default ReloadPage;

import React, { useState } from 'react';

const ComingSoon = () => {return <>
        <div className='min-h-[60vh] flex flex-col justify-center items-center'>
            <div className='w-[70%] md:w-[20%] p-1 border-2 border-primary rounded-full'>
                <div className='relative rounded-full overflow-hidden'>
                    <p className='text-center font-extrabold text-2xl py-3 text-secondary'>Coming Soon</p>
                    <span className='w-[150%] h-[10vh] bg-primary absolute -top-5 -z-10 animate-coming skew-x-[50deg]' />
                    {/* <p className='w-full text-center font-extrabold text-2xl py-3 text-outline absolute z-30 top-0'>Coming Soon</p> */}
                </div>
            </div>
        </div>
    </>


};

export default ComingSoon;

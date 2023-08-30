import React, { useState } from 'react';
import Button from '../Components/UiElements/Buttons/Button';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
    // return (
    //     <div className='min-h-[70vh] flex flex-col justify-center items-center font-semibold space-y-3'>
    //         <p className='text-[10vw] md:text-[6vw] space-x-3 text-secondary'>
    //             <span>Coming</span>
    //             <span>Soon</span>
    //             <span className='text-primary'>...</span>
    //         </p>
    //         <Link to={'/'}>
    //             <Button type="primary" full className='px-32'>
    //                 Go to Home
    //             </Button>
    //         </Link>
    //     </div>
    // );

    return <>
        <div className='min-h-[60vh] flex flex-col justify-center items-center'>
            <div className='w-2/5 p-1 border-2 border-primary rounded-full'>
                <div className='relative rounded-full overflow-hidden'>
                    <p className='text-center font-extrabold text-5xl py-3 text-secondary'>Coming Soon</p>
                    <span className='w-[200%] h-full bg-primary absolute top-0 z-10 animate-coming' />
                    <p className='w-full text-center font-extrabold text-5xl py-3 text-outline absolute z-30 top-0'>Coming Soon</p>
                </div>
            </div>
        </div>
    </>


};

export default ComingSoon;

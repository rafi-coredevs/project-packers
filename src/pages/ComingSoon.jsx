import React from 'react';
import Button from '../Components/UiElements/Buttons/Button';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
    return (
        <div className='min-h-[70vh] flex flex-col justify-center items-center font-semibold space-y-3'>
            <p className='text-[10vw] md:text-[6vw] space-x-3 text-secondary'>
                <span>Coming</span>
                <span>Soon</span>
                <span className='text-primary'>...</span>
            </p>
            <Link to={'/'}>
                <Button type="primary" full className='px-32'>
                    Go to Home
                </Button>
            </Link>
        </div>
    );
};

export default ComingSoon;
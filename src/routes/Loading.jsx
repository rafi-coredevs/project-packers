import React from 'react'
import frame from '../assets/Frame.png';

export default function Loading() {
    return (
        <div className='w-full min-h-screen'>
            <img src={frame} alt="" className='h-[200vh]' /> 
        </div>
    )
}

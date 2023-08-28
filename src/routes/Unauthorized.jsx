import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
    return (
        <div className='w-full min-h-screen bg-slate-100 flex flex-col justify-center items-center'>
            <span className=' text-2xl text-black font-semibold px-2 py-1 rounded-full'> You Are Not Unauthorized ! </span>
        </div>
    )
}

import React from 'react'

export default function Loading() {
    return (
        <div className='w-full min-h-screen bg-slate-100 flex flex-col justify-center items-center'>
            <span className='bg-secondary text-primary text-3xl font-semibold px-2 py-1 rounded-full'>... Loading ...</span>
        </div>
    )
}

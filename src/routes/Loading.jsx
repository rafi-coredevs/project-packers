import React from 'react'
import frame from '../assets/Frame.png';

export default function Loading() {
    // return (
    //     <div className='w-full min-h-screen'>
    //         <img src={frame} alt="" className='h-[200vh]' /> 
    //     </div>
    // )
    return <div className="grid grid-cols-12 font-inter">
        <div className="col-span-12">
            <div className="sticky top-0 mt-0 pt-0  bg-white z-50 border-b border-gray-300">
                <div className="mx-6 hidden  sm:flex navbar gap-4 py-[10px] items-center justify-between">
                    <div
                        className="w-[142px] h-11 justify-start items-center gap-2 inline-flex flex-shrink-0"
                    >
                        <div className='w-40 h-11 lazy-loading' />
                    </div>
                    <div className="min-w-[650px] h-10 border rounded-md lazy-loading" />
                    <div className="flex gap-10 items-center">
                        <div className="flex gap-2 items-center">
                            <div className='w-10 h-10 rounded-full lazy-loading' />
                            <div>
                                <div
                                    className="flex gap-2 items-center cursor-pointer"
                                >
                                    <div className='w-10 h-10 rounded-full lazy-loading' />
                                    <p className="px-14 py-1 lazy-loading"><span className='opacity-0'>user</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-span-2 h-[calc(100vh-68px)] hidden sm:block">
            <nav className='w-full h-full overflow-hidden bg-[#efefef] pt-4 border-r'>
                <div className='w-full'>
                    <ul className='mx-auto flex flex-col gap-4'>
                        <li className='w-64 h-10 lazy-loading'></li>
                        <li className='w-64 h-10 lazy-loading'></li>
                        <li className='w-64 h-10 lazy-loading'></li>
                        <li className='w-64 h-10 lazy-loading'></li>
                        <li className='w-64 h-10 lazy-loading'></li>
                        <li className='w-64 h-10 lazy-loading'></li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="col-span-12 sm:col-span-10  shadow-md overflow-y-auto h-full sm:h-[calc(100vh-68px)]">
            <div className="h-full px-5">
                <div className='my-3 w-full h-16 lazy-loading border-b' />
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-3">
                        <div className='h-32 w-full lazy-loading' />
                    </div>
                    <div className="col-span-3 grid gap-5 grid-cols-7">
                        <div className="col-span-7 sm:col-span-5">
                            <div className="w-full h-[30rem] border border-[#0000001f] rounded-md lazy-loading" />
                        </div>
                        <div className="col-span-7 sm:col-span-2">
                            <div className="w-full h-[30rem] border border-[#0000001f] rounded-md lazy-loading" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 col-span-12 sm:col-span-10">
                    <div className="w-full h-72 border border-[#0000001f] rounded-md lazy-loading" />
                </div>
            </div>
        </div>
    </div>
}

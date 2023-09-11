import construction from '../assets/warning_2827410.png';

const ComingSoon = () => {
    return <>
        <div
            className='min-h-[80vh] flex flex-col justify-center items-center'
            // style={{
            //     backgroundImage: `linear-gradient(#ffffffec, #ffffffec), url(${construction})`,
            //     backgroundRepeat: 'no-repeat',
            //     backgroundPosition: 'center'
            // }}
        >
            <div className='w-full flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-center text-7xl lg:text-[10rem] font-extrabold text-secondary flex mx-auto'>
                        Oops<p className='origin-bottom animate-wiggle text-primary'>!</p>
                    </h1>
                    <p className='font-semibold text-2xl lg:text-4xl text-secondary mt-8 mb-7'>under construction</p>
                </div>
            </div>

            {/* <div className='w-[70%] md:w-[20%] p-1 border-2 border-primary rounded-full my-8 group'>
                <div className='relative rounded-full overflow-hidden'>
                    <p className='text-center font-extrabold text-2xl py-3 text-secondary'>Coming Soon</p>
                    <span className='w-[150%] h-[10vh] bg-primary absolute -top-5 -left-[200%] z-10 group-hover:animate-coming skew-x-[50deg]' />
                    <p className='w-full text-center font-extrabold text-2xl py-3 text-outline absolute z-30 top-0'>Coming Soon</p>
                </div>
            </div> */}
        </div>
    </>
};

export default ComingSoon;

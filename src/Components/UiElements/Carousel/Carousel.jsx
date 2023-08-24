import React, { useEffect, useState } from "react";

/**
 * YouTube Shots
 * @param {Boolean} isHome location home page true / other page false  
 * @returns YouTube Shots Component
 */
const Carousel = ({ isHome = Boolean }) => {
    const value = isHome
    const [slides, setSlides] = useState();
    useEffect(() => {
        const options = { method: 'GET' };
        fetch('/youtubeLink.json', options)
            .then(response => response.json())
            .then(response => setSlides(response))
            .catch(err => console.error(err))
    }, [])

    return <section
        className={`max-w flex gap-4 w-full px-5 overflow-scroll no-scrollbar 
            ${isHome && '-mb-12 relative -top-10 z-40'}`}
    >
        {
            slides?.map((slide, i) => <React.Fragment key={i}>
                <iframe
                    title="YouTube Short Video"
                    src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=0&loop=1&playlist=${slide.videoId}&controls=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className='rounded-2xl h-[370px] w-[260px]'
                />
            </React.Fragment>)
        }
    </section>
};

export default Carousel;

import React, { useEffect, useState } from 'react';

/**
 * YouTube Shots
 * @param {Boolean} isHome location home page true / other page false
 * @returns YouTube Shots Component
 */
const Carousel = ({ isHome = Boolean }) => {
	const value = isHome;
	const slides = [
		{
			videoId: 'dqeklvD30EA',
		},
		{
			videoId: 'gcJe6Hhwiaw',
		},
		{
			videoId: 'CKySIlyliMg',
		},
		{
			videoId: 'V9Z7_6HCPsA',
		},
	];

	return (
		<section
			className={`max-w flex gap-2 md:gap-[1.8rem] w-full px-5 overflow-scroll no-scrollbar 
                 ${isHome && '-mb-12 relative -top-10 z-20'}`}
		>
			{slides?.map((slide, i) => (
				<React.Fragment key={i}>
					<iframe
						title='YouTube Short Video'
						src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=0&loop=1&playlist=${slide.videoId}&controls=0`}
						allow='autoplay; encrypted-media'
						allowFullScreen
						className='rounded-2xl h-[25rem] w-[17.6875rem] mx-auto'
					/>
				</React.Fragment>
			))}
		</section>
	);
};

export default Carousel;

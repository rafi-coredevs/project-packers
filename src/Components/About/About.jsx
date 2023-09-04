import Player from '../UiElements/Player/Player';
import Query from '../UiElements/Query/Query';
import video from '../../assets/Image/video1.mp4';

/**
 * About Section
 *
 * @returns JSX Element
 */
const About = () => {
	return (
		<div className=' bg-[#cff6ef33]'>
			<div className='container flex justify-evenly flex-wrap  mx-auto my-[2.1rem] sm:my-[4.7rem] py-12 sm:py-24 px-5 sm:px-0'>
				<div className='mb-8'>
					<p className='text-secondary text-[28px] sm:text-[32px] font-semibold font-sans m-0 '>
						How Project Packers works
					</p>
					<p className='mt-4 max-w-[490px] font-sans text-base text-[#475569]'>
						Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
						sint. Velit officia consequat duis enim velit mollit. Exercitation
						veniam consequat sunt nostrud amet.
					</p>
					<div className='sm:h-auto sm:w-[595px] mt-[32px] rounded-[30px] overflow-hidden'>
						<Player url={video} />
					</div>
				</div>
				<div className=''>
					<Query
						title='Tell us about the item you are looking for'
						description='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
					/>
					<Query
						title='Tell us about the item you are looking for'
						description='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
					/>
					<Query
						title='Tell us about the item you are looking for'
						description='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
					/>
					<Query
						title='Tell us about the item you are looking for'
						description='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
					/>
				</div>
			</div>
		</div>
	);
};

export default About;

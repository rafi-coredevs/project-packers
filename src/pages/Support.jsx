import { useState } from 'react';

import Input from '../Components/UiElements/Input/Input';
import search from '../assets/icons/cd-search2.svg';
import bKash from '../assets/bKash.png';
import bKashPay from '../assets/bKashPay.png';
import { Link } from 'react-router-dom';
// import Button from '../Components/UiElements/Buttons/Button';
const Support = () => {
	const [activeContent, setActiveContent] = useState('3');
	// Function to handle content change
	const handleContentChange = (content) => {
		setActiveContent(content);
	};

	return (
		<main className='min-h-screen'>
			<div className='bg-secondary py-14 hidden sm:block'>
				<div className='container mx-auto'>
					<div className='flex justify-between items-center'>
						<h1 className='text-white text-[48px] font-semibold'>
							Support Center
						</h1>
						<Input type='text' placeholder='Search...'>
							<img src={search} alt='' />
						</Input>
					</div>
				</div>
			</div>
			<div className='container mx-auto my-12 flex items-start flex-col md:flex-row gap-12 md:gap-[4.12rem]'>
				<div className='w-full md:w-[17.4375rem]'>
          {/* sidebar title */}
					<div className='font-semibold w-full text-xl text-[#124E58] p-[0.625rem]'>
						Articles in this section
						<hr className='mt-3 w-full' />
					</div>
          {/* sidebar buttons */}
					<div className='flex flex-nowrap items-start flex-row overflow-x-scroll  md:flex-col w-full md:w-[17.4375rem] gap-[0.625rem]'>
						{/* 1 */}
						<SupportMenuButton
							buttonName={'How do I pay for items?'}
							activeContent={activeContent}
							onClick={() => handleContentChange('1')}
							activeNumber='1'
						/>

						{/* 2 */}
						<SupportMenuButton
							buttonName={'	What is Backpack? How do I order items?'}
							activeContent={activeContent}
							onClick={() => handleContentChange('2')}
							activeNumber='2'
						/>

						{/* 3 */}
						<SupportMenuButton
							buttonName={'How do I pay for items?'}
							activeContent={activeContent}
							onClick={() => handleContentChange('3')}
							activeNumber='3'
						/>

						{/* 4 */}

						<SupportMenuButton
							buttonName={'	What is Backpack? How do I order items?'}
							activeContent={activeContent}
							onClick={() => handleContentChange('4')}
							activeNumber='4'
						/>

						{/* 5 */}
						<SupportMenuButton
							buttonName={'	What is Backpack? How do I order items?'}
							activeContent={activeContent}
							onClick={() => handleContentChange('5')}
							activeNumber='5'
						/>

						{/* 6 */}

						<SupportMenuButton
							buttonName={'	What is Backpack? How do I order items?'}
							activeContent={activeContent}
							onClick={() => handleContentChange('6')}
							activeNumber='6'
						/>
					</div>
				</div>

				<div className='w-full px-4 lg:pr-60'>
					{/* Conditional rendering based on activeContent */}
					{activeContent === '1' && <Content1 />}
					{activeContent === '2' && <Content2 />}
					{activeContent === '3' && <Content3 />}
					{activeContent === '4' && <Content4 />}
					{activeContent === '5' && <Content5 />}
					{activeContent === '6' && <Content6 />}
				</div>
			</div>
		</main>
	);
};

export default Support;

// support button
const SupportMenuButton = ({
	activeContent,
	activeNumber,
	buttonName,
	...eventHandler
}) => {
	return (
		<button
			{...eventHandler}
			className={`p-[0.75rem] text-slate-600 flex items-center gap-2 w-full  ${
				activeContent === activeNumber &&
				'bg-[#F2C852] text-black rounded-[3.125rem]'
			}  `}
		>
			<div className={`w-2 h-2 rounded-full bg-slate-600 `}></div>
			<p className=' text-start text-base flex-nowrap font-normal w-max md:w-full'>
				{buttonName}
			</p>
		</button>
	);
};

// Components for different content
const Content1 = () => {
	return <div>Coming soon...</div>;
};

const Content2 = () => {
	return <div>Coming soon...</div>;
};

const Content3 = () => {
	return (
		<div>
			<div className='flex flex-col gap-12'>
				{/* How to pay */}
				<div>
					<h2 className='text-[2rem] text-[#124E58] font-semibold mb-4'>
						How do I pay for items?
					</h2>
					<p className='text-base text-slate-600 font-normal'>
						Currently, we accept payments by bKash, bank deposit/Electronic Fund
						Transfer (EFT), through credit/debit cards like VISA or MasterCard,
						or using internet banking with the SSLCommerz gateway. Also, if you
						want to pay with USD, you can use your PayPal account or in case you
						have a dual currency/international debit/credit card, you can choose
						the Stripe gateway.
					</p>
				</div>

				{/* bKash barcode */}
				<div>
					<h2 className='text-[2rem] text-[#124E58] font-semibold mb-4'>bKash</h2>
					<p className='text-base text-slate-600 font-normal'>
						This is one of our more popular payment methods and if you have
						access to a personal bKash wallet, you can easily send payment for
						your item to our merchant wallet number.
					</p>
				</div>
				<div>
					<img src={bKash} alt='' />
				</div>
				{/* step 1 */}
				<div>
					<h2 className='text-[2rem] text-[#124E58] font-semibold mb-4'>Step 1</h2>
					<p className='text-base text-slate-600 font-normal'>
						Check out with the item in your cart or hit Buy Now to take an item
						to checkout directly from the item page.
					</p>
				</div>
				{/* step 2 */}
				<div>
					<h2 className='text-[2rem] text-[#124E58] font-semibold mb-4'>Step 2</h2>
					<p className='text-base text-slate-600 font-normal'>
						After selecting preferred delivery method, in the next section,
						select “Pay via bKash (BDT)”
					</p>
					<div>
						<img src={bKashPay} alt='' />
					</div>
				</div>
			</div>

			{/* like dislike */}
			<div className='flex flex-col items-center justify-center mt-24'>
				<p className='text-lg font-medium text-slate-600 mb-4'>
					Was this article helpful?
				</p>
				<div className='flex items-center gap-2'>
					{/* yes */}
					<div className='flex items-center gap-1 border p-2 border-[#124E58] rounded cursor-pointer'>
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
							>
								<path
									d='M2 12C2 10.8954 2.89543 10 4 10C5.65685 10 7 11.3431 7 13V17C7 18.6569 5.65685 20 4 20C2.89543 20 2 19.1046 2 18V12Z'
									stroke='#124E58'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M15.4787 7.30626L15.2124 8.16634C14.9942 8.87111 14.8851 9.22349 14.969 9.5018C15.0369 9.72695 15.1859 9.92102 15.389 10.0487C15.64 10.2065 16.0197 10.2065 16.7791 10.2065H17.1831C19.7532 10.2065 21.0382 10.2065 21.6452 10.9673C21.7145 11.0542 21.7762 11.1467 21.8296 11.2437C22.2965 12.0921 21.7657 13.2351 20.704 15.5211C19.7297 17.6189 19.2425 18.6678 18.338 19.2852C18.2505 19.3449 18.1605 19.4013 18.0683 19.4541C17.116 20 15.9362 20 13.5764 20H13.0646C10.2057 20 8.77628 20 7.88814 19.1395C7 18.2789 7 16.8939 7 14.1239V13.1503C7 11.6946 7 10.9668 7.25834 10.3006C7.51668 9.63441 8.01135 9.08664 9.00069 7.99112L13.0921 3.46056C13.1947 3.34694 13.246 3.29012 13.2913 3.25075C13.7135 2.88328 14.3652 2.92464 14.7344 3.34235C14.774 3.3871 14.8172 3.44991 14.9036 3.57554C15.0388 3.77205 15.1064 3.87031 15.1654 3.96765C15.6928 4.83913 15.8524 5.87436 15.6108 6.85715C15.5838 6.96692 15.5488 7.0801 15.4787 7.30626Z'
									stroke='#124E58'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
						<span>Yes</span>
					</div>

					{/* No */}
					<div className='flex items-center gap-1 border p-2 border-[#124E58] rounded cursor-pointer'>
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
							>
								<path
									d='M2 11C2 12.1046 2.89543 13 4 13C5.65685 13 7 11.6569 7 10V6C7 4.34315 5.65685 3 4 3C2.89543 3 2 3.89543 2 5V11Z'
									stroke='#124E58'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M15.4787 15.6937L15.2124 14.8337C14.9942 14.1289 14.8851 13.7765 14.969 13.4982C15.0369 13.2731 15.1859 13.079 15.389 12.9513C15.64 12.7935 16.0197 12.7935 16.7791 12.7935H17.1831C19.7532 12.7935 21.0382 12.7935 21.6452 12.0327C21.7145 11.9458 21.7762 11.8533 21.8296 11.7563C22.2965 10.9079 21.7657 9.76487 20.704 7.4789C19.7297 5.38111 19.2425 4.33222 18.338 3.71485C18.2505 3.65508 18.1605 3.5987 18.0683 3.54586C17.116 3 15.9362 3 13.5764 3H13.0646C10.2057 3 8.77628 3 7.88814 3.86053C7 4.72106 7 6.10607 7 8.87607V9.84966C7 11.3054 7 12.0332 7.25834 12.6994C7.51668 13.3656 8.01135 13.9134 9.00069 15.0089L13.0921 19.5394C13.1947 19.6531 13.246 19.7099 13.2913 19.7493C13.7135 20.1167 14.3652 20.0754 14.7344 19.6577C14.774 19.6129 14.8172 19.5501 14.9036 19.4245C15.0388 19.228 15.1064 19.1297 15.1654 19.0323C15.6928 18.1609 15.8524 17.1256 15.6108 16.1429C15.5838 16.0331 15.5488 15.9199 15.4787 15.6937Z'
									stroke='#124E58'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
						<span>No</span>
					</div>
				</div>
				<div className='mt-16'>
					<span className='text-lg text-slate-600 font-medium'>
						Have more questions?
					</span>{' '}
					<Link className='text-[#3E949A] text-lg font-medium underline'>
						{' '}
						Submit a request
					</Link>
				</div>
			</div>
		</div>
	);
};

const Content4 = () => {
	return <div>Coming soon...</div>;
};

const Content5 = () => {
	return <div>Coming soon...</div>;
};

const Content6 = () => {
	return <div>Coming soon...</div>;
};

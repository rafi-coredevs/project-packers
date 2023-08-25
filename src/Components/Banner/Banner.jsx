/**
 * Banner section have 2 state
 * isOpen for modal show and hide
 * modalState for changing elements in modal
 *
 * @returns JSX Element
 */

import { useEffect, useState } from 'react';
import Input from '../UiElements/Input/Input';
import Button from '../UiElements/Buttons/Button';
import check from '../../assets/icons/cd-checkmark-circle.svg';
import image from '../../assets/Image/bannerImage.png';
import search from '../../assets/icons/cd-search2.svg';
import Modal from '../UiElements/Modal/Modal';
import RequestModal from './RequestModal';
import SuccessModal from './SuccessModal';
import { useLocation, useNavigate } from 'react-router-dom';
const Banner = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalState, setModalState] = useState('request');
	const [url, setUrl] = useState('');
	const location = useLocation();
	const successModal = location?.state;
	const navigate = useNavigate();

	useEffect(() => {
		if (successModal) {
			setModalState('success');
			setIsOpen(true);
		}
	}, [successModal]);

	const submitHandler = (e) => {
		e.preventDefault();
		setUrl(e.target[0].value);
		setIsOpen(true);
		e.target[0].value = '';
	};
	const handleOnClose = () => {
		if (successModal) {
			navigate('/');
		}
		setIsOpen(false);
		setModalState('request');
	};
	const modalSbmitHandler = (value) => {
		setModalState(value);
	};
	return (
		<div className='bg-secondary pb-[13rem] overflow-hidden '>
			<div className='relative z-10 right-[-48rem] bottom-[-75rem] flex justify-center items-center'>
				<span className='absolute w-[150rem] h-[150rem] rounded-full border border-white opacity-25'></span>
				<span className='absolute w-[120rem] h-[120rem] rounded-full border border-white opacity-25'></span>
				<span className='absolute w-[90rem] h-[90rem] rounded-full border border-white opacity-25'></span>
			</div>
			<div className='container mx-auto grid grid-cols-2 relative z-20 justify-center flex-wrap '>
				<div className='pt-24 pb-0 sm:pb-24 px-4 col-span-2 sm:col-span-1 '>
					<div className=''>
						<p className='font-sans font-bold md:text-[52px] text-[32px] text-white'>
							Shop products from USA and save up to 40%
						</p>
						<p className='font-sans font-medium text-white opacity-70 text-[20px] max-w-[580px]'>
							Thousands of deals on gadgets, shoes, cosmetics, watches -
							everything from the US.
						</p>
					</div>
					<form onSubmit={submitHandler} action=''>
						<div className='flex mt-5 flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-0'>
							<div className='w-full'>
								<Input
									icon='search'
									type='text'
									name='search'
									placeholder='Paste Product url here'
								>
									<img src={search} alt='' className='py-5' />
								</Input>
							</div>
							<Button buttonType='submit' type='primary'>
								Create Request
							</Button>
						</div>
					</form>
					<div className='hidden md:block'>
						<div className='flex gap-[30px] mt-[5em]'>
							<div className='flex gap-2 items-start'>
								<img src={check} alt='' />
								<p className='text-white text-[14px] font-sans w-[145px] font-bold'>
									Receive your product in 1–2 weeks
								</p>
							</div>
							<div className='flex gap-2 items-start '>
								<img src={check} alt='' />
								<p className='text-white text-[14px] font-sans w-[145px] font-bold'>
									Receive your product in 1–2 weeks
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='col-span-2 sm:col-span-1'>
					<img className='w-full h-auto' src={image} />
				</div>
			</div>
			<Modal show={isOpen} onClose={handleOnClose}>
				{modalState === 'request' && (
					<RequestModal url={url} confirmSubmit={modalSbmitHandler} />
				)}
				{modalState === 'success' && (
					<SuccessModal setUrl={setUrl} confirmSubmit={modalSbmitHandler} />
				)}
			</Modal>
		</div>
	);
};

export default Banner;

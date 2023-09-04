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
import LoginModal from '../MobileModal/LoginModal';

/**
 * React component for displaying a banner section.
 * @returns {JSX.Element} Banner component JSX
 */
const Banner = () => {
	const [isOpen, setIsOpen] = useState(false); // for modal open and close
	const [modalState, setModalState] = useState('request'); // for modal type
	const [loginModal, setLoginModal] = useState(false); // for showing login modal if user is not logged in
	const [requestData, setRequestData] = useState({}); // for sending request item data to login modal
  const [successModalState, setSuccessModalState] = useState(null); // for setting modal type from login modal
	const [url, setUrl] = useState(''); // for storing url
	const location = useLocation();
	const successModal = location?.state;
	const navigate = useNavigate();
	

  // for showing request successful modal after login
	useEffect(() => {

    // for big screen
		if (successModal) {
			setModalState('success');
			setIsOpen(true);
		}

    // for mobile devices
		if (successModalState === 'success') {
			setModalState('success');
			setIsOpen(true);
		}
	}, [successModal, successModalState]);
	

	/**
	 * Handles the form submission
	 * @param {Event} e - The form submission event.
	 */
	const submitHandler = (e) => {
		e.preventDefault();
		setUrl(e.target[0].value);
		setIsOpen(true);
		e.target[0].value = '';
	};

	/**
	 * Handles the modal close action.
	 */
	const handleOnClose = () => {
		if (successModal) {
			navigate('/');
		}
		setIsOpen(false);
		setModalState('request');
	};

	/**
	 * Handles the modal submission.
	 * @param {string} value - The new modal state value.
	 */
	const modalSubmitHandler = (value) => {
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
			<LoginModal
				setSuccessModalState={setSuccessModalState}
				requestData={requestData}
				ModalActiveScreen='login'
				show={loginModal}
				onClose={() => setLoginModal(false)}
			/>
			<Modal show={isOpen} onClose={handleOnClose}>
				{/* request form modal */}
				{modalState === 'request' && (
					<RequestModal
						setRequestData={setRequestData}
						setLoginModal={setLoginModal}
						setIsOpen={setIsOpen}
						url={url}
						confirmSubmit={modalSubmitHandler}
					/>
				)}

				{/* request success modal */}
				{modalState === 'success' && (
					<SuccessModal setUrl={setUrl} confirmSubmit={modalSubmitHandler} />
				)}
			</Modal>
		</div>
	);
};

export default Banner;

/**
 * Header() returns JSX Element
 * Two different header section. 1 for small screen and another for the rest
 *
 * @param {function} sideBar This function only work for small screen to open side nav menu
 * @param {boolean} state  used to change button icon for small header.
 *
 * @returns JSX Element
 */

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import menu from '../../assets/icons/menu-01.svg';
import cross from '../../assets/icons/cd-cancel.svg';
import Button from '../UiElements/Buttons/Button';
import Input from '../UiElements/Input/Input';
import cartIcon from '../../assets/icons/cd-products.svg';
import notification from '../../assets/icons/cd-notification.svg';
import profile from '../../assets/icons/user-1.svg';
import Icon from '../UiElements/Icon/Icon';
import search from '../../assets/icons/cd-search.svg';
import { useEffect, useState } from 'react';
import Dropdown from '../UiElements/Dropdown/Dropdown';
import ScrollTop from '../../Util/ScrollTop';
import LoginModal from '../MobileModal/LoginModal';
import { useUserCtx } from '../../contexts/user/UserContext';
import { terminal } from '../../contexts/terminal/Terminal';
import useCart from '../Hooks/useCart';
import Modal from '../UiElements/Modal/Modal';
import RequestModal from '../Banner/RequestModal';
import SuccessModal from '../Banner/SuccessModal';

const Header = ({ sideBar, state }) => {
	const [cartState, setCartState] = useState(false);
	const [notifyState, setNotifyState] = useState(false);
	const [loginModal, setLoginModal] = useState(false);
	const [notifications, setNotifications] = useState();
	const { user,Logout } = useUserCtx();
	const navigate = useNavigate();
	const [cartData, setCartData] = useState([]);
	const { cart } = useCart();

	const [isOpen, setIsOpen] = useState(false);
	const [modalState, setModalState] = useState('request');
	const [url, setUrl] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		setUrl(e.target[0].value);
		setIsOpen(true);
		e.target[0].value = '';
	};
	const handleOnClose = () => {
		setIsOpen(false);
		setModalState('request');
	};
	const modalSbmitHandler = (value) => {
		setModalState(value);
	};

	ScrollTop();
	const clickHandler = () => {
		sideBar();
	};
	useEffect(() => {
		user?.id &&
			terminal
				.request({ name: 'getNotification' })
				.then((data) => data.docs && setNotifications(data.docs));
	}, [user]);
	useEffect(() => {
		terminal.socket.on('notification', (data) => {
			if(data.logout) return Logout()
			setNotifications((prev) => [data, ...prev]);
		});
		return () => {
			terminal.socket.off('notification');
		};
	});
	useEffect(() => {
		setCartData(() => {
			return cart?.products?.map((product) => {
				return {
					id: product.product.id,
					title: product.product.name,
					price: product.product.price,
					image: product.product.images[0],
					qty: product.productQuantity,
				};
			});
		});
	}, [cart]);

	return (
		<>
			<div className='sticky top-0 mt-0 pt-0  bg-white z-50'>
				<div className=' z-[100]'></div>
				<div className='container hidden  sm:flex mx-auto navbar gap-4 py-[10px] items-center justify-between'>
					<Link
						to='/'
						className='w-[142px] h-11 justify-start items-center gap-2 inline-flex flex-shrink-0'
					>
						<img src={Logo} alt='Project Packers' />
						<div className='text-secondary text-base font-bold leading-none'>
							Project
							<br />
							Packers
						</div>
					</Link>

					{/* search */}
					<form onSubmit={submitHandler} className='w-full max-w-[650px]'>
						<Input
							icon='searchYellow'
							type='text'
							placeholder='Paste the URL of the product'
							border
						>
							<img src={search} alt='' />
						</Input>
					</form>
					<div className='flex gap-10 items-center'>
						<Link
							className='align-center font-sans font-normal text-secondary h-fit'
							to='...'
						>
							Support
						</Link>
						{user ? (
							<div className='flex gap-2 items-center'>
								<div className='relative'>
									<span
										className='hover:cursor-pointer'
										onClick={() => {
											setNotifyState(!notifyState);
										}}
									>
										<Icon unread={false} icon={notification} />
									</span>
									<Dropdown
										type='notification'
										isOpen={notifyState}
										onClick={() => setNotifyState(false)}
										title='Notification'
										data={notifications}
									/>
								</div>
								<div className='relative'>
									<span
										className='hover:cursor-pointer'
										onClick={() => {
											setCartState(!cartState);
										}}
									>
										<Icon unread={false} icon={cartIcon} />
									</span>
									<Dropdown
										type='cart'
										isOpen={cartState}
										onClick={() => setCartState(false)}
										title='Shopping Bag'
										data={cartData}
									/>
								</div>
								<div className='relative'>
									<Link
										to='/account/orders'
										className='flex gap-2 items-center cursor-pointer'
									>
										<Icon type='active' unread={false} icon={profile} />
										<p className='font-sans text-secondary text-sm font-semibold'>
											{user.fullName || 'User'}
										</p>
									</Link>
								</div>
							</div>
						) : (
							<div className='flex gap-2 items-center'>
								<Link to='/login'>
									<Button onClick={() => navigate('/login')} type='outline'>
										Login
									</Button>
								</Link>
								<Button onClick={() => navigate('/signup')} type='secondary'>
									Sign Up
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* For Small Screen */}
				<div className='flex bg-[#CFF6EF] gap-2 flex-shrink-0 justify-between sm:hidden px-5 py-[10px]'>
					<div className='flex flex-shrink-0 items-center gap-2 '>
						{user && (
							<img onClick={clickHandler} src={state ? cross : menu} alt='' />
						)}
						<img
							onClick={() => navigate('/')}
							className='max-h-[33px]'
							src={Logo}
							alt=''
						/>
					</div>
					<div className='flex gap-2 items-center '>
						<Input border placeholder='Paste URL here...'>
							<img src={search} alt='' />
						</Input>
						{user ? (
							<Link to='/cart'>
								<Icon icon={cartIcon} />
							</Link>
						) : (
							<button
								onClick={() => setLoginModal(true)}
								className='text-white bg-secondary rounded-full px-4 py-2'
							>
								Login
							</button>
						)}
					</div>
				</div>
			</div>
			<LoginModal show={loginModal} onClose={() => setLoginModal(false)} />
			<Modal show={isOpen} onClose={handleOnClose}>
				{modalState === 'request' && (
					<RequestModal setIsOpen={setIsOpen} url={url} confirmSubmit={modalSbmitHandler} />
				)}
				{modalState === 'success' && (
					<SuccessModal setUrl={setUrl} confirmSubmit={modalSbmitHandler} />
				)}
			</Modal>
		</>
	);
};

export default Header;

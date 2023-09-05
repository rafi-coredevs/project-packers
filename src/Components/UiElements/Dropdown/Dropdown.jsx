import icon from '../../../assets/icons/cd-arrow-right.svg';
import acc from '../../../assets/icons/Avatar.svg';
import prod from '../../../assets/icons/cd-products.svg';
import minor from '../../../assets/icons/cd-select_minor.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import formatTimeAgo from '../../../Util/formatTimeAgo';


const Dropdown = ({ isOpen, onClick, type, title, data, logout }) => {
	const navidate = useNavigate();
	const ref = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				onClick && onClick();
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [onClick]);

	const clickHandler = (v) => {
		type === 'notification' ? navidate('/notification') : navidate('/cart');
		onClick(false);
	};

	if (type === 'notification') {
		return (
			<div ref={ref}>
				{isOpen && (
					<div className='bg-white p-5 rounded-xl w-[21.25rem] absolute top-[70px] right-0'>
						<div className='flex justify-between pb-3'>
							<p className='font-sans text-sm font-semibold text-secondary'>
								{title || 'Loading...'}
							</p>
							<Link to='/notification'>
								<img src={icon} alt='' />
							</Link>
						</div>
						<div className='overflow-y-auto scrollbar max-h-[352px]'>
							{data ? (
								data.map((item, i) => {
									return (
										<div
											onClick={() => clickHandler(item.id)}
											key={i}
											className='cursor-pointer flex gap-3 py-2 border-t border-[#0000001A]'
										>
											<div className='h-12 w-12'>
												{item.type === 'account' ? (
													<img src={acc} />
												) : (
													<img
														className='bg-[#CFF6EF] p-1 rounded-md'
														src={prod}
													/>
												)}
											</div>

											<div className=''>
												<p className='font-sans font-medium text-sm overflow-hidden'>
													{item.message}
												</p>
												<p className='font-sans font-normal text-xs text-[#00000066] overflow-hidden'>
													{formatTimeAgo(item.time)}
												</p>
											</div>
										</div>
									);
								})
							) : (
								<p>No Data</p>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
	if (type === 'cart') {
		return (
			<div ref={ref}>
				{isOpen && (
					<div className='bg-white p-5 rounded-xl w-[350px] absolute top-[70px] right-0'>
						<div className='flex justify-between pb-3'>
							<p className='font-sans text-sm font-semibold text-secondary'>
								{title || 'Loading...'}
							</p>
							<Link to='/cart'>
								<img src={icon} alt='' />
							</Link>
						</div>
						<div className='overflow-y-auto scrollbar max-h-[352px]'>
							{data?.length > 0 ? (
								data.map((item, i) => {
									return (
										<div
											onClick={() => clickHandler(item.id)}
											key={i}
											className='cursor-pointer flex gap-4 justify-between py-2 border-t border-[#0000001A]'
										>
											<div className='h-16 w-16'>
												<img
													className='w-full h-full'
													src={
														import.meta.env.VITE_SERVER_URL + '/' + item.image
													}
													alt=''
												/>
											</div>

											<div className='max-w-[180px]'>
												<p className='font-sans   font-medium text-sm overflow-hidden text-[#00000066]'>
													{item.title.substring(0, 40).concat('...')}
												</p>

												<p className='font-sans font-normal text-xs text-[#000000] overflow-hidden'>
													$ {item.price}
												</p>
											</div>
											<div className='flex gap-1 items-center'>
												<span className='text-sm'>{item.qty}</span>
												<img src={minor} alt='' />
											</div>
										</div>
									);
								})
							) : (
								<p>No items in cart</p>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
	if (type === 'logout') {
		return (
			<div ref={ref}>
				{isOpen && <div className=" p-5  w-[350px]  bg-white py-6 shadow-md shadow-primary px-2 border rounded-lg absolute top-12  right-0  mt-1">
					<button onClick={() => { logout(); navigat("/"); }} className="bg-primary px-2 w-full rounded-md py-2 text-secondary font-medium">Logout</button>
				</div>}
			</div>
		);
	}

};

export default Dropdown;

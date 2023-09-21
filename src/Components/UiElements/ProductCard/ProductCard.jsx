import { Link } from 'react-router-dom';
import errorImg from '../../../assets/noImages.svg';
/**
 * Lazy loading Component
 * @param {Boolean}
 * @returns Lazy ProductCard
 */
export const LazyProductCard = ({ isShop = Boolean }) => {
	return (
		<div
			className={`w-[22rem] lg:w-[24rem] p-3 cursor-pointer flex justify-center gap-4 group border ${
				isShop ? 'lg:flex-col' : 'flex-col'
			}`}
		>
			<div className='w-[40%] lg:w-full h-40 lg:h-80 rounded-xl lazy-loading' />
			<div className='w-[60%] lg:w-full lg:mt-7'>
				<h3 className='w-full text-2xl font-semibold lazy-loading'>
					<span className='opacity-0'>title</span>
				</h3>
				<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center mt-4 text-base'>
					<p className='w-fit lazy-loading'>
						<span className='opacity-0'>Retailer price</span>
					</p>
					<p className='font-semibold w-fit lazy-loading'>
						<span className='opacity-0'>$ price</span>
					</p>
				</div>
			</div>
		</div>
	);
};

/**
 * @param {Object} arg Params as object
 * @param {String} arg.id -takes product id
 * @param {String} arg.img -takes image src
 * @param {String} arg.title -Title of the cart
 * @param {Number} arg.price -Product price
 * @param {Boolean} arg.isShop -Component in shop page true / other page false
 * @returns ProductCard Component
 */

export const ProductCard = ({
	id = String,
	img = String,
	title = String,
	price = Number,
	isShop = Boolean,
}) => {
	const handleLoading = (event) => {
	};
	const handleError = (event) => {
		event.currentTarget.src = errorImg;
		event.currentTarget.className =
			'flex items-center justify-center  my-auto  mx-auto';
	};
	return (
		<>
			{
				<Link
					to={`/shop/${id}`}
					className={`w-full bg-white p-[0.69rem] lg:h-[27rem] lg:w-[19.0625rem]  cursor-pointer flex justify-center gap-4 group border duration-200 active:scale-95
        ${isShop ? 'lg:flex-col' : 'flex-col'}`}
				>
					<div
						className={`h-40 lg:h-80 rounded-xl overflow-hidden ${
							isShop ? 'w-[40%] lg:w-full' : 'w-full'
						}`}
					>
						<img
							src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
							onLoad={handleLoading}
							onError={handleError}
							alt='Product Image'
							className='h-full w-[22rem] lg:w-[24rem]  object-contain duration-500 group-hover:scale-105'
						/>
					</div>
					<div className={isShop ? 'w-[60%] py-[1.88rem] lg:w-full lg:mt-7' : 'py-[1.88rem] w-full'}>
						<h3
							className={`lg:text-xl mb-4 leading-6 font-bold text-[#0D3D4B] tracking-[-0.0225rem] ${
								isShop ? 'lg:truncate line-clamp-2' : 'truncate'
							} `}
						>
							{title}
						</h3>
						<div
							className={`text-left flex gap-2 justify-between items-center mt-4 text-base
            ${isShop ? 'flex-col lg:flex-row' : 'flex-row'}`}
						>
							<p className='text-slate-600 text-xs md:text-base font-medium'>
								Retailer price
							</p>
							<p className='font-bold text-secondary shrink-0 lg:text-xl leading-6 tracking-[-0.0225rem]'>
								{price} TK
							</p>
						</div>
					</div>
				</Link>
			}
		</>
	);
};

// import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


/**
 *
 * @param {string} productImg - receive product image
 * @param {string} productName - receive product name
 * @param {string} productQuantity - receive product quantity
 * @param {string} price - receive product price
 */
const CartCard = ({
	id,
	productImg,
	productName,
	ProductQuantity,
	price,
	updateQuantity
}) => {
	return (
		<tr className='border-b w-full'>
			<td className='col min-h-[64px]  '>
				<div className='flex items-center gap-1 '>
					<img src={import.meta.env.VITE_SERVER_URL + `/${productImg}`} alt='' className='w-16 h-16' />
					<div>
						<p className='text-base font-normal hidden md:block'>
							{productName.slice(0, 40)}
							<br />
							{productName.slice(41, productName.length)}
						</p>

						{/* for small device */}
						<p className='text-sm text-black/40 font-normal sm:hidden '>
							{productName.slice(0, 40)}...
						</p>
						<div className='col mt-1 text-xs font-semibold sm:hidden '>
							৳ {price} tk
						</div>
						<p className='text-sm text-black/40 font-normal'>
							{productName.slice(0, 40)}...
						</p>
						<div className='col mt-1 text-xs font-semibold  '>
							৳ {price} tk
						</div>
					</div>
				</div>
			</td>

			{/* 2nd col */}
			<td className='col min-h-[64px] '>
				<div className='flex items-center gap-5'>
					<div className='flex items-center justify-center gap-2 border w-[96px] px-2 py-[11px] rounded bg-white'>
						{/* decrease button */}
						<button
							className='text-black/30'
							onClick={(e) => {
								e.preventDefault();
								ProductQuantity > 0 && updateQuantity(id, ProductQuantity - 1);
							}}
						>
							<AiOutlineMinus />
						</button>
						<input
							value={ProductQuantity}
							readOnly
							type='number'
							id='productLink'
							className='bg-transparent text-center text-[#3E949A] text-sm outline-none font-normal w-[40px] [&::-webkit-inner-spin-button]:appearance-none  '
						/>
						{/* increase button */}
						<button
							className='text-black/30'
							onClick={(e) => {
								e.preventDefault();
								updateQuantity(id, ProductQuantity + 1);
							}}
						>
							<AiOutlinePlus />
						</button>
					</div>
				</div>
			</td>
			<td className='col min-h-[64px] text-xs font-semibold hidden md:flex items-center '>
				<div className='min-h-[64px] flex items-center justify-center'>
					৳ <span>{price}</span> tk
				</div>
			</td>
		</tr>
	);
};

export default CartCard;
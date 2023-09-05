import { useLocation } from 'react-router-dom';
import close from '../../../assets/icons/cd-cancel.svg'
/**
 * CartItem component displays a single item in the shopping cart.
 *
 * @param {Object} data - The data for the item being displayed.
 * @param {function} onChange - The function to handle quantity changes for the item.
 * @param {number} quantity - The current quantity of the item.
 * @returns {JSX.Element} The rendered CartItem component.
 */
const CartItem = ({ data, onChange, quantity, removeProduct }) => {
	/**
	 * Updates the quantity of the item.
	 *
	 * @param {number} id - The unique identifier of the item.
	 * @param {number} updatedQuantity - The updated quantity value.
	 */
	const updateQuantity = (id, updatedQuantity) => {
		onChange(id, quantity + updatedQuantity);
	};

	const { pathname } = useLocation();
	return (
		<tr className='border-b'>
			<td>
				<div className='h-[60px] my-2 pr-2 flex gap-3 items-center'>
					<img
						className='h-16 w-16 border-[1px] p-[1px]'
						src={import.meta.env.VITE_SERVER_URL + `/${data.images[0]}`}
						alt=''
					/>
					<div className=''>
						<p className='sm:text-base text-sm font-normal wrap line-clamp-2 '>
							{data?.name}
						</p>
						<p className='sm:hidden block text-xs font-semibold'>
							৳ {data?.price.toFixed(2)} tk{' '}
						</p>
					</div>
				</div>
			</td>
			<td>
				<div className='border-[#0000004d] border rounded-md flex items-center justify-center'>
					<button
						disabled={quantity <= 0}
						onClick={() => updateQuantity(data?.id, -1)}
						className='px-2 pb-2 text-[#0000004d] text-3xl'
					>
						-
					</button>
					<span className='text-center max-w-[30px] text-secondary font-semibold outline-none'>
						{quantity}
					</span>
					<button
						onClick={() => updateQuantity(data?.id, 1)}
						className='px-2 pb-2 text-[#0000004d] text-3xl h-full'
					>
						+
					</button>
				</div>
			</td>
			<td className='hidden px-2 sm:table-cell'>
				৳ {data?.price + data?.tax + data?.fee} tk
			</td>
			{pathname.includes('admin') && <td className='px-2 sm:table-cell '>
				<img onClick={() => removeProduct(data)} src={close} alt="" className='cursor-pointer' />
			</td>}
		</tr>
	);
};

export default CartItem;

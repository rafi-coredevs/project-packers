/**
 *
 * @param {string} type - The card's purpose.
 * @param {function} onClick - The click event handler.
 * @param {string} title - The card's title.
 * @param {string} name - The card's name.
 * @param {string} email - The card's email.
 * @param {string} phone - The card's phone number.
 * @param {string} address - The card's address.
 * @param {string} orders - The card's orders.
 * @param {string} message - The card's notes.
 * @param {string} customerName - The customer's name.
 * @param {boolean} editable - Whether the card is editable.
 * @param {function} formikProps - Formik props for data handling.
 */

import { useState } from 'react';
import canceled from '../../../../assets/icons/cd-cancel.svg';
import CopyButton from '../CopyButton/CopyButton';

const SideCard = ({
	types,
	onClick,
	title,
	name,
	email,
	phone,
	address,
	orders,
	message,
	cross,
	customerName,
	formikProps,
	editable,
	amount,
}) => {
	const [isEdit, setIsEdit] = useState(false);

 	
	// for customer information
	const renderCustomerCard = () => (
		<div className='grid p-5'>
			<div className='flex justify-between'>
				<p className='text-base text-secondary font-semibold'>Customer</p>
			{
				editable?	<button
				onClick={(e) => {
					e.preventDefault();
					onClick;
				}}
			>
				<img src={canceled} alt='' />
			</button>:''
			}
			</div>
			<div className='grid gap-2'>
				{email && <p className='underline text-emerald-500'>{email || 'Not available'}</p> }
				{phone && <p className=' text-[#6d6d6d]'>{phone || 'Not available'}</p> }
			</div>
		</div>
	);
	// for customer name and total order
	const customCard = () => (
		<div className='grid gap-5 p-5'>
			<div className='flex justify-between'>
				<p className='text-base text-secondary font-semibold'>{title}</p>
				<button
					onClick={(e) => {
						e.preventDefault();
						onClick;
					}}
				>
					<img src={canceled} alt='' />
				</button>
			</div>
			<div className='grid gap-2'>
				{address && (
					<p className='text-[#6d6d6d]'>{address || 'Not available'}</p>
				)}
				{amount && <p className='text-[#black]'> ৳{amount || 0}</p>}
			</div>
		</div>
	);

	// for customer contact
	const renderContactCard = () => (
		<div className='grid gap-5 p-5'>
			<div className='flex justify-between'>
				<p className='text-base text-secondary font-semibold'>
					Contact information
				</p>
				{cross === false ? (
					<></>
				) : editable ? (
					<button
						className='text-emerald-500'
						onClick={(e) => {
							e.preventDefault();
						}}
					>
						Edit
					</button>
				) : (
					''
				)}
			</div>
			<div className='grid gap-2'>
				<div className='flex justify-between items-center'>
					<input
						type='text'
						name={name}
						readOnly
						className=' text-emerald-500'
						value={email || 'No Details'}
					/>
					{email && <CopyButton textToCopy={email} />}
				</div>
				<p className='text-[#475569]'>{phone || 'No Phone Number'}</p>
			</div>
		</div>
	);

	// for billing or shipping
	const renderBillingOrShippingCard = (isBilling) => (
		<div className='grid gap-5 p-5'>
			<div className='flex justify-between'>
				<p className='text-base text-secondary font-semibold'>{title}</p>
				{cross === false ? (
					<></>
				) : editable ? (
					<div className="flex gap-2">
						{types === 'billing' && isEdit ? <button onClick={onClick} className='text-emerald-500' type="button">As Shipping</button> : null}
					<button
						className='text-emerald-500'
						onClick={(e) => {
							e.preventDefault();
							setIsEdit(!isEdit)
						}}
						>
						{isEdit ? "Save" :"Edit"}
					</button>
						</div>
				) : (
					''
				)}
			</div>
			<div className='grid gap-2'>
				{isEdit && editable ? (
					<div className='space-y-2'>
						<input
							type='text'
							name='address'
							placeholder='address'
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							value={formikProps.values.address}
							className='border border-gray-300 outline-none rounded w-full py-1 px-3'
						/>
						<input
							type='text'
							name='city'
							placeholder='city'
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							value={formikProps.values.city}
							className='border border-gray-300 outline-none rounded w-full py-1 px-3'
						/>
						<input
							type='text'
							name='area'
							placeholder='area'
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							value={formikProps.values.area}
							className='border border-gray-300 outline-none rounded w-full py-1 px-3'
						/>
						<input
							type='text'
							name='zip'
							placeholder='zip'
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							value={formikProps.values.zip}
							className='border border-gray-300 outline-none rounded w-full py-1 px-3'
						/>
					</div>
				) : (
					<div className='flex justify-between items-center'>
						<p className='text-[#475569]'>{address || 'No Address'}</p>
						{address !== 'No Address' && <CopyButton textToCopy={address} />}
					</div>
				)}
			</div>
		</div>
	);

	// for note
	const renderNoteCard = () => (
		<div className='grid gap-5 p-5'>
			<div className='flex justify-between'>
				<p className='text-base text-secondary font-semibold'>Note</p>
				{cross === false ? (
					<></>
				) : (
					<button
						onClick={(e) => {
							e.preventDefault();
							onClick;
						}}
					>
						<img src={canceled} alt='' />
					</button>
				)}
			</div>
			<div className='grid gap-2'>
				<p className='text-[#475569]'>{message || 'No Message'}</p>
			</div>
		</div>
	);

	// Render the appropriate card based on 'types'
	switch (types) {
		case 'customer':
			return renderCustomerCard();
		case 'contact':
			return renderContactCard();
		case 'billing':
		case 'shipping':
			return renderBillingOrShippingCard(types === 'billing');
		case 'note':
			return renderNoteCard();
		case 'custom':
			return customCard();
		default:
			return null;
	}
};

export default SideCard;

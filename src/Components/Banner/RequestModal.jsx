import Button from '../UiElements/Buttons/Button';
import Input from '../UiElements/Input/Input';
import globe from '../../assets/icons/cd-internet.svg';
import reload from '../../assets/icons/cd-reload.svg';
import { useEffect, useState } from 'react';
import ImageUploader from '../UiElements/ImageUploader/ImageUploader';
import { useFormik } from 'formik';
import removeEmptyFields from './../../Util/removeEmptyFields';
import { useUserCtx } from '../../contexts/user/UserContext';
import { terminal } from '../../contexts/terminal/Terminal';
import { useNavigate } from 'react-router-dom';
import { itemRequestSchema } from '../../Util/ValidationSchema';

/**
 * React component for a modal used for requesting an item.
 *
 * @param {string} url - The required product URL to begin the request process.
 * @param {Function} confirmSubmit - Callback function for modal submission.
 * @param {Function} setIsOpen - Function to set modal open/close state.
 * @param {Function} setLoginModal - Function to set modal login state
 * @param {Function} setRequestData - Function to set request data
 * @returns {JSX.Element} Modal Element
 */
const RequestModal = ({
	url,
	confirmSubmit,
	setIsOpen,
	setLoginModal,
	setRequestData,
}) => {
	const [active, setActive] = useState('link');
	const [allImages, setAllImages] = useState([]); // Define state variables to manage uploaded images.

	const navigate = useNavigate();

	const { user } = useUserCtx();

	const itemRequestForm = useFormik({
		initialValues: {
			link: url,
			name: '',
			quantity: 1,
			note: '',
			images: [],
		},
		validationSchema:itemRequestSchema,
		onSubmit: (values) => {
			const { images, ...rest } = values;
			removeEmptyFields(rest); // removing empty fields

			const width = window.screen.width;

			if (user) {
				terminal
					.request({
						name: 'registerRequest',
						body: { data: rest, images: images },
					})
					.then((d) => {
						if (d.id) {
							confirmSubmit('success');
						}
					})
					.catch((err) => console.error('Error in request modal', err));
			} else {
				// checking devices
				if (width > 767) {
					setIsOpen(false);
					navigate('/login', {
						state: {
							requestItem: { data: rest, images: images },
							sendRequest: true,
						},
					});
				} else {
					setIsOpen(false);
					setLoginModal(true);
					setRequestData({ data: rest, images: images });
				}
			}
		},
	});
	useEffect(()=>{
		console.log(itemRequestForm.errors)
	},[itemRequestForm.errors])
	return (
		<form action='' onSubmit={itemRequestForm.handleSubmit}>
			<div className='flex flex-col gap-5'>
				<div className='flex gap-8 pb-4 justify-between items-start border-b border-[#0000001e]'>
					<div className='flex gap-2 items-center flex-wrap '>
						<p className='shrink-0 text-xl font-semibold'> Request Items</p>

						{/* button */}
						<div className='flex gap-2'>
							<Button
								onClick={(e) => {
									e.preventDefault();
									setActive('link');
								}}
								type={active === 'link' ? 'lightGreen' : 'light'}
								buttonType='button'
							>
								Link
							</Button>
							<Button
								onClick={(e) => {
									e.preventDefault();
									setActive('image');
								}}
								type={active === 'image' ? 'lightGreen' : 'light'}
								buttonType='button'
							>
								Image
							</Button>
						</div>
					</div>
				</div>

				{/* rendering as active button */}
				{active === 'link' && (
					<>
						<div className='flex gap-2 items-end '>
							{/* link */}
							<div className='w-full'>
								<Input
									styles='primary'
									label='Product Link'
									name='link'
									change={itemRequestForm.handleChange}
									blur={itemRequestForm.handleBlur}
									value={itemRequestForm.values.link}
									placeholder='Product URL'
									border
								>
									<img src={globe} alt='' />
								</Input>
							</div>
							<button
								type='button'
								className='cursor-pointer duration-500 active:rotate-180'
							>
								<img
									className='p-4  rounded-full bg-[#00031615] '
									src={reload}
									alt=''
								/>
							</button>
						</div>

						{/* product name */}
						<div className=''>
							<Input
								styles='primary'
								label='Product Name'
								name='name'
								change={itemRequestForm.handleChange}
								blur={itemRequestForm.handleBlur}
								value={itemRequestForm.values.name}
								placeholder='Product Name'
								border
								error={itemRequestForm.touched.name && itemRequestForm.errors.name ? itemRequestForm.errors.name : null }
							/>
						</div>
					</>
				)}

				{/* images upload */}
				{active === 'image' && (
					<ImageUploader
						allImages={allImages}
						setAllImages={setAllImages}
						title='Product Image'
						formikProps={itemRequestForm}
					/>
				)}

				<div className='flex flex-col gap-3' >
					<label htmlFor='quantity' className='text-base font-medium '>
						Quantity
					</label>
					<div className='flex gap-3 items-center'>
						{/* quantity */}
						<div className='border-[#0000004d] border rounded-full w-fit flex items-center justify-center'>
							<button
								className='px-5 pb-2 text-[#0000004d] text-3xl'
								type='button'
								onClick={() =>
									itemRequestForm.values.quantity > 1
										? itemRequestForm.setFieldValue(
												'quantity',
												itemRequestForm.values.quantity - 1,
										  )
										: null
								}
							>
								-
							</button>
							<input
								className='text-center max-w-[40px] text-secondary font-semibold outline-none'
								name='quantity'
								id='quantity'
								value={itemRequestForm.values.quantity}
								onChange={itemRequestForm.handleChange}
								onBlur={itemRequestForm.handleBlur}
								min={1}
								type='number'
							/>
							<button
								className='px-5 pb-2 text-[#0000004d] text-3xl h-full'
								type='button'
								onClick={() =>
									itemRequestForm.setFieldValue(
										'quantity',
										itemRequestForm.values.quantity + 1,
									)
								}
							>
								+
							</button>
						</div>
						{active === 'link' && (
							<p className='text-base font-medium'>
								 <span className='opacity-[65%]'>By </span>
								<span className='text-[#3E949A] underline'>
									{
										itemRequestForm.values.link
											?.replace(/^(https?:\/\/)?(www\.)?/, '')
											.split('/')[0]
									}
								</span>
							</p>
						)}
					</div>
				</div>

				<div className='w-full '>
					<label className='block mb-3 text-base font-medium' htmlFor='note'>
						Add Note  <span className='text-black opacity-[65%] font-normal' >(optional)</span>
					</label>
					<textarea
						className='border p-2 rounded-md w-full outline-none'
						name='note'
						onChange={itemRequestForm.handleChange}
						onBlur={itemRequestForm.handleBlur}
						value={itemRequestForm.values.note}
						rows='5'
						placeholder='Specify size, color, model or any instructions here...'
					></textarea>
				</div>
				<Button type='primary' buttonType='submit' full>
					{user ? 'Request Item' : 'Login & Request Your Item'}
				</Button>
			</div>
		</form>
	);
};

export default RequestModal;

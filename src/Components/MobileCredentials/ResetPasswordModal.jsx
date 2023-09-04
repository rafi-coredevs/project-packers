/**
 * ResetPasswordModal() returns JSX Element
 * @param {object} data required data from server
 * @param {function} getResponse callback function
 * @param {function} stateHandler callback function
 * @param {function} onClose callback function
 * @returns JSX Element
 */

import { useFormik } from 'formik';
import Input from '../UiElements/Input/Input';
import { changePassword } from '../../Util/ValidationSchema';
import Button from '../UiElements/Buttons/Button';
import { useState } from 'react';
import { terminal } from '../../contexts/terminal/Terminal';
import toaster from '../../Util/toaster';

const ResetPasswordModal = ({ data, getResponse, stateHandler, onClose }) => {
	const [isSubmit, setIsSubmit] = useState(false);
	const resetForm = useFormik({
		initialValues: {
			newPassword: '',
			confirmPassword: '',
		},
		validationSchema: changePassword,
		onSubmit: (values) => {
			setIsSubmit(true);

			terminal
				.request({
					name: 'resetPassword',
					body: {
						newpassword: values.newPassword,
						token: data.data.token,
						otp: data.otp,
					},
				})
				.then((res) => {
					if (res.status === false) {
						toaster({ type: 'error', message: res.message });
					} else {
						getResponse({ component: 'done', res });
            stateHandler("login")
					}
				})
				.finally(() => {
					resetForm.resetForm();
					setIsSubmit(false);
				});
		},
	});
	return (
		<>
			<div className='flex justify-between items-center'>
				<div className='flex justify-start items-center cursor-pointer'>
					<div onClick={() => stateHandler('reset')} className=''>
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M4.16675 10.0002L16.6667 10'
								stroke='white'
								strokeOpacity='0.65'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M7.49993 5.83301L3.92253 9.41042C3.64474 9.68817 3.50586 9.82709 3.50586 9.99967C3.50586 10.1723 3.64474 10.3112 3.92253 10.5889L7.49993 14.1663'
								stroke='white'
								strokeOpacity='0.65'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</div>
				<div className='text-center text-lg text-white font-bold'>
					Set New Password
				</div>
				<div className='flex justify-end items-center'>
					<button onClick={onClose}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
						>
							<path
								d='M15.8334 4.16699L4.16675 15.8337'
								stroke='white'
								strokeOpacity='0.65'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M4.16675 4.16699L15.8334 15.8337'
								stroke='white'
								strokeOpacity='0.65'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
			</div>
			<form className='flex flex-col gap-5' onSubmit={resetForm.handleSubmit}>
				<div className='relative'>
					<Input
						name='newPassword'
						label='New Password'
						placeholder='*****'
						change={resetForm.handleChange}
						blur={resetForm.handleBlur}
						value={resetForm.values.password}
						error={
							resetForm.errors.password && resetForm.touched.password
								? resetForm.errors.password
								: null
						}
						type='password'
					/>
				</div>
				<div className='relative'>
					<Input
						name='confirmPassword'
						label='Confirm Password'
						placeholder='*****'
						change={resetForm.handleChange}
						blur={resetForm.handleBlur}
						value={resetForm.values.confirmPassword}
						error={
							resetForm.errors.confirmPassword &&
							resetForm.touched.confirmPassword
								? resetForm.errors.confirmPassword
								: null
						}
						type='password'
					/>
				</div>
				<div className='mt-5'>
					<Button full className='w-full' type='primary' buttonType='submit'>
						{isSubmit ? 'Submitting...' : 'Reset Password'}
					</Button>
				</div>
			</form>
		</>
	);
};

export default ResetPasswordModal;

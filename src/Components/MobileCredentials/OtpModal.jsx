import { useFormik } from 'formik';
import { useState } from 'react';
import Input from '../UiElements/Input/Input';
import Button from '../UiElements/Buttons/Button';
import { terminal } from '../../contexts/terminal/Terminal';
import toaster from '../../Util/toaster';

/**
 * Represents a React component for otp verification with a modal interface.
 *
 * @param {Object} data - Data required from the server, including the token and OTP.
 * @param {function} getResponse - Callback function for handling responses from the server.
 * @param {function} stateHandler - Callback function to change the state of the modal.
 * @param {function} onClose - Callback function to close the modal.
 *
 * @returns {JSX.Element} - React JSX element for the otp verification modal component.
 */
const OtpModal = ({ data, getResponse, stateHandler, onClose }) => {
	const [isSubmit, setIsSubmit] = useState(false);
	const otpForm = useFormik({
		initialValues: {
			field1: '',
			field2: '',
			field3: '',
			field4: '',
		},

		onSubmit: (values) => {
			setIsSubmit(true);
			const otp = Object.values(values).join(''); // joining all otp field values

			terminal
				.request({ name: 'verifyOTP', body: { otp, token: data.token } })
				.then((res) => {
					if (res.status === false) {
						toaster({ type: 'error', message: res.message });
					} else {
						getResponse({ component: 'newPass', data, otp: otp });
						stateHandler('resetPassword');
					}
				})
				.catch((err) => console.error('Error otp modal', err))
				.finally(() => {
					setIsSubmit(false);
					otpForm.resetForm();
				});
		},
	});

	/**
	 * Handles keyboard navigation between OTP input fields.
	 *
	 * @param {Event} elmnt - The key event triggered by the input field.
	 */
	const handleKeys = (elmnt) => {
		if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
			const next = elmnt.target.tabIndex - 2;

			if (next > -1) {
				elmnt.target.form.elements[next].focus();
			}
		} else {
			const next = elmnt.target.tabIndex;
			if (next < 5) {
				elmnt.target.form.elements[next].focus();
			}
		}
	};

	/**
	 * Function to mask email for privacy
	 *
	 * @param {string} email - receive email for masking
	 * @returns masked email
	 */
	function maskEmail(email) {
		const atIndex = email.indexOf('@');

		if (atIndex !== -1) {
			const maskedPart = email.substring(1, atIndex).replace(/./g, '*');
			const maskedEmail = email.replace(
				email.substring(1, atIndex),
				maskedPart,
			);
			return maskedEmail;
		} else {
			return email;
		}
	}

	return (
		<>
			<div className='grid grid-cols-3'>
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
					OTP Verify
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
			<div className=''>
				<p className='text-center text-base font-medium text-white'>
					To get a verification code, first confirm the email address you added
					to your account <span>{maskEmail(data?.email)}</span>. <br />
					Standard rates apply.
				</p>
			</div>
			<form className='flex flex-col gap-5' onSubmit={otpForm.handleSubmit}>
				<div className='relative flex gap-2'>
					<Input
						name='field1'
						placeholder='✱'
						change={otpForm.handleChange}
						value={otpForm.values.field1}
						otp
						tabIndex={1}
						onKeyUp={handleKeys}
						className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem] placeholder:translate-y-1 focus:placeholder:opacity-0 h-[50px]'
						required
					/>
					<Input
						name='field2'
						placeholder='✱'
						change={otpForm.handleChange}
						value={otpForm.values.field2}
						otp
						tabIndex={2}
						onKeyUp={handleKeys}
						className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem] placeholder:translate-y-1 focus:placeholder:opacity-0 h-[50px]'
						required
					/>
					<Input
						name='field3'
						placeholder='✱'
						change={otpForm.handleChange}
						value={otpForm.values.field3}
						otp
						tabIndex={3}
						onKeyUp={handleKeys}
						className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem] placeholder:translate-y-1 focus:placeholder:opacity-0 h-[50px]'
						required
					/>
					<Input
						name='field4'
						placeholder='✱'
						change={otpForm.handleChange}
						value={otpForm.values.field4}
						otp
						tabIndex={4}
						onKeyUp={handleKeys}
						className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem] placeholder:translate-y-1 focus:placeholder:opacity-0 h-[50px]'
						required
					/>
				</div>
				<Button
					full
					className='w-full h-[48px]'
					type='primary'
					buttonType='submit'
					disabled={isSubmit}
				>
					{isSubmit ? 'Submitting...' : 'Verify Account'}
				</Button>
			</form>

			<div className='text-center text-white text-xs'>
				Already have an Account?{' '}
				<span
					onClick={() => stateHandler('login')}
					className='text-primary underline'
				>
					Login
				</span>
			</div>
		</>
	);
};

export default OtpModal;

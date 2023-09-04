import Input from '../UiElements/Input/Input';
import Button from '../UiElements/Buttons/Button';
import image from '../../assets/icons/otp.svg';
import { useFormik } from 'formik';
import { useState } from 'react';
import { terminal } from '../../contexts/terminal/Terminal';
import toaster from '../../Util/toaster';

/**
 * Otp component for OTP validation from email.
 *
 * @param {object} data - Data containing the token for validation.
 * @param {function} getResponse - Callback function to handle responses from this component.
 *
 * @returns {JSX.Element} - React JSX element for the OTP validation component.
 */
const Otp = ({ data, getResponse }) => {
	const [isSubmit, setIsSubmit] = useState(false);

	// Formik configuration for OTP input form
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

			// otp velidation request
			terminal
				.request({ name: 'verifyOTP', body: { otp, token: data.token } })
				.then((res) => {
					if (res.status === false) {
						toaster({ type: 'error', message: res.message });
					} else {
						getResponse({ component: 'newPass', data, otp: otp });
					}
				}).catch(err=>console.error("Error in otp verification", err))
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

	return (
		<>
			<div className='max-w-[30vw] flex flex-col gap-12'>
				<div className=''>
					<p className='text-white text-[52px] font-sora font-extrabold'>
						Enter your OTP verification code
					</p>
					<p className='font-sans text-lg font-medium text-[#ffffffb3]'>
						To get a verification code, first confirm the phone number you added
						to your account <span className='text-primary'>{data?.email}</span>.
						Standard rates apply.
					</p>
				</div>
				<form className='flex flex-col gap-9' onSubmit={otpForm.handleSubmit}>
					<div className='relative flex gap-2'>
						<Input
							name='field1'
							placeholder='*'
							tabIndex={1}
							change={otpForm.handleChange}
							blur={otpForm.handleBlur}
							max={1}
							value={otpForm.values.field1}
							type='text'
							onKeyUp={handleKeys}
							className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem]'
						/>
						<Input
							name='field2'
							placeholder='*'
							tabIndex={2}
							change={otpForm.handleChange}
							blur={otpForm.handleBlur}
							max={1}
							value={otpForm.values.field2}
							type='text'
							onKeyUp={handleKeys}
							className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem]'
						/>
						<Input
							name='field3'
							placeholder='*'
							tabIndex={3}
							change={otpForm.handleChange}
							blur={otpForm.handleBlur}
							max={1}
							value={otpForm.values.field3}
							type='text'
							onKeyUp={handleKeys}
							className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem]'
						/>
						<Input
							name='field4'
							placeholder='*'
							tabIndex={4}
							change={otpForm.handleChange}
							blur={otpForm.handleBlur}
							max={1}
							value={otpForm.values.field4}
							type='text'
							onKeyUp={handleKeys}
							className='text-center text-lg font-semibold placeholder:text-3xl p-[1.125rem_1.25rem]'
						/>
					</div>
					<Button
						full
						className='w-full'
						type='primary'
						buttonType='submit'
						disabled={isSubmit}
					>
						{isSubmit ? 'Submitting...' : 'Verify Account'}
					</Button>
				</form>
			</div>
			<div className='flex flex-col  w-full h-full justify-center items-center'>
				<img src={image} />
			</div>
		</>
	);
};

export default Otp;

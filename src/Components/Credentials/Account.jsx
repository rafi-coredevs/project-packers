/**
 * Account() returns JSX Element
 * Email Validation form for Password recovery page
 * @param {function} getResponse initialized fetching data from server
 *
 * @returns JSX Element
 */

import { useFormik } from 'formik';
import Input from '../UiElements/Input/Input';
import { emailSchema } from '../../Util/ValidationSchema';
import Button from '../UiElements/Buttons/Button';
import { Link } from 'react-router-dom';
import { postApi } from '../../Util/apiCall';
import { useState } from 'react';
import { terminal } from '../../contexts/terminal/Terminal';
import toaster from '../../Util/toaster';

const Account = ({ getResponse }) => {
	const [isSubmit, setIsSubmit] = useState(false);
	const emailForm = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: emailSchema,
		onSubmit: (values) => {
			setIsSubmit(true);
		
			terminal
				.request({ name: 'sendOTP', body: values })
				.then((data) => {
					if (data.status === false) {
						toaster({ type: 'error', message: data.message });
					} else {
						getResponse({ component: 'otp', token: data.token });
					}
				})
				.finally(() => {
					setIsSubmit(false);
				});
		},
	});
	return (
		<>
			<div className='max-w-[30vw] flex flex-col gap-12'>
				<div className=''>
					<p className='text-white text-[52px] font-sora font-extrabold'>
						Account Recovery
					</p>
					<p className='font-sans text-lg font-medium text-[#ffffffb3]'>
						Enter the email address or phone number associated with your
						account, and we will email you a link to reset your password.
					</p>
				</div>
				<form className='flex flex-col gap-9' onSubmit={emailForm.handleSubmit}>
					<div className='relative'>
						<Input
							name='email'
							label='Email or Phone Number'
							placeholder='Enter your email address or phone number'
							change={emailForm.handleChange}
							blur={emailForm.handleBlur}
							value={emailForm.values.email}
							error={
								emailForm.errors.email && emailForm.touched.email
									? emailForm.errors.email
									: null
							}
							type='email'
						/>
					</div>
					<Button
						full
						className='w-full'
						type='primary'
						buttonType='submit'
						disabled={isSubmit}
					>
						{isSubmit ? 'Submitting...' : 'Reset Password'}
					</Button>
				</form>
			</div>
			<div className='flex flex-col  w-full h-full justify-center items-center'>
				<div className='w-full sm:max-w-[490px]'>
					<p className='text-[24px] font-sans font-medium text-white mb-5'>
						Log in to access your Project Packers Platform for order your
						products from any USA website.
					</p>
					<div className=''>
						<span className='text-[#ffffffb3] font-sans text-base font-normal'>
							Don’t have an account yet?
							<Link className='text-primary underline' to='/signup'>
								Sign Up
							</Link>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;

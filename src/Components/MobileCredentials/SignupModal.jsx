/**
 * SignupModal() returns JSX Element
 * This function for user Sign up
 *
 * @param {function} stateHandler takes string value to navigate state
 * @param {function} onClose callback function to close modal
 *
 * @returns JSX element
 */

import { useFormik } from 'formik';
import { signupSchema } from '../../Util/ValidationSchema';
import Input from '../UiElements/Input/Input';
import CountryCodeSelector from '../UiElements/CountryCodeSelectior/CountryCodeSelector';
import Button from '../UiElements/Buttons/Button';
import { useState } from 'react';
import { useUserCtx } from '../../contexts/user/UserContext';
import toaster from '../../Util/toaster';

const SignupModal = ({ stateHandler, onClose }) => {
	const [countryCode, setCountryCode] = useState(null);
	const { SignUp } = useUserCtx();
	const clickHandler = (state) => {
		stateHandler(state);
	};
	const signUpForm = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			phone: '',
			password: '',
		},
		validationSchema: signupSchema,
		onSubmit: (values) => {
			const data = { ...values, phone: countryCode + values.phone };

			SignUp(data).then((res) => {
				res.status === false
					? toaster({ type: 'error', message: res.message })
					: clickHandler('login');
			});

			signUpForm.resetForm();
		},
	});
	return (
		<>
			<div className='grid grid-cols-3'>
				<div className='flex justify-start items-center cursor-pointer'>
					{/* back button */}
					<div onClick={() => clickHandler('account')} className=''>
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
				<div className='text-center text-2xl text-white font-bold'>Sign Up</div>
				{/* close modal */}
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
			<form onSubmit={signUpForm.handleSubmit} className=''>
				<div className='grid gap-5'>
					{/* Name */}
					<Input
						type='text'
						name='fullName'
						blur={signUpForm.handleBlur}
						error={
							signUpForm.touched.name && signUpForm.errors.name
								? signUpForm.errors.name
								: null
						}
						change={signUpForm.handleChange}
						value={signUpForm.values.name}
						label='Full Name'
						placeholder='Enter your name'
						className='h-[50px]'
					/>
					{/* email */}
					<Input
						name='email'
						change={signUpForm.handleChange}
						blur={signUpForm.handleBlur}
						value={signUpForm.values.email}
						error={
							signUpForm.touched.email && signUpForm.errors.email
								? signUpForm.errors.email
								: null
						}
						type='email'
						placeholder='Enter your email address'
						label='Email Address'
						className='h-[50px]'
					/>
					{/* phone */}
					<Input
						name='phone'
						change={signUpForm.handleChange}
						blur={signUpForm.handleBlur}
						value={signUpForm.values.phone}
						error={
							signUpForm.touched.phone && signUpForm.errors.phone
								? signUpForm.errors.phone
								: null
						}
						type='text'
						placeholder='Enter your phone number'
						label='Phone Number'
						className='h-[50px]'
					>
						{/* for country code */}
						<CountryCodeSelector setCountryCode={setCountryCode} />
					</Input>

					{/* password */}
					<Input
						name='password'
						change={signUpForm.handleChange}
						blur={signUpForm.handleBlur}
						value={signUpForm.values.password}
						error={
							signUpForm.errors.password && signUpForm.touched.password
								? signUpForm.errors.password
								: null
						}
						type='password'
						placeholder='Enter your password'
						label='Password'
						className='h-[50px]'
					/>

					{/* signUp button */}
					<Button type='primary' buttonType='submit' className='h-[48px]'>
						Sign Up
					</Button>
				</div>
			</form>

			<div className='text-center text-white text-base font-sans'>
				Already have an account?<span
					onClick={() => clickHandler('login')}
					className='text-primary underline '
				>
					Login
				</span>
			</div>
		</>
	);
};

export default SignupModal;

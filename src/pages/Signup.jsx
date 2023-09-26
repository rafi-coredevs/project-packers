import { useFormik } from 'formik';
import Input from '../Components/UiElements/Input/Input';
import Button from '../Components/UiElements/Buttons/Button';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema } from '../Util/ValidationSchema';
import google from '../assets/icons/google-icon.svg';
import apple from '../assets/icons/apple.svg';
import facebook from '../assets/icons/facebook.svg';
import CountryCodeSelector from '../Components/UiElements/CountryCodeSelectior/CountryCodeSelector';
import { useState } from 'react';
import { useUserCtx } from '../contexts/user/UserContext';
import toaster from '../Util/toaster';

const Signup = () => {
	const [countryCode, setCountryCode] = useState(null);
	const [accept, setAccept] = useState(true);
	const navigate = useNavigate();

	const { SignUp } = useUserCtx();

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
			
			SignUp(data)
				.then((res) => {
					res.status === false
						? toaster({ type: 'error', message: res.message })
						: navigate('/login');
				})
				.catch((err) => console.error('Error in sign up', err));
		},
	});

	return (
		<div className='bg-secondary pt-[5vh]  min-h-[calc(100vh-225px)]'>
			<div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 relative z-20 justify-center divide-x divide-[#ffffff1a] flex-wrap '>
				<div className='flex justify-start items-center'>
					<div className='max-w-[490px]'>
						<p className='text-[24px] font-sans font-medium text-white mb-5'>
							User original product shopping experience made easy and fun
						</p>
						<div className=''>
							<span className='text-[#ffffffb3] font-sans text-base font-normal'>
								Already have an account yet?
								<Link className='text-primary underline ms-2' to='/login'>
									Login
								</Link>
							</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col  w-full h-full justify-center items-center'>
					<div className='w-full sm:max-w-[30vw]'>
						<p className='text-white text-[52px] font-sora font-extrabold'>
							Sign Up
						</p>
						<form
							className='flex flex-col gap-5'
							onSubmit={signUpForm.handleSubmit}
						>
							{/* Name */}
							<div className='relative'>
								<Input
									name='fullName'
									change={signUpForm.handleChange}
									blur={signUpForm.handleBlur}
									value={signUpForm.values.name}
									error={
										signUpForm.touched.name && signUpForm.errors.name
											? signUpForm.errors.name
											: null
									}
									type='text'
									placeholder='Enter your Full Name'
									label='Full Name'
								/>
							</div>

							{/* email */}
							<div className='relative'>
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
									placeholder='Enter your Email Address'
									label='Email Address'
								/>
							</div>

							{/* phone */}
							<div className='relative'>
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
									type='tel'
									placeholder='Enter Your Phone Number'
									label='Phone Number'
								>
									{/* for country code */}
									<CountryCodeSelector
										error={
											signUpForm.touched.phone && signUpForm.errors.phone
												? signUpForm.errors.phone
												: null
										}
										setCountryCode={setCountryCode}
									/>
								</Input>
							</div>

							{/* password */}
							<div className='relative'>
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
									placeholder='Enter your Password'
									label='Password'
								/>
							</div>

							{/* terms */}
							<div className='flex items-center justify-between mt-[10px]'>
								<div className='font-sans text-base flex items-center'>
									{/* check box */}
									<div className='inline-flex items-center'>
										<label
											className='relative flex cursor-pointer items-center rounded-full'
											htmlFor='checkbox-4'
											data-ripple-dark='true'
										>
											<input
												type='checkbox'
												onChange={() => setAccept(!accept)}
												className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#F2C852] checked:bg-[#F2C852] checked:before:bg-[#F2C852] "
												id='checkbox-4'
											/>
											<div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-secondary opacity-0 transition-opacity peer-checked:opacity-100'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-3.5 w-3.5'
													viewBox='0 0 20 20'
													fill='currentColor'
													stroke='currentColor'
													strokeWidth='1'
												>
													<path
														fillRule='evenodd'
														d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
														clipRule='evenodd'
													></path>
												</svg>
											</div>
										</label>
									</div>
									<label className='text-[#ffffffb3] pl-2'>
										I agree to Project Packers
										<span className='text-primary px-1'>
											{' '}
											Terms of Service
										</span>{' '}
										and{' '}
										<span className='text-primary pl-1'>Privacy notice</span>
									</label>
								</div>
							</div>
							<div className='flex  gap-2 mt-12'>
								<Link
									to={`${import.meta.env.VITE_SERVER_URL}/login/google`}
									className='p-[11px] cursor-pointer bg-white rounded-full shrink-0'
								>
									<img src={google} alt='' />
								</Link>
								<Link
									to={`${import.meta.env.VITE_SERVER_URL}/login/facebook`}
									className='p-[11px] cursor-pointer bg-white rounded-full shrink-0'
								>
									<img src={facebook} alt='' />
								</Link>
								{/* <span className='p-[11px] cursor-pointer bg-white rounded-full shrink-0'>
									<img src={apple} alt='' />
								</span> */}
								<Button
									disabled={accept}
									buttonType='submit'
									full
									className='w-full'
									type='primary'
								>
									Sign Up
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;

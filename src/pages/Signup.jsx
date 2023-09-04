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

			SignUp(data).then((res) => {
				res.status === false
					? toaster({ type: 'error', message: res.message })
					: navigate('/login');
			}).catch((err)=>console.error("Error in sign up", err ));
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
									type='text'
									placeholder='Enter Your Phone Number'
									label='Phone Number'
								>
									{/* for country code */}
									<CountryCodeSelector setCountryCode={setCountryCode} />
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
							<div className='flex justify-between mt-[10px]'>
								<div className='font-sans text-base '>
									<input
										type='checkbox'
										onChange={() => setAccept(false)}
										className='w-4 h-4 accent-primary border-white rounded'
									/>
									<label className='text-[#ffffffb3] pl-2'>
										I agree to Project Packers Terms of Service and Privacy
										notice
									</label>
									{signUpForm.errors.terms && signUpForm.touched.terms && (
										<span></span>
									)}
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
								<span className='p-[11px] cursor-pointer bg-white rounded-full shrink-0'>
									<img src={apple} alt='' />
								</span>
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

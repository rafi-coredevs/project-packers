import Input from '../Components/UiElements/Input/Input';
import { useFormik } from 'formik';
import { loginSchema } from '../Util/ValidationSchema';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Components/UiElements/Buttons/Button';
import google from '../assets/icons/google-icon.svg';
import facebook from '../assets/icons/facebook.svg';
import apple from '../assets/icons/apple.svg';
import { useUserCtx } from '../contexts/user/UserContext';
import toaster from '../Util/toaster';
import { terminal } from '../contexts/terminal/Terminal';


const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const requestItemData = location.state?.requestItem;
	const sendRequest = location.state?.sendRequest;

	const destinedTo = location.state?.afterLogin;

	const { Login, setUser } = useUserCtx();
	const loginForm = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		validationSchema: loginSchema,
		onSubmit: (data) => {
			// set data if remember me clicked or not
			data = data.rememberMe
				? data
				: { email: data.email, password: data.password };
			Login(data).then((data) => {
				if (data.status === false) {
					toaster({ type: 'error', message: data.message });
				} else {
					setUser(data);

					if (sendRequest) {
						terminal
							.request({
								name: 'registerRequest',
								body: requestItemData,
							})
							.then((d) => {
								// console.log('item request response from login', d);
								navigate('/', { state: true });
							});
					} else {
						destinedTo ? navigate(destinedTo) : navigate('/');
					}
				}
			});
		},
	});
	return (
		<div className='bg-secondary pt-[10vh] pb-[15vh] min-h-[calc(100vh-225px)]'>
			<div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 relative z-20 justify-center divide-x divide-[#ffffff1a] flex-wrap'>
				<div className='w-full sm:max-w-[30vw]'>
					<p className='text-white text-[52px] font-sora font-extrabold'>
						Welcome Back
					</p>
					<form
						className='flex flex-col gap-5'
						onSubmit={loginForm.handleSubmit}
					>
						{/* Name */}
						<div className='relative'>
							<Input
								name='email'
								change={loginForm.handleChange}
								blur={loginForm.handleBlur}
								value={loginForm.values.email}
								error={
									loginForm.touched.email && loginForm.errors.email
										? loginForm.errors.email
										: null
								}
								type='email'
								placeholder='Enter your Email Address'
								label='Email Address/ Phone number'
							/>
						</div>
						{/* Password */}
						<div className='relative'>
							<div className='absolute h-[42px] bottom-0 left-0 right-0 rounded-full bg-red-600'></div>
							<Input
								name='password'
								change={loginForm.handleChange}
								blur={loginForm.handleBlur}
								value={loginForm.values.password}
								error={
									loginForm.errors.password && loginForm.touched.password
										? loginForm.errors.password
										: null
								}
								type='password'
								placeholder='Enter your Password'
								label='Password'
							/>
							{/* <PasswordSymbol width='full' py='3' placeholder='Enter Your Password' /> */}
						</div>
						{/* remember me */}
						<div className='flex justify-between mt-[10px]'>
							<div className='font-sans text-base '>
								<input
									type='checkbox'
									name='rememberMe'
									onChange={loginForm.handleChange}
									value={loginForm.values.rememberMe}
									className='w-4 h-4 accent-primary border-white rounded'
								/>
								<label className='text-white pl-2'>Remember me</label>
							</div>
							<Link className='text-primary' to='/reset'>
								Forgot Password?
							</Link>
						</div>

						{/* Login */}
						<div className='flex  gap-2 mt-12'>
							{/* google login */}
							<Link
								to={`${import.meta.env.VITE_SERVER_URL}/login/google`}
								className='p-[11px] cursor-pointer bg-white rounded-full shrink-0'
							>
								<img src={google} alt='' />
							</Link>
							{/* facebook login */}
							<Link
								to={`${import.meta.env.VITE_SERVER_URL}/login/facebook`}
								className='p-[11px] cursor-pointer bg-white rounded-full shrink-0'
							>
								<img src={facebook} alt='' />
							</Link>
							{/* apple login */}
							<span className='p-[11px] cursor-pointer bg-white rounded-full shrink-0'>
								<img src={apple} alt='' />
							</span>
							{/* login button */}
							<Button
								full
								className='w-full'
								type='primary'
								buttonType='submit'
							>
								Login
							</Button>
						</div>
					</form>
				</div>
				<div className='flex flex-col  w-full h-full justify-center items-center'>
					<div className='max-w-[490px]'>
						<p className='text-[24px] font-sans font-medium text-white mb-5'>
							Log in to access your Project Packers Platform for order your
							products from any USA website.
						</p>
						<div className=''>
							<span className='text-[#ffffffb3] font-sans text-base font-normal'>
								Don’t have an account yet?
								<Link className='text-primary underline ms-2' to='/signup'>
									Sign up
								</Link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

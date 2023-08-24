/**
 * SignInModal() returns JSX Element
 * This function for user login
 *
 * @param {function} stateHandler takes string value to navigate state
 * @param {function} onClose callback function to close modal
 *
 * @returns JSX element
 */
import { useFormik } from 'formik';
import Button from '../UiElements/Buttons/Button';
import Input from '../UiElements/Input/Input';
import { loginSchema } from '../../Util/ValidationSchema';
import toaster from '../../Util/toaster';
import { useUserCtx } from '../../contexts/user/UserContext';
const SignInModal = ({ stateHandler, onClose }) => {
	const clickHandler = (state) => {
		stateHandler(state);
	};



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

			// hit login api with data
			Login(data).then((data) => {
				setUser(data);

				// check is loggedIn successful or not
				if (data.status === false) {
					// show toaster
					toaster({ type: 'error', message: data.message });
				} else {
					// check does login page need hit any api after login or not
					// if (sendRequest) {
					//   // hitting api for register request
					//   plane
					//     .request({
					//       name: 'registerRequest',
					//       body: requestItemData,
					//     })
					//     .then((d) => {
					//       // console.log('item request response from login', d);
					//       navigate('/home', { state: true });
					//     });
					// } else {
					//   navigate(path);
					// }
					onClose();
				}
			});
		},
	});

	return (
		<>
			<div className='grid grid-cols-3'>
				<div className='flex justify-start items-center cursor-pointer'>
					{/* Back button */}
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
				<div className='text-center text-2xl text-white font-bold'>Login</div>

				{/* Close button */}
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

			{/* login form */}
			<form onSubmit={loginForm.handleSubmit} className=''>
				<div className='grid gap-5'>
					{/* email */}
					<Input
						type='email'
						name='email'
						blur={loginForm.handleBlur}
						error={
							loginForm.touched.email && loginForm.errors.email
								? loginForm.errors.email
								: null
						}
						change={loginForm.handleChange}
						value={loginForm.values.email}
						label='Email Address'
						placeholder='Enter your email address'
					/>

					{/* password */}
					<Input
						name='password'
						type='password'
						blur={loginForm.handleBlur}
						error={
							loginForm.errors.password && loginForm.touched.password
								? loginForm.errors.password
								: null
						}
						change={loginForm.handleChange}
						value={loginForm.values.password}
						label='Password'
						placeholder='Enter your password'
					/>
					{/* login */}
					<Button type='primary' buttonType='submit'>
						Login
					</Button>
					<p
						onClick={() => clickHandler('reset')}
						className='text-primary text-center'
					>
						Forgot your password?
					</p>
				</div>
			</form>
			<div className='text-center text-white text-xs'>
				Don&apos;t have an Account?{' '}
				<span
					onClick={() => clickHandler('signup')}
					className='text-primary underline'
				>
					Sign Up
				</span>
			</div>
		</>
	);
};

export default SignInModal;

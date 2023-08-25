/**
 * NewPassword() returns JSX Element
 * @param {object} getResponse validation from server
 * @param {function} getResponse validation from server
 *
 *
 * @returns JSX element
 */
import { useFormik } from 'formik';
import Input from '../UiElements/Input/Input';
import { changePassword } from '../../Util/ValidationSchema';
import Button from '../UiElements/Buttons/Button';
import image from '../../assets/icons/otp.svg';
import { postApi } from '../../Util/apiCall';
import { useState } from 'react';
import toaster from '../../Util/toaster';
import { terminal } from '../../contexts/terminal/Terminal';
const NewPassword = ({ data, getResponse }) => {
	const [isSubmit, setIsSubmit] = useState(false);
	console.log(data);

	const resetForm = useFormik({
		initialValues: {
			newPassword: '',
			confirmPassword: '',
		},
		validationSchema: changePassword,
		onSubmit: (values) => {
			setIsSubmit(true);
			console.log({
				newpassword: values.newPassword,
				token: data.data.token,
				otp: data.otp,
			});
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
			<div className='max-w-[30vw] flex flex-col gap-12'>
				<div className=''>
					<p className='text-white text-[52px] font-sora font-extrabold'>
						keep your <br /> password secret
					</p>
				</div>
				<form className='flex flex-col gap-5' onSubmit={resetForm.handleSubmit}>
					<div className='relative'>
						<Input
							name='newPassword'
							label='New Password'
							placeholder='*****'
							change={resetForm.handleChange}
							blur={resetForm.handleBlur}
							value={resetForm.values.newPassword}
							error={
								resetForm.errors.newPassword && resetForm.touched.newPassword
									? resetForm.errors.newPassword
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
			</div>
			<div className='flex flex-col  w-full h-full justify-center items-center'>
				<img src={image} />
			</div>
		</>
	);
};

export default NewPassword;

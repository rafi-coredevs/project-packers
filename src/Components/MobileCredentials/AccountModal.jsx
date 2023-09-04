import Button from '../UiElements/Buttons/Button';
import google from '../../assets/icons/google-icon.svg';
import apple from '../../assets/icons/apple.svg';
import facebook from '../../assets/icons/facebook.svg';

/**
 * Represents a React component for an account modal.
 *
 * @param {function} stateHandler - Callback function to navigate state using a string value.
 * @param {function} onClose - Callback function to close the modal.
 *
 * @returns {JSX.Element} - React JSX element for the account modal component.
 */
const AccountModal = ({ stateHandler, onClose }) => {
	/**
	 * Handles click events and navigates to the specified state.
	 *
	 * @param {string} state - The state to navigate to.
	 */
	const clickHandler = (state) => {
		stateHandler(state);
	};

	return (
		<>
			<div className='grid grid-cols-3'>
				<div className='flex justify-start items-center'></div>
				<div className='text-center text-2xl text-white font-bold'>Account</div>
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
			<div className='flex gap-5 justify-center'>
				<img className='bg-white p-5 rounded-full' src={google} alt='' />
				<img className='bg-white p-5 rounded-full' src={facebook} alt='' />
				<img className='bg-white p-5 rounded-full' src={apple} alt='' />
			</div>
			<div className='grid gap-5 text-sm text-white'>
				<p className='text-center'>or use your email</p>
				<Button onClick={() => clickHandler('signup')} type='primary'>
					Sign Up
				</Button>
				<Button onClick={() => clickHandler('login')} type='light'>
					Login
				</Button>
			</div>
			<div className='text-center text-white text-xs'>
				Project Packers @2023
			</div>
		</>
	);
};

export default AccountModal;

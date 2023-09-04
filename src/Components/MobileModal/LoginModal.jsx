import { useState } from 'react';
import AccountModal from '../MobileCredentials/AccountModal';
import SignInModal from '../MobileCredentials/SignInModal';
import SignupModal from '../MobileCredentials/SignupModal';
import ResetModal from '../MobileCredentials/ResetModal';
import OtpModal from '../MobileCredentials/OtpModal';
import ResetPasswordModal from '../MobileCredentials/ResetPasswordModal';
import toaster from '../../Util/toaster';

/**
 * LoginModal component for displaying various authentication screens.
 *
 * @param {boolean} show - Boolean value to hide and show the modal.
 * @param {Function} onClose - Callback function to close the modal.
 * @param {string} ModalActiveScreen - The active screen within the modal.
 * @param {Object} requestData - Data associated with the request.
 * @param {Function} setSuccessModalState - for set the state of the success modal.
 * @returns {JSX.Element} - LoginModal component JSX
 */
const LoginModal = ({
	show,
	onClose,
	ModalActiveScreen,
	requestData,
	setSuccessModalState,
}) => {
	const [activeScreen, setActiveScreen] = useState(ModalActiveScreen);
	const [data, setData] = useState({});

	/**
	 * Handles the response from the authentication screens.
	 * Displays success or error messages using toast.
	 *
	 * @param {Object} res - Response data from the authentication screens.
	 */
	const getResponse = (res) => {
		if (res.status !== false) {
			{
				if (res.component === 'done') {
					toaster({ type: 'success', message: 'Password reset successful' });
					setActiveScreen('account');
				}
			}
			setActiveScreen(res.component); // setting next active screen
			setData(res);// setting data that come from previous active screen
			
		} else {
			toaster({ type: 'error', message: res.message });
		}
	};

	/**
	 * Handles the state change of the authentication screens.
	 *
	 * @param {string} state - The new state of the authentication screens.
	 */
	const stateHandler = (state) => {
		setActiveScreen(state);
	};

	/**
	 * Handles the modal close action.
	 */
	const closeHandler = () => {
		setActiveScreen('account');
		onClose();
	};

	return (
		<>
			<div
				className={`${
					show ? 'block' : ' hidden'
				}    fixed bottom-0 top-0 left-0 right-0 bg-[#03182ACC] z-[50] md:hidden `}
			></div>
			<div
				className={`fixed ${
					show ? 'bottom-0 ' : '-bottom-[1000px] '
				}  duration-500 left-0 right-0 bg-secondary rounded-t-xl py-5 px-[30px] z-[60] md:hidden`}
			>
				<div className='grid gap-8'>
					{activeScreen === 'account' && (
						<AccountModal stateHandler={stateHandler} onClose={closeHandler} />
					)}

					{activeScreen === 'login' && (
						<SignInModal
							setSuccessModalState={setSuccessModalState}
							requestData={requestData}
							stateHandler={stateHandler}
							onClose={closeHandler}
						/>
					)}

					{activeScreen === 'signup' && (
						<SignupModal stateHandler={stateHandler} onClose={closeHandler} />
					)}

					{activeScreen === 'reset' && (
						<ResetModal
							getResponse={getResponse}
							stateHandler={stateHandler}
							onClose={closeHandler}
						/>
					)}

					{activeScreen === 'otp' && (
						<OtpModal
							data={data}
							getResponse={getResponse}
							stateHandler={stateHandler}
							onClose={closeHandler}
						/>
					)}

					{activeScreen === 'resetPassword' && (
						<ResetPasswordModal
							data={data}
							getResponse={getResponse}
							stateHandler={stateHandler}
							onClose={closeHandler}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default LoginModal;

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Account from '../Components/Credentials/Account';
import Otp from '../Components/Credentials/Otp';
import NewPassword from '../Components/Credentials/NewPassword';
import { useTitle } from '../Components/Hooks/useTitle';
import toaster from '../Util/toaster';
//
const Recovery = () => {
	useTitle('Account Recovery');
	const [component, setComponent] = useState('account');
	const [data, setData] = useState({});
	const navigate = useNavigate();

	/**
	 * Callback function to handle responses from child components.
	 * Displays success or error toasts and manages component state transitions.
	 *
	 * @param {Object} res - The response data from child components.
	 */
	const getResponse = (res) => {
		if (res.status !== false) {
			{
				if (res.component === 'done') {
					toaster({ type: 'success', message: 'Password reset successful' });
					navigate('/login');
				}
			}

			setComponent(res.component); // setting next component
			setData(res);// setting data that come from child
		} else {
			toaster({ type: 'error', message: res.message });
		}
	};

	return (
		<div className='bg-secondary min-h-[calc(100vh-225px)] flex items-center'>
			<div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 relative z-20 justify-center divide-x divide-[#ffffff1a] flex-wrap'>
				{/* email verification */}
				{component === 'account' && <Account getResponse={getResponse} />}
				{/* otp verification */}
				{component === 'otp' && <Otp data={data} getResponse={getResponse} />}
				{/* setting new password */}
				{component === 'newPass' && (
					<NewPassword data={data} getResponse={getResponse} />
				)}
			</div>
		</div>
	);
};

export default Recovery;

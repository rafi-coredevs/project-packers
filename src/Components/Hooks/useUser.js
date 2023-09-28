import { useEffect, useState } from 'react';
import { terminal } from '../../contexts/terminal/Terminal';

/**
 * A custom hook for managing user authentication and related operations.
 *
 * @returns {Object} An object containing user-related functions and state.
 */
const useUser = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	/**
	 * Logs in the user with the provided credentials.
	 *
	 * @param {Object} userCred - User login credentials.
	 * @returns {Promise} A promise that resolves with login status.
	 */
	const Login = (userCred) => {
		return terminal.request({ name: 'logIn', body: userCred });
	};

	/**
	 * Logout user
	 */
	const Logout = () => {
		setLoading(true);
		terminal.request({ name: 'logOut' }).then((data) => {
			if (data.status) {
				setUser(null);
				setLoading(false);
			}
			return data.status;
		});
	};

	/**
	 * Signs up a new user with the provided user information.
	 *
	 * @param {Object} userInfo - User registration information.
	 * @returns {Promise} A promise that resolves with the signup status.
	 */
	const SignUp = (userInfo) => {
		return terminal.request({ name: 'registerUser', body: userInfo });
	};

	/**
	 * Fetches user information and initializes the user state.
	 */
	const fetchUser = () => {
		terminal.request({ name: 'fetchUser' }).then((data) => {
			if (data.id) {
				if (data.role === 'staff' || data.role === 'admin') {
					!data.loggedin && Logout();
				}
				setUser(data);
				terminal.socket.connect();
			} else {
				terminal.socket.disconnect();
			}
			setLoading(false);
		}).catch(err => console.log(err));
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return {
		setUser,
		loading,
		Login,
		Logout,
		user,
		SignUp,
	};
};

export default useUser;

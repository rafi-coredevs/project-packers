import { useEffect, useState } from "react";
import { terminal } from "../../contexts/terminal/Terminal";

const useUser = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const Login = (userCred) => {
		setLoading(true);
		return terminal.request({ name: 'logIn', body: userCred });
	};

	const Logout = () => {
		setLoading(true);
		terminal.request({ name: 'logOut' }).then(data => {
			if (data.status) {
				setUser(null)
				setLoading(false);
			}
			return data.status;
		})
	};

	useEffect(() => {
		terminal.request({ name: 'fetchUser' }).then((data) => {
			if (data.id) {
				setUser(data);
				terminal.socket.connect();
			}
			else {
				terminal.socket.disconnect();
			}
			setLoading(false);
		});
	}, []);

	return {
		setUser,
		loading,
		Login,
		Logout,
		user,
	}
}

export default useUser
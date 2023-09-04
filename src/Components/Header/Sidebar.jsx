import logo from '../../assets/logo.svg';
import Icon from '../UiElements/Icon/Icon';
import profile from '../../assets/icons/Avatar.svg';
import notification from '../../assets/icons/cd-notification.svg';
import support from '../../assets/icons/cd-customer-support.svg';
import logout from '../../assets/icons/logout-01.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useUserCtx } from '../../contexts/user/UserContext';

/**
 * SideBar() return JSX Element
 * mobile view side navbar
 *
 * @param {boolean} state  used to change the visibility of sidebar.
 * @param {function} onChange callback function.
 *
 * @returns JSX Elements.
 */

const Sidebar = ({ state, onChange }) => {
	const navigate = useNavigate();
	const { Logout } = useUserCtx();

	/**
	 * For handling log out
	 */
	const logoutHandler = () => {
		Logout();
		navigate('/');
	};
	if (state) {
		return (
			<div className=' absolute sm:hidden top-0 bottom-0 right-20 left-0 bg-white z-[101] p-5'>
				<div className='flex gap-2 py-5 my-5 border-b border-[#124E581A]'>
					<img src={logo} alt='' />
					{/* <Button type="secondary">Log in or Sign Up</Button> */}
				</div>
				<div className='flex flex-col gap-3'>
					<div className='flex gap-3 items-center'>
						<Icon type='active' icon={profile} />
						<Link
							onClick={() => onChange()}
							to='account/orders'
							className='font-sans text-base font-normal text-secondary'
						>
							My Account
						</Link>
					</div>
					<div className='flex gap-3 items-center'>
						<Icon type='actual' icon={notification} />
						<Link
							onClick={() => onChange()}
							to='/notification'
							className='font-sans text-base font-normal text-secondary'
						>
							Notification
						</Link>
					</div>
					<div className='flex gap-3 items-center'>
						<Icon type='actual' icon={support} />
						<Link
							onClick={() => onChange()}
							to='/support'
							className='font-sans text-base font-normal text-secondary'
						>
							Support
						</Link>
					</div>
					<div className='flex gap-3 items-center'>
						<Icon type='actual' icon={logout} />
						<button
							onClick={logoutHandler}
							className='font-sans text-base font-normal text-secondary'
						>
							Log Out
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default Sidebar;

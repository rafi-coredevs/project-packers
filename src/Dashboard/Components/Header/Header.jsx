import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../../Components/UiElements/Dropdown/Dropdown";
import Icon from "../../../Components/UiElements/Icon/Icon";
import logo from "../../../assets/logo.svg";
import notification from "../../../assets/icons/cd-notification.svg";
import profile from "../../../assets/icons/user-1.svg";
import { useUserCtx } from "../../../contexts/user/UserContext";
import { terminal } from "../../../contexts/terminal/Terminal";
import { SearchField } from "../UiElements/SearchField/SearchField";
import UserIcon from "../../../Components/UiElements/UserIcon/UserIcon";

const Header = () => {
  const [notifyState, setNotifyState] = useState(false);
  const { user, Logout } = useUserCtx()
  const [logoutDropD, setLogoutDropD] = useState(false)
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    user?.id && terminal.request({ name: 'getNotification' }).then(data => data.docs && setNotifications(data.docs))
  }, [user])

  useEffect(() => {
    terminal.socket.on('notification', (data) => {
      if (data.logout) { Logout(); navigate("/"); }
      else
        setNotifications((prev) => [data, ...prev]);
    })
    return () => {
      terminal.socket.off('notification')
    }
  })
  return (
    <div className="sticky top-0 mt-0 pt-0  bg-white z-50 border-b border-gray-300">
      <div className="mx-6 hidden  sm:flex navbar gap-4 py-[10px] items-center justify-between">
        <Link
          to="/admin"
          className="w-[142px] h-11 justify-start items-center gap-2 inline-flex flex-shrink-0"
        >
          <img src={logo} alt="Project Packers" />
          <div className="text-secondary text-base font-bold leading-none">
            Project
            <br />
            Packers
          </div>
        </Link>
        <div className="w-full max-w-[650px] border-2 border-[#0000001a] rounded-lg">
          {/* <Input
            type="text"
            placeholder="Search"
            className={'placeholder:text-black'}
          >
            <img src={search} alt="" />
          </Input> */}
          <SearchField />
        </div>
        <div className="flex gap-10 items-center">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <span
                className="hover:cursor-pointer"
                onClick={() => {
                  setNotifyState(!notifyState);
                }}
              >
                <Icon unread={false} icon={notification} />
              </span>
              <Dropdown
                type="notification"
                isOpen={notifyState}
                onClick={() => setNotifyState(false)}
                title="Notification"
                data={notifications}
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setLogoutDropD(!logoutDropD)}
                className="flex gap-2 items-center cursor-pointer"
              >
                <UserIcon name={user?.fullName} />
                <p className="font-sans text-secondary text-sm font-semibold">
                  {user?.fullName || "User"}
                </p>
              </button>
              {logoutDropD && <div className="bg-white py-6 shadow-md shadow-primary px-2 border rounded-lg absolute top-10 left-0 right-0  mt-1">
                <button onClick={() => { Logout(); navigate("/"); }} className="bg-primary px-2 w-full rounded-md py-2 text-secondary font-medium">Logout</button>
              </div>

              }
            </div>
            <Dropdown type="logout" isOpen={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "../../../Components/UiElements/Dropdown/Dropdown";
import Icon from "../../../Components/UiElements/Icon/Icon";
import Input from "../UiElements/Input/Input";
import search from "../../../assets/icons/search3.svg";
import logo from "../../../assets/logo.svg";
import notification from "../../../assets/icons/cd-notification.svg";
import profile from "../../../assets/icons/user-1.svg";
import {  Toaster } from "react-hot-toast";
const DUMMY_NOTIFICATION = [
  {
    id: 1,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
  {
    id: 2,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
  {
    id: 3,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
  {
    id: 4,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
];

const Header = () => {
  const [notifyState, setNotifyState] = useState(false);
  const { user } = useSelector((state) => state.userInfo);
  return (
    <div className="sticky top-0 mt-0 pt-0  bg-white z-50 shadow-sm ">
      <Toaster />
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
        <div className="w-full max-w-[650px]">
          <Input
            type="text"
            placeholder="Search"
          >
            <img src={search} alt="" />
          </Input>
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
                <Icon unread={true} icon={notification} />
              </span>
              <Dropdown
                type="notification"
                isOpen={notifyState}
                title="Notification"
                data={DUMMY_NOTIFICATION}
              />
            </div>

            <div className="relative">
              <Link
                to="/admin"
                className="flex gap-2 items-center cursor-pointer"
              >
                <Icon type="active" unread={false} icon={profile} />
                <p className="font-sans text-secondary text-sm font-semibold">
                  {user?.name || "User"}
                </p>
              </Link>
            </div>
            <Dropdown type="logout" isOpen={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

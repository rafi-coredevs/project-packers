import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({
  type = "navlink",
  icon,
  title = "no title",
  url,
  children,
}) => {
  const [collapse] = useState(true);
  const collapseHandler = () => {
    // setCollapse(!collapse);
  };

  if (type === "collapse") {
    return (
      <>
        <button className="" onClick={collapseHandler}>
          <div className="flex justify-between items-center relative">
            <div className="">
              <div
                className={`absolute h-full w-1 bg-primary rounded-full opacity-0`}
              ></div>
              <div
                className={`flex gap-2 ml-3 items-center rounded text-base font-medium  w-full py-2 px-3`}
              >
                <div className="h-6 w-6">
                  <img className="h-full w-full" src={icon} alt="" />
                </div>
                <p className={`text-secondary`}>{title}</p>
              </div>
            </div>
            <svg
              className={`${
                collapse ? "rotate-90" : "rotate-0"
              } transition-transform`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.46967 5.46967C8.76256 5.17678 9.23744 5.17678 9.53033 5.46967L14.8232 10.7626C14.8313 10.7706 14.8394 10.7788 14.8476 10.7869C14.9927 10.9319 15.1496 11.0887 15.2641 11.2388C15.3984 11.4147 15.5429 11.6665 15.5429 12C15.5429 12.3335 15.3984 12.5853 15.2641 12.7612C15.1496 12.9113 14.9927 13.0681 14.8476 13.2131C14.8394 13.2212 14.8313 13.2294 14.8232 13.2374L9.53033 18.5303C9.23744 18.8232 8.76256 18.8232 8.46967 18.5303C8.17678 18.2374 8.17678 17.7626 8.46967 17.4697L13.7626 12.1768C13.8326 12.1067 13.8894 12.0499 13.9377 12C13.8894 11.9501 13.8326 11.8933 13.7626 11.8232L8.46967 6.53033C8.17678 6.23744 8.17678 5.76256 8.46967 5.46967Z"
                fill="#141B34"
              />
            </svg>
          </div>
          <div
            className={`${collapse ? "block" : "hidden"} transition-transform`}
          >
            {children}
          </div>
        </button>
      </>
    );
  } else {
    return (
      // end removed
      <NavLink to={url} >
        {({ isActive }) => (
          <div className="flex relative">
            <div
              className={`absolute h-full w-1 bg-primary rounded-full ${
                isActive ? "opacity-100" : "opacity-0"
              } `}
            ></div>
            <div
              className={`flex gap-2 ml-3 items-center rounded text-base font-medium ${
                isActive ? "bg-secondary" : "bg-transparent"
              }  w-full py-2 px-3`}
            >
              <div className="h-6 w-6">
                {icon && <img className="h-full w-full" src={icon} alt="" />}
              </div>
              <p className={`${isActive ? "text-white" : "text-secondary"}`}>
                {title}
              </p>
            </div>
          </div>
        )}
      </NavLink>
    );
  }
};

export default NavItem;

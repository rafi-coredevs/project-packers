/**
 * NavItem() returns JSX Element
 * this component has two types. 
 * collapsible and non collapsible
 * 
 * @param {string} args.type defines the custom type of element; whether collapsible or not
 * @param {string} args.icon icon url for the left side icon
 * @param {string} args.title navlink title
 * @param {string} args.url - sets the route a particular navlink should follow
 * @param {object} args.children only work for collapsible items
 * @param {boolean} args.end - styling of navlink depends on whether it's an end route or an extendable 
 * 
 * @returns JSX Element  
 */
import arrow from '../../../../assets/icons/Vector.svg'
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({
  type = "navlink",
  icon,
  title = "no title",
  url,
  children,
  end
}) => {
  const [collapse, setCollapse] = useState(false);

  const collapseHandler = () => {
    setCollapse(!collapse);
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
            <img className={`${!collapse ? "-rotate-90" : "rotate-0"
              } transition-transform`} src={arrow} />

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
      <NavLink to={url} end={end}>
        {({ isActive }) => (
          <div className="flex relative">
            <div
              className={`absolute h-full w-1 bg-primary rounded-full ${isActive ? "opacity-100" : "opacity-0"
                } `}
            ></div>
            <div
              className={`flex gap-2 ml-3 items-center rounded text-base font-medium ${isActive ? "bg-secondary" : "bg-transparent"
                }  w-full py-2 px-3`}
            >
              <div className="h-6 w-6">
                {icon && <img className={`${isActive ? 'filter hue-rotate-180  contrast-200' : ""} h-full w-full`} src={icon} alt="" />}

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
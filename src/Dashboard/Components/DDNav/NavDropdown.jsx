
import { NavLink } from 'react-router-dom';
import arrow from '../../../assets/icons/cd-arrow-right-2.svg';
import { useState } from 'react';

/**
 * Nav with dropdown
 * @param {Object} list Array of Object with Nav data 
 * @returns Dropdown Nav component
 */

const NavDropdown = ({ list = Object, userRole }) => {
  const [open, setOpen] = useState(false);
  // console.log(list);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center justify-between w-full px-6 cursor-pointer'
      >
        <div className='flex items-center gap-2 py-2'>
          <img src={list.icon} alt={list.icon} />
          <p>{list.title}</p>
        </div>
        <img src={arrow} alt="arrow" className={`duration-150 ${open ? '-rotate-90' : 'rotate-90'}`} />
      </div>
      {
        open && <ul className='flex flex-col'>
          {
            list.isDropdown.filter((dropDownItem) => dropDownItem.access.includes(userRole)).map(dropDownLink => <li
              key={dropDownLink.id}
              className='w-full flex items-center gap-2'
            >
              <NavLink
                to={dropDownLink.to}
                end={dropDownLink.end && true}
                className={({ isActive }) => isActive ? 'bg-primary w-2 h-10 rounded-full' : 'w-2 h-10 rounded-full'}
              />
              <NavLink
                to={dropDownLink.to}
                end={dropDownLink.end && true}
                className={({ isActive }) => isActive ? 'bg-secondary text-white w-full rounded-lg px-10' : 'w-full px-10'}
              >
                <p className='py-2'>{dropDownLink.title}</p>
              </NavLink>
            </li>)
          }
        </ul>
      }
    </>
  );
};

export default NavDropdown;

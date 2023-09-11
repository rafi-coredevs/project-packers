import { NavLink, useLocation } from 'react-router-dom';

/**
 * Nav without dropdown
 * @param {Object} list Array of Object with Nav data 
 * @returns Nav component
 */

const NavNoDropdown = ({ list }) => {
  const location = useLocation();
  const activePath = location.pathname.split('/').slice(0, 3).join('/');

  
  return (
    <div className='w-full flex items-center gap-2'>
      <NavLink
        to={list.to}
        end={list.end}
        className={({ isActive }) => isActive ? 'bg-primary w-2 h-10 rounded-full' : 'w-2 h-10 rounded-full'}
      />
      <NavLink
        to={list.to}
        end={list.end}
        className={({ isActive }) => isActive ? 'bg-secondary text-white w-full rounded-lg px-2' : 'w-full px-2'}
      >
        <span className='flex items-center gap-2 py-2'>
          <img src={activePath === list.to ? list.iconWhite : list.icon} alt={list.icon} />
          <p>{list.title}</p>
        </span>
      </NavLink>
    </div>
  );
};

export default NavNoDropdown;

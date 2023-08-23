import { createContext, useContext } from 'react';
import useUser from '../../Components/Hooks/useUser';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	return <UserContext.Provider value={useUser()} > {children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserCtx = () => useContext(UserContext);

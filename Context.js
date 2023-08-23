import React, { createContext, useContext } from 'react'
import useUser from './src/Hooks/useUser';

const context = createContext();

export default function Context({ children }) {
    const [user] = useUser()
    return (
        <context.Provider value={user}>
            {children}
        </context.Provider>
    )
}

export const useNewContext = () => useContext(context);

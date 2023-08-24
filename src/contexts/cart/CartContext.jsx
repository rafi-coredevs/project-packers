import { createContext, useContext } from "react";
import useCart from "../../Components/Hooks/useCart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    return <CartContext.Provider value={useCart()}>{children}</CartContext.Provider>
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartCtx = () => useContext(CartContext);
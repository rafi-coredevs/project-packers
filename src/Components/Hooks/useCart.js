import { useState } from "react";
import { terminal } from "../../contexts/terminal/Terminal";


const useCart = () => {
    const [cart, setCart] = useState()

    const getCart = () => {
        terminal.request({ name: 'getCart' }).then(data => {
            if (data.id) {
                setCart(data);
            }
        })
    }
    return {
        getCart,
        setCart,
        cart
    }
};

export default useCart;
import { useEffect, useState } from "react";
import { terminal } from "../../contexts/terminal/Terminal";
import { useUserCtx } from "../../contexts/user/UserContext";

const useCart = () => {
  const [cart, setCart] = useState({});
  const {user} = useUserCtx()
  const getCart = () => {
    terminal.request({ name: "getCart" }).then((data) => {
      if (data.id) {
        setCart(data);
      }
    });
  };
  useEffect(() => {
    if(!user?.id) return;
    getCart();
  }, [user]);

  return {
    getCart,
    setCart,
    cart,
  };
};

export default useCart;

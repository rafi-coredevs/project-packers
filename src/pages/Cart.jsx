import { useDispatch, useSelector } from "react-redux";
import PriceCard from "../Components/PriceCard/PriceCard";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import Button from "../Components/UiElements/Buttons/Button";
import CartItem from "../Components/UiElements/CartItem/CartItem";
import Input from "../Components/UiElements/Input/Input";
import { useEffect, useState } from "react";
import { patchApi, postApi } from "../Util/apiCall";
import { successToast } from "../Util/toaster";
import { userSignin } from "../Store/userSlice";

const Cart = () => {
  const { user } = useSelector((state) => state.userInfo);
  const [cart, setCart] = useState(user?.cart);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [cost, setCost] = useState(null);
  const [error, setError] = useState(null);
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    let discountPrice = 0,
      normalPrice = 0,
      usTax = 0,
      packersFee = 0;
    cart.forEach((item) => {
      usTax += item?.product?.tax * item?.quantity;
      packersFee += item?.product?.fee * item?.quantity;
      console.log(item);
      if (discount) {
        if (
          discount?.category === item?.product?.category &&
          discount?.subCategory === item?.product?.subCategory
        ) {
          discountPrice += item?.product?.price * item?.quantity;
        } else {
          normalPrice += item?.product?.price * item?.quantity;
        }
      } else {
        normalPrice += item?.product?.price * item?.quantity;
      }
    });
    //const sellerTakes = discountPrice + normalPrice;
    console.log(normalPrice);
    const sellerTakes = discount
      ? discount.type === "f"
        ? discountPrice - discount?.amount + normalPrice
        : (discountPrice * (100 - discount?.amount)) / 100 + normalPrice
      : normalPrice;
    const total = sellerTakes + usTax + packersFee;
    setCost({ sellerTakes, usTax, packersFee, total });
  }, [cart, discount]);

  const qthandler = (id, qt) => {
    let updateItem = cart.find((item) => item.product.id === id);
    const newCart = cart.map((item) => {
      if (item.product.id === id) {
        return {
          id: item.id,
          quantity: qt,
          product: updateItem.product,
        };
      }
      return item;
    });
    setCart(newCart);
    setDisabled(true);
  };

  const undateCartHandler = () => {
    console.log(cart);
    patchApi("/user/cart", { cart }).then((res) => {
      if (res.status === 200) {
        successToast("Cart Updated");
        dispatch(userSignin(res.data));
        setCart(res?.data?.cart);
        setDisabled(false);
      }
    });
  };
  const discountHandler = (event) => {
    setError(null);
    event.preventDefault();
    console.log(event.target.discount.value);
    postApi("/discount-check", { code: event.target.discount.value }).then(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          setDiscount(res.data);
        } else {
          setError(res.data);
        }
      }
    );
  };
  const checkoutHandler = () => {
    console.log("clicked");
  };

  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto py-12 ">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 sm:col-span-3 px-5 sm:px-0">
            <table className="w-full">
              <thead className=" text-secondary text-left border-b border-[#00000023]">
                <tr>
                  <th className=" w-9/12 font-semibold pb-[14px]">
                    Product List
                  </th>
                  <th className="w-1/12 font-semibold pb-[14px]">Quantity</th>
                  <th className=" w-2/12 font-semibold pb-[14px] hidden sm:table-cell">
                    {" "}
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item) => (
                  <CartItem changeQt={qthandler} key={item.id} data={item} />
                ))}
              </tbody>
            </table>
            <div className="my-8 flex justify-between flex-wrap gap-2">
              <form
                onSubmit={discountHandler}
                className="flex gap-2 flex-wrap justify-center"
              >
                <Input
                  name="discount"
                  type="text"
                  placeholder="Discount code"
                  border
                />

                <Button type="lightGreen" buttonType="submit">
                  Apply
                </Button>
              </form>
              <Button onClick={undateCartHandler} type="light">
                Update Cart
              </Button>
            </div>
            {error && <p className="text-[red]">{error}</p>}
            {discount && (
              <p className="text-[green]">
                {" "}
                Discount code `{discount.code}` successfully applied.
              </p>
            )}
          </div>
          <div className="col-span-5 sm:col-span-2">
            <PriceCard
              type="cart"
              sellerTakes={cost?.sellerTakes}
              tax={cost?.usTax}
              fee={cost?.packersFee}
              estimated={cost?.total}
              disabled={disabled}
              onSubmit={checkoutHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

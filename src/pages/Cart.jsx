/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import cross from "../assets/icons/cd-cancel.svg";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import { terminal } from "../contexts/terminal/Terminal";
import { useCartCtx } from "../contexts/cart/CartContext";
import toaster from "../Util/toaster";
import CartItem from "../Components/UiElements/CartItem/CartItem";
import Input from "../Components/UiElements/Input/Input";
import PriceCard from "../Components/PriceCard/PriceCard";
import Button from "../Components/UiElements/Buttons/Button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  let sellerTakes = 0;
  let tax = 0;
  let fee = 0;
  let totalPrice = 0;
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const { cart, setCart } = useCartCtx();

  useEffect(() => {
    if (cart?.id) {
      if (cart.discountApplied) setDiscount(cart.discountApplied);
    }
  }, [cart]);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        products: prevCart.products.map((item) =>
          item.product.id === id ? { ...item, productQuantity: quantity } : item
        ),
        requests: prevCart.requests.map((item) =>
          item.request.id === id ? { ...item, requestQuantity: quantity } : item
        ),
      };
      return updatedCart;
    });
  }, []);

  useEffect(() => {
    let discountItemsTotal = 0;
    let nondiscountItemsTotal = 0;
    let discountamount = 0;
    let totalPrice = 0;

    if (cart) {
      cart.products.forEach((product) => {
        const total =
          (product.product.price + product.product.tax + product.product.fee) *
          product.productQuantity;
        if (
          discount?.code &&
          product.product.category.toString() === discount.category &&
          product.product.subcategory.toString() === discount.subcategory
        ) {
          discountItemsTotal += total;
        } else {
          nondiscountItemsTotal += total;
        }
      });

      discountamount = discount?.percentage
        ? (discountItemsTotal * discount.percentage) / 100
        : discount?.amount;
      totalPrice = discountamount
        ? totalPrice + nondiscountItemsTotal - discountamount
        : totalPrice + nondiscountItemsTotal;
      setPrice(totalPrice);
    }
  }, [cart, discount]);

  const addDiscount = async (e) => {
    e.preventDefault();
    if (cart.discountApplied) {
      toaster({ type: "error", message: "Discount already applied" });
      return;
    }

    const response = await terminal.request({
      name: "useDiscount",
      queries: { code: e.target.code.value.toUpperCase() },
    });

    if (response.code) {
      setDiscount(response);
      toaster({ type: "success", message: "Discount Applied" });
      const updatedCart = await terminal.request({
        name: "updateCart",
        body: { discountApplied: response },
      });
      if (updatedCart.id) {
        setCart(updatedCart);
      }
    } else {
      toaster({
        type: "error",
        message:
          response.message || "An error occurred. Please try again later",
      });
    }
  };

  const removeDiscount = async () => {
    const data = await terminal.request({
      name: "updateCart",
      body: { discountApplied: {} },
    });
    if (data.id) setCart(data);
    await terminal
      .request({ name: "abandonDiscount", queries: { code: discount.code } })
      .then((data) => {
        if (data.status) {
          toaster({ type: "success", message: data.message });
          setDiscount();
        }
      });
  };

  const updateCart = async () => {
    const products = cart.products.map((product) => ({
      product: product.product.id,
      productQuantity: product.productQuantity,
    }));

    const requests = cart.requests.map((request) => ({
      request: request.request.id,
      requestQuantity: request.requestQuantity,
    }));
    console.log(products);
    const data = await terminal.request({
      name: "updateCart",
      body: {
        ...(products.length && { products }),
        ...(requests.length && { requests }),
      },
    });
    if (data.id) { setCart(data); }
    else {
      toaster({ type: 'error', message: data.message })
    }
  };

  const submitHandler = () => {
    navigate('/checkout')
  }
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
                {cart?.products.length > 0 && cart?.products.map((product) => {
                  sellerTakes += product?.product?.price * product.productQuantity;
                  tax += product?.product?.tax * product.productQuantity;
                  fee += product?.product?.fee * product.productQuantity;
                  return (
                    <CartItem
                      key={product?.id}
                      data={product?.product}
                      quantity={product.productQuantity}
                      onChange={updateQuantity}
                    />
                  );
                })}
                {cart.requests.length > 0 && cart?.requests.map((request) => {
                  sellerTakes += request?.request?.price * request.requestQuantity;
                  tax += request?.request?.tax * request.requestQuantity;
                  fee += request?.request?.fee * request.requestQuantity;
                  totalPrice += (request?.request?.price + request?.request?.tax + request?.request?.fee) * request.requestQuantity
                  return (
                    <CartItem
                      key={request?.id}
                      data={request?.request}
                      quantity={request.requestQuantity}
                      onChange={updateQuantity}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="my-8 flex justify-between flex-wrap gap-2">
              {!discount?.code ? (
                <form
                  onSubmit={addDiscount}
                  className="flex gap-2 flex-wrap justify-center"
                >
                  <Input
                    name="code"
                    type="text"
                    placeholder="Discount code"
                    border
                  />
                  <Button type="lightGreen" buttonType="submit">
                    Apply
                  </Button>
                </form>
              ) : (
                <div className="bg-slate-50 py-3 px-8 rounded-50 flex justify-between gap-3 rounded-full">
                  <p>{discount.code}</p>
                  <button onClick={removeDiscount}>
                    <img src={cross} className="w-5 h-5" alt="" />
                  </button>
                </div>
              )}

              <Button onClick={updateCart} type="light" on>
                Update Cart
              </Button>
            </div>
          </div>
          <div className="col-span-5 sm:col-span-2">
            <PriceCard
              type="cart"
              sellerTakes={sellerTakes}
              tax={tax}
              fee={fee}
              estimated={price + totalPrice}
              onSubmit={submitHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

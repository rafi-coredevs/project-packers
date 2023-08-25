import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toaster from "../Util/toaster";
import icon from "../assets/icons/product-ok.svg";
import { useFormik } from "formik";
import Modal from '../Components/UiElements/Modal/Modal'
import Input from "../Components/UiElements/Input/Input";
import Button from "../Components/UiElements/Buttons/Button";
import { checkoutSchema } from "../Util/ValidationSchema";
import OrderSuccessModal from "../Components/OrderSuccessModal/OrderSuccessModal";
import { terminal } from "../contexts/terminal/Terminal";
const Checkout = () => {
  let totalPrice = 0;
  const [cart, setCart] = useState();
  const [discount, setDiscount] = useState();
  const [price, setPrice] = useState();
  const [inside, setInside] = useState(true);
  const [orderModal, setOrderModal] = useState(false);
  const [searchParams] = useSearchParams();
  const orderqueries = searchParams.get("order");
  let orderstatus = orderqueries?.split("?")[0];
  let orderid = orderqueries?.split("?")[1];

  useEffect(() => {
    terminal.request({ name: "getCart" }).then((data) => {
      if (data.id) {
        setCart(data);
        if (data.discountApplied) setDiscount(data.discountApplied);
      }
    });
    if (orderstatus === "success") {
      setOrderModal(true);
    }
  }, [orderstatus]);

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
      totalPrice = inside ? totalPrice + 99 : totalPrice + 150;
      setPrice(totalPrice);
    }
  }, [cart, discount, inside]);

  const checkoutForm = useFormik({
    initialValues: {
      email: "",
      phone: "",
      altPhone: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      area: "",
      zip: "",
      instruction: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (data) => {
      const body = {
        email: data.email,
        phone: data.phone,
        alternativephone: data.altPhone? data.altPhone : null,
        insideDhaka: inside,
        instructions: data.instruction? data.instruction:null,
        shippingaddress: {
          name: data.firstName + " " + data.lastName,
          address: data.address,
          city: data.city,
          area: data.area,
          zip: data.zip,
        },
      };
      console.log(body)
      terminal.request({ name: "registerOrder", body }).then((data) => {
        if (data.url) {
          window.location.replace(data.url);
          checkoutForm.resetForm();
        } else {
          toaster({ type: "error", message: data.message });
        }
      })
    },
  });

  // console.log(inside)

  return (
    <div className="container mx-auto py-12">
      <form
        onSubmit={checkoutForm.handleSubmit}
        className="grid grid-cols-12 gap-8"
      >
        <div className="col-span-12 md:col-span-8 px-5 sm:px-0">
          <h3 className="mb-6 text-lg font-medium text-[#0D3D4B]">
            Contact Information
          </h3>
          <div className="space-y-4">
            {/* Email address */}
            <Input
              styles="primary"
              type="email"
              label="Email Address."
              name="email"
              change={checkoutForm.handleChange}
              blur={checkoutForm.handleBlur}
              value={checkoutForm.values.email}
              error={
                checkoutForm.touched.email && checkoutForm.errors.email
                  ? checkoutForm.errors.email
                  : null
              }
              placeholder="Enter your Email Address."
              border
            />
            <Input
              styles="primary"
              type="tel"
              label="Phone Number."
              name="phone"
              change={checkoutForm.handleChange}
              blur={checkoutForm.handleBlur}
              value={checkoutForm.values.phone}
              error={
                checkoutForm.touched.phone && checkoutForm.errors.phone
                  ? checkoutForm.errors.phone
                  : null
              }
              placeholder="Enter your Phone Number"
              border
              required
            />
            <Input
              styles="primary"
              type="tel"
              label="Alternative phone number (Optional)."
              name="altPhone"
              change={checkoutForm.handleChange}
              blur={checkoutForm.handleBlur}
              value={checkoutForm.values.altPhone}
              error={
                checkoutForm.touched.altPhone && checkoutForm.errors.altPhone
                  ? checkoutForm.errors.altPhone
                  : null
              }
              placeholder="Enter your Phone Number"
              border
            />
          </div>

          {/* Shipping Address */}
          <h3 className="mb-6 text-lg font-medium text-[#0D3D4B] pt-12">
            Shipping address
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                styles="primary"
                type="text"
                label="First Name"
                name="firstName"
                change={checkoutForm.handleChange}
                blur={checkoutForm.handleBlur}
                value={checkoutForm.values.firstName}
                error={
                  checkoutForm.touched.firstName &&
                  checkoutForm.errors.firstName
                    ? checkoutForm.errors.firstName
                    : null
                }
                placeholder="Enter your first name."
                border
              />
              <Input
                styles="primary"
                type="text"
                label="Last Name"
                name="lastName"
                change={checkoutForm.handleChange}
                blur={checkoutForm.handleBlur}
                value={checkoutForm.values.lastName}
                error={
                  checkoutForm.touched.lastName && checkoutForm.errors.lastName
                    ? checkoutForm.errors.lastName
                    : null
                }
                placeholder="Enter your last name."
                border
              />
            </div>
            {/* address */}
            <Input
              styles="primary"
              type="text"
              label="Address"
              name="address"
              change={checkoutForm.handleChange}
              blur={checkoutForm.handleBlur}
              value={checkoutForm.values.address}
              error={
                checkoutForm.touched.address && checkoutForm.errors.address
                  ? checkoutForm.errors.address
                  : null
              }
              placeholder="Enter your Address."
              border
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* city */}
              <Input
                styles="primary"
                type="text"
                label="City"
                name="city"
                change={checkoutForm.handleChange}
                blur={checkoutForm.handleBlur}
                value={checkoutForm.values.city}
                error={
                  checkoutForm.touched.city && checkoutForm.errors.city
                    ? checkoutForm.errors.city
                    : null
                }
                placeholder="City"
                border
              />
              <Input
                styles="primary"
                type="text"
                label="Area"
                name="area"
                change={checkoutForm.handleChange}
                blur={checkoutForm.handleBlur}
                value={checkoutForm.values.area}
                error={
                  checkoutForm.touched.area && checkoutForm.errors.area
                    ? checkoutForm.errors.area
                    : null
                }
                placeholder="Area"
                border
              />
              <Input
                styles="primary"
                type="number"
                label="Zip Code"
                name="zip"
                change={checkoutForm.handleChange}
                blur={checkoutForm.handleBlur}
                value={checkoutForm.values.zip}
                error={
                  checkoutForm.touched.zip && checkoutForm.errors.zip
                    ? checkoutForm.errors.zip
                    : null
                }
                placeholder="Zip Code"
                border
              />
            </div>
            {/* Delivery Instruction */}
            <div className="flex flex-col">
              <label htmlFor="deliveryInstruction">
                Delivery Instruction (Optional)
              </label>
              <textarea
                className="border  w-full text-secondary placeholder:text-secondary p-4 outline-none rounded"
                name="instruction"
                onChange={checkoutForm.handleChange}
                onBlur={checkoutForm.handleBlur}
                value={checkoutForm.values.instruction}
                placeholder="Write Here..."
                rows={4}
              />
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="col-span-12 md:col-span-4 w-full  p-5 border rounded-[8px] h-fit ">
          <h3 className="text-xl font-medium text-[#0D3D4B] py-4 border-b">
            Your Order
          </h3>
          {/* Products details */}
          <div>
            <div className="flex items-center justify-between border-b pt-4 pb-2 text-base font-semibold ">
              <p className="text-start">Product</p>
              <p className="text-end">Subtotal</p>
            </div>
            {cart?.products?.length > 0 &&
              cart?.products?.map((product) => (
                <div
                  key={product.product.id}
                  className="flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium"
                >
                  <p className="text-start">{product.product.name}</p>
                  <p className="text-end">
                    ৳{" "}
                    {(product?.product?.price +
                      product?.product?.tax +
                      product?.product?.fee) *
                      product.productQuantity}{" "}
                  </p>
                </div>
              ))}
            {cart?.requests?.length > 0 &&
              cart?.requests?.map((request) => {
                totalPrice +=
                  (request?.request?.price +
                    request?.request?.tax +
                    request?.request?.fee) *
                  request.requestQuantity;
                return (
                  <div
                    key={request.request.id}
                    className="flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium"
                  >
                    <p className="text-start">{request.request.name}</p>
                    <p className="text-end">
                      ৳{" "}
                      {(request?.request?.price +
                        request?.request?.tax +
                        request?.request?.fee) *
                        request.requestQuantity}{" "}
                    </p>
                  </div>
                );
              })}
            {discount?.code && (
              <div className="flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium">
                <p className="text-start">{discount.code}</p>
                <p className="text-end">
                  {discount.amount
                    ? `৳ ${discount.amount} tk`
                    : discount.percentage}
                </p>
              </div>
            )}
            {/* Subtotal */}
            <div className="flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium">
              <p className="text-start">Subtotal</p>
              <p className="text-end text-black">৳ {price + totalPrice}tk </p>
            </div>
          </div>
          <h4 className="flex items-center justify-between pt-4 text-base text-slate-600 font-medium">
            Shipping
          </h4>
          {/* Radio Buttons */}
          <div className=" border-b py-4 text-base text-slate-600 font-medium">
            {/* Radio Buttons for inside dhaka */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="shippingDhaka"
                checked={inside}
                value={true}
                onClick={() => {
                  setInside(true);
                }}
                name="inSideDhaka"
                className="accent-orange-600"
                // {...register('insideDhaka')}
              />
              <label
                htmlFor="shippingDhaka"
                className="flex justify-between items-center w-full "
              >
                <span>Inside Dhaka</span>
                <span>99tk</span>
              </label>
            </div>

            {/* Radio Buttons for outside dhaka */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="shippingOutside"
                checked={!inside}
                value={false}
                name="insideDhaka"
                className="accent-orange-600"
                onClick={() => {
                  setInside(false);
                }}
              />
              <label
                htmlFor="shippingOutside"
                className="flex justify-between items-center w-full "
              >
                <span>Outside Dhaka</span>
                <span>150tk</span>
              </label>
            </div>
          </div>
          {/* Estimated Total */}
          <div className="flex items-center justify-between py-4 text-base text-black font-medium">
            <p className="text-start">Estimated total</p>
            <p className="text-end text-xl font-bold">
              ৳ {price + totalPrice}tk{" "}
            </p>
          </div>
          <Button type="primary" full buttonType="submit">
            Continue to payment
          </Button>
        </div>
      </form>
      <Modal show={orderModal} onClose={()=> setOrderModal(false)}>
        <OrderSuccessModal id={orderid?.split("=")[1]}  setOrderModal={setOrderModal}/>
      </Modal>
    </div>
  );
};

export default Checkout;

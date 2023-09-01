/**
 * Card Component
 * @param {string} type will define card style and parameters -> product | cart | checkout
 * @param {number} price product price
 * @param {string} origin product origin
 * @param {string} source product source
 * @param {string} arrival product delivery time
 * @param {number} sellerTakes cart price
 * @param {array} products array of products for checkout type
 * @param {object} children only for checkout type
 *
 * @returns {card} price card
 *
 */

import Button from "../UiElements/Buttons/Button";
import stamp from ".././../assets/icons/stamp.svg";
const PriceCard = ({
  type,
  price,
  source,
  origin,
  arrival,
  sellerTakes,
  tax,
  fee,
  estimated,
  products,
  onSubmit,
  disabled,
}) => {
  return (
    <div className="border text-lg font-medium  font-sans border-[#0003160D] mx-5 sm:mx-0 max-w-[490px] rounded-lg px-5 pt-1 pb-8">
      <div className="py-4 flex justify-between border-b border-[#0000000D]">
        <span className="text-[#475569]">
          {type === "product"
            ? "Product Price"
            : type === "cart"
            ? "Price Details"
            : "Your Order"}
        </span>
        {type === "product" && (
          <span className="text-2xl font-bold text-secondary">{price} tk</span>
        )}
      </div>
      {type === "product" && (
        <>
          <div className="py-4 flex gap-1 flex-col">
            <span className="  text-[#475569] ">Product From</span>
            <span className="">{origin}</span>
          </div>
          <div className=" pb-4 flex flex-col gap-1">
            <p className=" text-[#475569]">Where to buy</p>
            <p className="text-[#3E949A]">{source}</p>
          </div>
          <div className="flex justify-between pb-4">
            <p className="text-[#475569]">Approx delivery</p>
            <p className="">{arrival}</p>
          </div>
        </>
      )}
      {type === "cart" && (
        <>
          <div className="py-4 flex justify-between">
            <p className="text-base text-[#475569]">Seller takes</p>
            <p className="text-base font-medium text-[#000316]">
              ৳ {sellerTakes?.toFixed(2)} tk
            </p>
          </div>
          <div className="py-4 flex justify-between">
            <p className="text-base text-[#475569]">US Sales Tax</p>
            <p className="text-base font-medium text-[#000316]">
              ৳ {tax?.toFixed(2)} tk
            </p>
          </div>
          <div className="py-4 flex justify-between">
            <p className="text-base text-[#475569]">Packers Fee</p>
            <p className="text-base font-medium text-[#000316]">
              ৳ {fee?.toFixed(2)} tk
            </p>
          </div>
        </>
      )}
      {type === "checkout" && (
        <>
          <div className="flex justify-between pt-4 pb-2 border-b border-[#0000000D]">
            <p className="">Product</p>
            <p className="">subtotal</p>
          </div>
          {products?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex text-base text-[#475569] justify-between py-4 border-b border-[#0000000D]"
              >
                <p className="font-normal line-clamp-1 max-w-[200px] sm:max-w-[350px] ">
                  {item.title}
                </p>
                <p className="font-medium">৳ {item.price?.toFixed(2)}tk</p>
              </div>
            );
          })}
          <div className="flex text-base text-[#475569] justify-between py-4 border-b border-[#0000000D]">
            <p className="font-normal">Subtotal</p>
            <p className="font-semibold text-[#000316]">৳ {229900}tk</p>
          </div>
          <p className="font-normal text-base text-[#475569] py-4 ">Shipping</p>
          <div className="pb-4">
            <div className="flex gap-2 py-1">
              <input
                className="accent-yellow-700"
                type="radio"
                
                onChange={handleChange}
                onBlur={handleBlur}
                name="shipping"
                id=""
                checked
              />
              <div className="flex w-full justify-between">
                <label className="text-[#475569]" htmlFor="shipping">
                  Inside Dhaka
                </label>
                <p className="text-[#000316]">৳ 99.00tk </p>
              </div>
            </div>
            <div className="flex gap-2 py-1">
              <input
                className="accent-yellow-700"
                type="radio"
                name="shipping"
                id=""
              />
              <div className="flex w-full justify-between">
                <label className="text-[#475569]" htmlFor="shipping">
                  Outside Dhaka
                </label>
                <p className="text-[#000316] font-medium">৳ 150.00tk </p>
              </div>
            </div>
          </div>
        </>
      )}
      {type !== "product" && (
        <>
          <div className="py-4 border-t border-[#0000000D] flex justify-between">
            <p className="text-base text-[#000316]">Estimated total</p>
            <p className="text-xl font-bold text-secondary">
              ৳ {estimated?.toFixed(2)} tk
            </p>
          </div>
        </>
      )}
      <Button disabled={disabled} onClick={onSubmit} full buttonType='submit' type="primary">
        {type === "cart"
          ? "Checkout"
          : type === "product"
          ? "Request This Item"
          : "Continue to Payment"}
      </Button>
      {type === "product" && (
        <div className="mt-12 py-4 ">
          <div className="flex gap-2">
            <img src={stamp} alt="" />
            <p className="font-semibold text-secondary">
              100% Money Back Guarantee
            </p>
          </div>
          <p className="mt-2 text-base font-normal text-[#475569]">
            Project Packers protects your payment until you confirm you received
            your order.
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceCard;

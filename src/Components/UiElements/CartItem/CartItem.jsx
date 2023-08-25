import { useState } from "react";


const CartItem = ({ data, onChange, quantity }) => {

  const updateCuantity = (id, updatedquantity) => {
    onChange(id, quantity + updatedquantity)
  };
  const BASE_URL = import.meta.env.VITE_SERVER_URL
  return (
    <tr className="border-b">
      <td>
        <div className="h-[60px] my-2 pr-2 flex gap-3 items-center">
          <img
            className="h-16 w-16 border-[1px] p-[1px]"
            src={BASE_URL + `/${data.images[0]}`}
            alt=""
          />
          <div className="">
            <p className="sm:text-base text-sm font-normal wrap line-clamp-2 ">
              {data?.name}
            </p>
            <p className="sm:hidden block text-xs font-semibold">
              ৳ {data?.price.toFixed(2)} tk{" "}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="border-[#0000004d] border rounded-md flex items-center justify-center">
          <button
            disabled={quantity <= 0}
            onClick={() => updateCuantity(data?.id, -1)}
            className="px-2 pb-2 text-[#0000004d] text-3xl"
          >
            -
          </button>
          <span className="text-center max-w-[30px] text-secondary font-semibold outline-none">
            {quantity}
          </span>
          <button
            onClick={() => updateCuantity(data?.id, 1)}
            className="px-2 pb-2 text-[#0000004d] text-3xl h-full"
          >
            +
          </button>
        </div>
      </td>
      <td className="hidden px-2 sm:table-cell">
        ৳ {data?.price.toFixed(2)} tk
      </td>
    </tr>
  );
};

export default CartItem;

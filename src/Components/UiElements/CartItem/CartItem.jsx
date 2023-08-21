import { useState } from "react";
import { BASE_URL } from "../../../Util/apiCall";

const CartItem = ({ data, changeQt }) => {
  const [quantity, setQuantity] = useState(data?.quantity || 1);

  const updateCuantity = (qt) => {
    changeQt(data?.product?.id, data?.quantity + qt);
    setQuantity(quantity + qt);
  };
  return (
    <tr className="border-b">
      <td>
        <div className="h-[60px] my-2 pr-2 flex gap-3 items-center">
          <img
            className="h-full  w-[80px] border-[1px] p-[1px]"
            src={BASE_URL + "/api/" + data?.product?.thumbnails[0]}
            alt=""
          />
          <div className="">
            <p className="sm:text-base text-sm font-normal wrap line-clamp-2 ">
              {data?.product?.name}
            </p>
            <p className="sm:hidden block text-xs font-semibold">
              ৳ {data?.product?.price.toFixed(2)} tk{" "}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="border-[#0000004d] border rounded-md flex items-center justify-center">
          <button
            disabled={quantity < 1}
            onClick={() => updateCuantity(-1)}
            className="px-2 pb-2 text-[#0000004d] text-3xl"
          >
            -
          </button>
          <span className="text-center max-w-[30px] text-secondary font-semibold outline-none">
            {quantity}
          </span>
          <button
            onClick={() => updateCuantity(1)}
            className="px-2 pb-2 text-[#0000004d] text-3xl h-full"
          >
            +
          </button>
        </div>
      </td>
      <td className="hidden px-2 sm:table-cell">
        ৳ {data?.product?.price.toFixed(2)} tk
      </td>
    </tr>
  );
};

export default CartItem;

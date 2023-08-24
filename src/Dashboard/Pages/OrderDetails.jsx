import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import { useParams } from "react-router-dom";
import SideCard from "../Components/UiElements/SideCard/SideCard";
import Input from "../Components/UiElements/Input/Input";
import search from "../../assets/icons/cd-search2.svg";
import remove from "../../assets/icons/cd-cancel.svg";
import { products } from "../../Store/Data";
import { useTitle } from "../../Components/Hooks/useTitle";
// 
const OrderDetails = () => {
  useTitle("Order Details");
  const { orderId } = useParams();
  const updateHandler = () => {
    console.log("update clicked");
  };
  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`#${orderId}`}>
        <div className="flex items-center gap-1">
          <Button>Download Invoice</Button>
          <Button style="delete" onClick={updateHandler}>
            Delete
          </Button>
          <Button style="primary" onClick={updateHandler}>
            Update
          </Button>
        </div>
      </Heading>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 sm:col-span-2 grid gap-5">
          <div className="grid gap-5 rounded p-5">
            <div className="flex justify-between">
              <h3 className="text-base font-semibold">Products</h3>
              <button className="text-emerald-500">Add custom item</button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-full">
                <Input
                  styles="secondary"
                  type="text"
                  placeholder="Search Products"
                >
                  <img className="opacity-70" src={search} />
                </Input>
              </div>
              <Button style="outline">Browse</Button>
            </div>
            <div className="grid gap-3 relative overflow-x-auto">
              <table className="w-full ">
                <thead className="text-left font-semibold">
                  <tr className="border-b border-[#0000001c]">
                    <th className="w-8/12 py-2">Product</th>
                    <th className="w-2/12 py-2">Quantity</th>
                    <th className="w-1/12 py-2">Total</th>
                    <th className="w-1/12 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {products?.slice(0, 9).map((product) => {
                    return (
                      <tr
                        key={product.id}
                        className="border-t border-[#0000001c]"
                      >
                        <td className="py-2">
                          <div className="flex gap-2 items-center">
                            <img
                              className="w-8 h-8 rounded border-b border-[#0000001c]"
                              src={product.thumbnail}
                              alt=""
                            />
                            <div className="">
                              <p className="line-clamp-1">{product.title}</p>
                              <p className="text-[#475569] ">
                                ৳{product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2">
                          <Input styles="quantity" value={product.stock} />
                        </td>
                        <td className="py-2"> ৳{product.price.toFixed(2)}</td>
                        <td className="py-2 text-right">
                          <button
                            className="pe-3"
                            onClick={() => console.log("first")}
                          >
                            <img className="h-4 w-4" src={remove} alt="" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid gap-5 border border-[#0000001c] rounded p-5">
            <p className="text-base font-semibold">Payment</p>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <button className=" text-sm">Subtotal</button>
                <p className="">৳{11}</p>
              </div>
              <div className="flex justify-between items-center">
                <button className="text-emerald-500 underline text-sm">
                  Add Discount
                </button>
                <p className="">৳{11}</p>
              </div>
              <div className="flex justify-between items-center">
                <button className="text-emerald-500 underline text-sm">
                  Add Shipping
                </button>
                <p className="">{"-"}</p>
                <p className="">৳{11}</p>
              </div>
              <div className="flex justify-between items-center">
                <button className="text-emerald-500 underline text-sm">
                  Estimated Tax
                </button>

                <p className="text-">VAT{15}%</p>
                <p className="">৳{11}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Total</p>
                <p className="text-lg font-semibold">৳ 16</p>
              </div>
              <div className="py-5 flex gap-2 justify-end border-t border-[#0000001c] ">
                <select
                  className="bg-[#3E949A] border-none outline-none py-2 px-3 text-white rounded"
                  name=""
                  id=""
                >
                  <option value="completed" selected>
                    Completed
                  </option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipping">Shipping</option>
                  <option value="cancel">Cancel</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1 h-fit grid gap-5 pb-3">
          <div className=" border border-[#0000001c] divide-y  rounded-lg ">
            <SideCard types="customer" name="Ramjan Ali Anik" />
            <SideCard types="contact" email="example@gamil.com" />
            <SideCard
              types="address"
              title="Shipping Address"
              address="No Address"
            />
            <SideCard
              types="address"
              title="Billing Address"
              address="No Address"
            />
          </div>
          <div className=" border border-[#0000001c] divide-y  rounded-lg ">
            <SideCard types="note" message="Hello world" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

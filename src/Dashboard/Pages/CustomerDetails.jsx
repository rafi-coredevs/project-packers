import { useParams } from "react-router-dom";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import SideCard from "../Components/UiElements/SideCard/SideCard";
import arrowLeft from "../../assets/icons/cd-arrow-left-1.svg";
import { customerDetails } from "../../Store/Data";
import Table from "../Components/UiElements/Table/Table";
const CustomerDetails = () => {
    const { customerId } = useParams();
  const updateHandler = () => {
    console.log("update clicked");
  };
  return (
    <div className="px-5 h-full">
      <Heading  title={`#${customerId}`}>
        <div className="flex items-center gap-1">
          <Button style="delete" onClick={updateHandler}>
            Delete
          </Button>
          <Button style="primary" onClick={updateHandler}>
            Create Order
          </Button>
          <div className="">
            <Button style="outline">
              <img className="h-[19px] w-[19px]" src={arrowLeft} alt="" />
            </Button>
            <Button style="outline">
              <img className="h-[19px] w-[19px] rotate-180" src={arrowLeft} alt="" />
            </Button>
          </div>
        </div>
      </Heading>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 sm:col-span-2 grid gap-5">
          <div className="grid gap-5 rounded p-5">
            <div className="grid gap-3 relative overflow-x-auto">
              <Table type='customerDetails' data={customerDetails} />
            </div>
          </div>
          {/* <div className="grid gap-5 border border-[#0000001c] rounded p-5">
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
          </div> */}
        </div>
        <div className="col-span-3 sm:col-span-1 h-fit grid gap-5 pb-3">
          <div className=" border border-[#0000001c] divide-y  rounded-lg ">
            <SideCard types="customer" name="Ramjan Ali Anik" />
            <SideCard types="address" title="Address" address="2118 Thornridge Cir. Syracuse, Connecticut 35624" />
            <SideCard types="address" title="Total Spent" address={`$${(244).toFixed(2)}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
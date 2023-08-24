import { useState } from "react";
// import { Link } from "react-router-dom";
import Heading from "../Components/UiElements/Heading/Heading";
import filter from "../../assets/icons/cd-filter.svg";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import Card from "../Components/UiElements/Card/Card";
import Table from "../Components/UiElements/Table/Table";
import Input from "../Components/UiElements/Input/Input";
import search from "../../assets/icons/cd-search2.svg";
import { orderTable } from "../../Store/Data";
import { adminCard } from "../../Store/Data";
import { useTitle } from "../../Components/Hooks/useTitle";
const AllOrders = () => {
  useTitle("Order list");
  const [active, setActive] = useState("all");
  const [tableData] = useState(orderTable);

  const tableButtonHandler = (value) => {
    setActive(value);
    console.log(value);
  };

  return (
    <div className="h-full px-5 ">
      <Heading title="All Orders">
        <div className="flex gap-1 items-center">
          <Input type="text" placeholder="Search" styles="secondary">
            <img src={search} alt="" />
          </Input>
          <Input type="date" styles="secondary" />
        </div>
      </Heading>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3  border-b border-[#0000001c] py-5">
          <div className="grid lg:grid-cols-5 ">
            {adminCard?.map((item, key) => (
              <Card key={key} type={item.title} data={item.value} />
            ))}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-3">
          <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
            <div className="flex justify-between">
              <div className="py-2 my-auto">
                <button
                  onClick={() => tableButtonHandler("all")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "all" ? "bg-[#CFF6EF] rounded" : "bg-transparent"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => tableButtonHandler("pending")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "pending"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => tableButtonHandler("processing")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "processing"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Processing
                </button>
                <button
                  onClick={() => tableButtonHandler("shipping")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "shipping"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Shipping
                </button>
                <button
                  onClick={() => tableButtonHandler("cancelled")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "cancelled"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Cancelled
                </button>
                <button
                  onClick={() => tableButtonHandler("completed")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "completed"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Completed
                </button>
              </div>
              <div className="py-2 flex gap-1">
                <Input type="text" placeholder="Search" styles="secondary">
                  <img src={search} alt="" />
                </Input>
                <button className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={filter} alt="" />
                </button>
                <button className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>

            <Table type="order" data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

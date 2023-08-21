import  { useState } from 'react';
import { paymentList } from '../../Store/Data';
import Heading from '../Components/UiElements/Heading/Heading';
import Button from '../Components/UiElements/Button/Button';
import Table from '../Components/UiElements/Table/Table';
import filter from "../../assets/icons/cd-filter.svg";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import search from "../../assets/icons/cd-search2.svg";
import Input from '../Components/UiElements/Input/Input';

const Payment = () => {
    const [active, setActive] = useState("all");
    const [tableData] = useState(paymentList);
  
    const tableButtonHandler = (value) => {
      setActive(value);
      console.log(value);
    };
    const deleteHandler = () => {
      console.log("deleted");
    };
    return (
      <div className="h-full px-5 ">
        <Heading title="Payment List">
          <Button style="delete" onClick={deleteHandler}>
            delete
          </Button>
        </Heading>
        <div className="grid grid-cols-3 gap-5 py-5">
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
                    onClick={() => tableButtonHandler("closed")}
                    className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                      active === "closed"
                        ? "bg-[#CFF6EF] rounded"
                        : "bg-transparent"
                    }`}
                  >
                    Closed
                  </button>
                  <button
                    onClick={() => tableButtonHandler("closed")}
                    className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                      active === "closed"
                        ? "bg-[#CFF6EF] rounded"
                        : "bg-transparent"
                    }`}
                  >
                    Closed
                  </button>
                  <button
                    onClick={() => tableButtonHandler("abandoned")}
                    className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                      active === "abandoned"
                        ? "bg-[#CFF6EF] rounded"
                        : "bg-transparent"
                    }`}
                  >
                    Abandoned
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
  
              <Table type="payment" data={tableData} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Payment;
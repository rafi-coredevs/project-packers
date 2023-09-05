import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import SideCard from "../Components/UiElements/SideCard/SideCard";
import arrowLeft from "../../assets/icons/cd-arrow-left-1.svg";
import Table from "../Components/UiElements/Table/Table";
import { useTitle } from "../../Components/Hooks/useTitle";
import { useEffect, useState } from "react";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";
//
const CustomerDetails = () => {
  useTitle("replace-with-customer-name");
  const { customerId } = useParams();
  const [buttonType, setButtonType] = useState("all");
  const [tableData, setTabledata] = useState([]);
  const [user, setUser] = useState({});
  const [loading,setLoading]=useState(false);
  const updateHandler = () => {
    console.log("update clicked");
  };
  function tableButtonHandler(value) {
    setButtonType(value);
  }

  useEffect(() => {
    
    fetchData();
  }, [customerId]);

  const fetchData = () => {
    
    terminal
      .request({ name: "customerAllOrders", queries: { user: customerId } })
      .then((res) => res.status===false? toaster({tyoe:'error', message:res?.message}): setTabledata(res), setLoading(false));
  };
  useEffect(()=>{
   fetchUsers();

  },[customerId]);
  const fetchUsers =()=>{
    terminal.request({name: 'getNext', params: {current: customerId}}).then(res=> res.status===false? toaster({tyoe:'error', message:res?.message}): setUser(res[0]))
  }
  
  return (
    <div className="px-5 h-full">
      <Heading
        type={"navigate"}
        back={"Customers"}
        title={`${user?.current?.fullName || ""}`}
      >
        <div className="flex items-center gap-1">
          <Button style="delete" onClick={updateHandler}>
            Delete
          </Button>
          <Button style="primary" onClick={updateHandler}>
            Create Order
          </Button>
          <div className="">
            <Link  to={`/admin/customers/${user?.previous?._id}`}><Button disabled={user?.previous===null} style="outline">
              <img className="h-[19px] w-[19px]" src={arrowLeft} alt="" />
            </Button></Link>
            <Link to={`/admin/customers/${user?.next?._id}`}>
            <Button disabled={user?.next===null} style="outline">
              <img
                className="h-[19px] w-[19px] rotate-180"
                src={arrowLeft}
                alt=""
              />
            </Button>
            </Link>
          </div>
        </div>
      </Heading>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2 grid gap-5">
          <div className="grid gap-5 rounded h-fit">
            <div className="grid gap-3 relative overflow-x-auto">
              {/* table header */}
              <div className="flex justify-between">
                <div className="my-auto">
                  <button
                    onClick={() => tableButtonHandler("all")}
                    className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                      buttonType === "all"
                        ? "bg-[#CFF6EF] rounded"
                        : "bg-transparent"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => tableButtonHandler("new")}
                    className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                      buttonType === "new"
                        ? "bg-[#CFF6EF] rounded"
                        : "bg-transparent"
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => tableButtonHandler("returning")}
                    className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                      buttonType === "returning"
                        ? "bg-[#CFF6EF] rounded"
                        : "bg-transparent"
                    }`}
                  >
                    Draft
                  </button>
                  <button
                    onClick={() => tableButtonHandler("abandoned")}
                    className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                      buttonType === "abandoned"
                        ? "bg-[#CFF6EF] rounded"
                        : "bg-transparent"
                    }`}
                  >
                    Abandoned Checkouts
                  </button>
                </div>
                <div className=" flex gap-1">
                  <button className="border border-[#0000001f] p-2  ">
                    <img className="opacity-70" src={sort} alt="" />
                  </button>
                </div>
              </div>
              {/* table header end */}

              <Table
                type="customerDetails"
                data={tableData}
                dashboardToogle="customerDetails"
                loading={loading}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1 h-fit grid gap-5 pb-3">
          <div className=" border border-[#0000001c] divide-y  rounded-lg ">
            <SideCard types="customer" email={user?.current?.email} phone={user?.current?.phone}/>
            <SideCard
              types="custom"
              title="Address"
              address={user?.current?.shippingaddress?.address +', '+ user?.current?.shippingaddress?.city +', '+ user?.current?.shippingaddress?.area +', '+ user?.current?.shippingaddress?.zip}
            />
            <SideCard
              types="custom"
              title="Total Spent"
              //amount={`$${(244).toFixed(2)}`}
              amount={`not found from backend`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;

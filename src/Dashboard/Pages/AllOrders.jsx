import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Heading from "../Components/UiElements/Heading/Heading";
import filter from "../../assets/icons/cd-filter.svg";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import Table from "../Components/UiElements/Table/Table";
import Input from "../Components/UiElements/Input/Input";
import search from "../../assets/icons/cd-search2.svg";
import { orderTable } from "../../Store/Data";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import Overview from "../Components/Overview/Overview";
import Modal from "../../Components/UiElements/Modal/Modal";
import Button from "../../Dashboard/Components/UiElements/Button/Button";
import toaster from "../../Util/toaster";
import DateRangeSelector from "../Components/UiElements/DateSelector/DateRangesSelector";


const AllOrders = () => {
  useTitle("Order list");
  const [active, setActive] = useState("all");
  const [tableData, setTabledata] = useState(orderTable);
  const [isModal, setIsModal] = useState(false);
  const [loading,setLoading]=useState(true);
  const [sortBy,setSortBy]=useState('date:asc');
  const[overView,setOverView]= useState([
    {
      title: 'Total Cost',
      total: 0
    },
    {
      title: 'Total Revenue',
      total: 0
    },
    {
      title: 'Total Order',
      total: 0
    },
    {
      title: 'Completed',
      total: 0
    },
    {
      title: 'Cancelled',
      total: 0
    }
  ]);
  const [filterDate, setFilterDate] = useState(null)
  const tableButtonHandler = (value) => {
    setActive(value);
  };

  useEffect(() => {
    fetchData();

  }, [sortBy, active]);
  useEffect(()=>{
    terminal.request({name: 'overviewData'}).then(res=> setOverView(res?.status===false? []: [
      {
        title: 'Total Cost',
        total: res?.totalCost
      },
      {
        title: 'Total Revenue',
        total: res?.totalRevenue
      },
      {
        title: 'Total Order',
        total: res?.totalOrder
      },
      {
        title: 'Completed',
        total: res?.completedOrder
      },
      {
        title: 'Canceled',
        total: res?.cancelledOrder
      }
    ]))

  },[])

  const fetchData = (page = 1) => {
    setLoading(true);
    terminal.request({ name: 'allOrders', queries: { page, sortBy, status: active } }).then((res) => {
      res.status === false ? '' : setTabledata(res), setLoading(false);
    });
  };

  const modalHandler = (id) => setIsModal([id]);
  const deleteHandler = () => terminal.request({ name: 'deleteOrder', body: { id: isModal } }).then(res => res.status === true ? (toaster({ type: 'success', message: res.message }), setIsModal(false), fetchData()) : (toaster({ type: 'error', message: res.message }), setIsModal(false)))

 
  return (
    <div className="h-full px-5 ">
      <Modal show={isModal} onClose={() => setIsModal(false)}><div className="text-center text-xl my-10">Are you sure you want to delete this order?
        <div className="flex gap-2 items-center justify-center mx-auto w-full mt-5"><span onClick={deleteHandler}><Button style='primary'><span className="px-2">Yes</span></Button></span><span onClick={() => setIsModal(false)}><Button style='outline'><span className="px-2">No</span></Button></span></div></div></Modal>
      <Heading title="All Orders">
        <div className="flex gap-1 items-center">
          <Input type="text" placeholder="Search" styles="secondary">
            <img src={search} alt="" />
          </Input>
          {/* <Input type="date" styles="secondary" /> */}
          
          <DateRangeSelector onSubmit={setFilterDate}  />
        </div>
      </Heading>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 border-[#0000001c]">
          <Overview data={overView} />
        </div>

        <div className="col-span-3 sm:col-span-3">
          <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
            <div className="flex justify-between">
              <div className="py-2 my-auto">
                <button
                  onClick={() => tableButtonHandler("all")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "all" ? "bg-[#CFF6EF] rounded" : "bg-transparent"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => tableButtonHandler("pending")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "pending"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => tableButtonHandler("processing")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "processing"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Processing
                </button>
                <button
                  onClick={() => tableButtonHandler("shipping")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "shipping"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Shipping
                </button>
                <button
                  onClick={() => tableButtonHandler("cancelled")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "cancelled"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Cancelled
                </button>
                <button
                  onClick={() => tableButtonHandler("completed")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "completed"
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
                <button onClick={() => setSortBy(sortBy === 'date:desc' ? 'date:asc' : 'date:desc')} className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>
          </div>

          <Table paginate={fetchData} modalHandler={modalHandler} data={tableData} loading={loading} />
        </div >
      </div>
    </div>
  );
};

export default AllOrders;

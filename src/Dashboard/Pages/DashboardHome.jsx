import arrowRight from "../../assets/icons/cd-arrow-right-2.svg";
import Heading from "../Components/UiElements/Heading/Heading";
import { orderTable } from "../../Store/Data";
import AreaChart from "../Components/UiElements/AreaChart/AreaChart";
import { areaChart, heatMap } from "../../Store/Data";
import HeatMap from "../Components/UiElements/HeatMap/HeatMap";
import Table from "../Components/UiElements/Table/Table";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Overview from "../Components/Overview/Overview";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";
import Modal from "../../Components/UiElements/Modal/Modal";
import Button from "../Components/UiElements/Button/Button";

// 
const DashboardHome = () => {
  useTitle("Dashboard")
  const [active, setActive] = useState("orders");
  const [tableData, setTabledata] = useState(orderTable);
  const [loading,setLoading]= useState(false);
  const [areaChartData,setAreaChartData]=useState(areaChart);;
  const [heatmapData,setHeatmapData]=useState(heatMap);
  const [isModal, setIsModal] = useState(false);
  const [filter,setFilter]= useState('month');
  const[overView,setOverView]= useState([
    {
      title: 'Total Cost',
      total: 0
    },
    {
      title: 'Total Request',
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
  useEffect(() => {
    setLoading(true);
    active==='orders'?fetchOrder():fetchRequest();
  }, [active]);
  useEffect(()=>{
    terminal.request({name: 'overviewData'}).then(res=> setOverView(res?.status===false? []: [
      {
        title: 'Total Cost',
        total: res?.totalCost
      },
      {
        title: 'Total Request',
        total: res?.totalRequest
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
    ]));
   
  },[])
  useEffect(()=>{
    terminal.request({name: 'chartData', queries: {filter}}).then(res=> {
      res?.status===false? toaster({tyoe:'error',message:res?.message}): (setAreaChartData(res?.areaChart), formateHeatmapData(res?.heatmapData));
    });

  },[filter]);

  const fetchOrder = (page = 1) => {
    terminal.request({ name: 'allOrders', queries: { page } }).then((res) => {
      res.status === false ? '' : setTabledata(res),setLoading(false);
    });
  };
  const fetchRequest = (page = 1) => {
    terminal.request({ name: 'allRequest', queries: { page } }).then((res) => {
      res.status === false ? '' : setTabledata(res), setLoading(false);
    });
  };

  const tableButtonHandler = (value) => {
    setActive(value);
  };
  const modalHandler = (id) => setIsModal([id]);
  const deleteHandler = () => terminal.request({ name: 'deleteOrder', body: { id: isModal } }).then(res => res.status === true ? (toaster({ type: 'success', message: res.message }), setIsModal(false), fetchData()) : (toaster({ type: 'error', message: res.message }), setIsModal(false)))
  const formateHeatmapData =(input=[])=>{
    const timePeriods = [
      "3am", "6am", "9am", "12am", "3pm", "6pm", "9pm", "12pm"
    ];
    
    const daysOfWeek = [
      "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ];
    
    const result = [];
    
    for (const period of timePeriods) {
      const dataForPeriod = [];
      
      for (const dayEntry of input) {
        const dayOfWeek = daysOfWeek[dayEntry.day - 1];
        dataForPeriod.push({ x: dayOfWeek, y: dayEntry[period] });
      }
      
      result.push({
        name: period,
        data: dataForPeriod,
      });
    }
    setHeatmapData(result);
  }

  console.log(filter);

  return (
    <div className="h-full px-5 ">
       <Modal show={isModal} onClose={() => setIsModal(false)}><div className="text-center text-xl my-10">Are you sure you want to delete this order?
        <div className="flex gap-2 items-center justify-center mx-auto w-full mt-5"><span onClick={deleteHandler}><Button style='primary'><span className="px-2">Yes</span></Button></span><span onClick={() => setIsModal(false)}><Button style='outline'><span className="px-2">No</span></Button></span></div></div></Modal>
      <Heading title="Overview" />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3">
          <Overview data={overView} />
        </div>
        <div className="col-span-3 grid gap-5 grid-cols-7">
          <div className="col-span-7 sm:col-span-5">
            <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
              <AreaChart data={areaChartData} setFilter={setFilter} filter={filter} />
            </div>
          </div>
          <div className="col-span-7 sm:col-span-2">
            <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
              <HeatMap data={heatmapData} />
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-3">
          <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
            <div className="flex justify-between">
              <div className="py-2">
                <button
                  onClick={() => tableButtonHandler("request")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "request" ? "bg-[#CFF6EF]" : "bg-transparent"
                    }`}
                >
                  Request
                </button>
                <button
                  onClick={() => tableButtonHandler("orders")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "orders" ? "bg-[#CFF6EF]" : "bg-transparent"
                    }`}
                >
                  Orders
                </button>
              </div>
              <Link
                className="py-2 px-3 text-[#475569] text-xs font-semibold"
                to={active}
              >
                <div  className="flex gap-2 items-center">
                  <span>View All</span>
                  <img src={arrowRight} alt="" />
                </div>
              </Link>
            </div>

            <Table paginate={ active==='orders'?fetchOrder:fetchRequest} data={tableData} dashboardToogle={active} loading={loading} modalHandler={modalHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

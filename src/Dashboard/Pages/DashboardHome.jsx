import arrowRight from "../../assets/icons/cd-arrow-right-2.svg";
import Heading from "../Components/UiElements/Heading/Heading";
import { orderTable } from "../../Store/Data";
import AreaChart from "../Components/UiElements/AreaChart/AreaChart";
import { areaChart } from "../../Store/Data";
import HeatMap from "../Components/UiElements/HeatMap/HeatMap";
import Table from "../Components/UiElements/Table/Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApi } from "../../Util/apiCall";
import Overview from "../Components/Overview/Overview";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
// 
const DashboardHome = () => {
  useTitle("Dashboard")
  const [active, setActive] = useState("order");
  const [tableData, setTabledata] = useState(orderTable);

  useEffect(() => {
    fetchData();

  }, []);

  const fetchData = (page = 1) => {
    terminal.request({ name: 'allOrders', queries: { page } }).then((res) => {
      res.status === false ? '' : setTabledata(res);
    });
  };

  const tableButtonHandler = (value) => {
    setActive(value);
    console.log(value);
  };

  const DashboardOverview = [
    {
      title: 'Total Cost',
      total: 10440.00
    },
    {
      title: 'Total Request',
      total: 294.00
    },
    {
      title: 'Total Order',
      total: 125.00
    },
    {
      title: 'Completed',
      total: 100.00
    },
    {
      title: 'Canceled',
      total: 25.00
    }
  ]

  return (
    <div className="h-full px-5 ">
      <Heading title="Overview" />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3">
          <Overview data={DashboardOverview} />
        </div>
        <div className="col-span-3 grid gap-5 grid-cols-7">
          <div className="col-span-7 sm:col-span-5">
            <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
              <AreaChart data={areaChart} />
            </div>
          </div>
          <div className="col-span-7 sm:col-span-2">
            <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
              <HeatMap />
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
                  onClick={() => tableButtonHandler("order")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "order" ? "bg-[#CFF6EF]" : "bg-transparent"
                    }`}
                >
                  Orders
                </button>
              </div>
              <Link
                className="py-2 px-3 text-[#475569] text-xs font-semibold"
                to="orders"
              >
                <div className="flex gap-2 items-center">
                  <span>View All</span>
                  <img src={arrowRight} alt="" />
                </div>
              </Link>
            </div>

            <Table paginate={fetchData} data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

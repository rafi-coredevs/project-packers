import { useEffect, useState } from "react";
import Heading from "../Components/UiElements/Heading/Heading";
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
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";
import DateRangeSelector from "../Components/UiElements/DateSelector/DateRangesSelector";
import { Link } from "react-router-dom";

const orderStatuses = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Paid", value: "paid" },
  { id: 3, name: "Refunded", value: "refunded" },
  { id: 4, name: "Refund Processing", value: "refundProcessing" },
];

const AllOrders = () => {
  useTitle("Order list");
  const [active, setActive] = useState("all");
  const [tableData, setTableData] = useState(orderTable);
  const [isModal, setIsModal] = useState(false);
  const [overView, setOverView] = useState([
    {
      title: "Total Cost",
      total: 0,
    },
    {
      title: "Total Revenue",
      total: 0,
    },
    {
      title: "Total Order",
      total: 0,
    },
    {
      title: "Completed",
      total: 0,
    },
    {
      title: "Cancelled",
      total: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date:asc");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState({
    name: "Select",
    value: null,
    id: 0,
  });

  function orderStatusHandler(id) {
    const selected = orderStatuses.find((item) => item.id === id);
    setSelectedOrderStatus(selected);
    setActive(selected?.value);
  }

  const tableButtonHandler = (value) => {
    setActive(value);
  };

  useEffect(() => {
    fetchData();
  }, [sortBy, active]);
  useEffect(() => {
    terminal.request({ name: "overviewData" }).then((res) =>
      setOverView(
        res?.status === false
          ? []
          : [
            {
              title: "Total Cost",
              total: res?.totalCost,
            },
            {
              title: "Total Revenue",
              total: res?.totalRevenue,
            },
            {
              title: "Total Order",
              total: res?.totalOrder,
            },
            {
              title: "Completed",
              total: res?.completedOrder,
            },
            {
              title: "Canceled",
              total: res?.cancelledOrder,
            },
          ]
      )
    );
  }, []);

  const fetchData = (page = 1) => {
    setLoading(true);
    terminal
      .request({ name: "allOrders", queries: { page, sortBy, status: active } })
      .then((res) => {
        res.status === false ? "" : setTableData(res), setLoading(false);
      });
  };

  const modalHandler = (id) => setIsModal([id]);
  const deleteHandler = () =>
    terminal
      .request({ name: "deleteOrder", body: { id: isModal } })
      .then((res) =>
        res.status === true
          ? (toaster({ type: "success", message: res.message }),
            setIsModal(false),
            fetchData())
          : (toaster({ type: "error", message: res.message }),
            setIsModal(false))
      );

  function convertISODate(startDate = new Date()) {
    const dateObj = new Date(startDate.toString());
    return dateObj.toISOString();
  }

  function handleDateRangeSearch(dateObj) {
    const startDate = convertISODate(dateObj.startDate);
    const endingDate = convertISODate(dateObj.endDate);

    setLoading(true);
    terminal
      .request({
        name: "allOrders",
        queries: {
          sortBy,
          status: active,
          date: JSON.stringify({ $gte: startDate, $lte: endingDate }),
        },
      })
      .then((res) => {
        res.status === false ? "" : setTableData(res), setLoading(false);
      });
  }

  function handleSearch(e) {
    if (e.target.value?.length >= 1) {
      setLoading(true);
      terminal
        .request({
          name: "allOrders",
          queries: { sortBy, status: active, search: e.target.value },
        })
        .then((res) => {
          res.status === false ? "" : setTableData(res), setLoading(false);
        });
    } else {
      fetchData();
    }
  }

  function handleTableSearch(e) {
    if (e.target.value?.length >= 1) {
      setLoading(true);
      terminal
        .request({
          name: "allOrders",
          queries: { sortBy, status: active, search: e.target.value },
        })
        .then((res) => {
          res.status === false ? "" : setTableData(res), setLoading(false);
        });
    } else {
      fetchData();
    }
  }

  return (
    <div className="h-full px-5 ">
      <Modal show={isModal} onClose={() => setIsModal(false)}>
        <div className="text-center text-xl my-10">
          Are you sure you want to delete this order?
          <div className="flex gap-2 items-center justify-center mx-auto w-full mt-5">
            <span onClick={deleteHandler}>
              <Button style="primary">
                <span className="px-2">Yes</span>
              </Button>
            </span>
            <span onClick={() => setIsModal(false)}>
              <Button style="outline">
                <span className="px-2">No</span>
              </Button>
            </span>
          </div>
        </div>
      </Modal>
      <Heading title="All Orders">
        <div className="flex gap-1 items-center">
          <Link to={'/admin/orders/add-order'}>
            <Button style='primary'>
              Add Order
            </Button>
          </Link>
          <Input
            type="text"
            change={handleSearch}
            placeholder="Search"
            styles="secondary"
          >
            <img src={search} alt="" />
          </Input>
          {/* <Input type="date" styles="secondary" /> */}

          <DateRangeSelector onSubmit={handleDateRangeSearch} />
        </div>
      </Heading>
      <div className=" grid grid-cols-3 gap-5">
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
                <Input
                  type="text"
                  change={handleTableSearch}
                  placeholder="Search"
                  styles="secondary"
                >
                  <img src={search} alt="" className="w-[1.5rem] h-[1.5rem]" />
                </Input>
                <div className="flex ">
                  <CustomSelect
                    value={selectedOrderStatus.name}
                    options={orderStatuses}
                    onChange={orderStatusHandler}
                    bg="white"
                    appearance="filter"
                  />
                </div>
                <button
                  onClick={() =>
                    setSortBy(sortBy === "date:desc" ? "date:asc" : "date:desc")
                  }
                  className="border border-[#0000001f] p-2  "
                >
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>
          </div>

          <Table
            paginate={fetchData}
            modalHandler={modalHandler}
            data={tableData}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
